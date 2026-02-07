

from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'user_type', 'phone', 'date_of_birth', 'address', 'profile_picture')
        read_only_fields = ('id',)

class DoctorSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    name = serializers.CharField(source='user.get_full_name', read_only=True)
    email = serializers.CharField(source='user.email', read_only=True)
    
    class Meta:
        model = Doctor
        fields = '__all__'

class PatientSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    name = serializers.CharField(source='user.get_full_name', read_only=True)
    email = serializers.CharField(source='user.email', read_only=True)
    
    class Meta:
        model = Patient
        fields = '__all__'

class MedicineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicine
        fields = '__all__'

# class AppointmentSerializer(serializers.ModelSerializer):
#     patient_name = serializers.CharField(source='patient.user.get_full_name', read_only=True)
#     doctor_name = serializers.CharField(source='doctor.user.get_full_name', read_only=True)
#     doctor_specialty = serializers.CharField(source='doctor.specialty', read_only=True)
    
#     class Meta:
#         model = Appointment
#         fields = '__all__'
class AppointmentSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(source='patient.user.get_full_name', read_only=True)
    doctor_name = serializers.CharField(source='doctor.user.get_full_name', read_only=True)
    doctor_specialty = serializers.CharField(source='doctor.specialty', read_only=True)
    
    class Meta:
        model = Appointment
        fields = '__all__'
        read_only_fields = ('patient', 'status', 'created_at', 'updated_at')

    def validate_appointment_date(self, value):
        """Ensure appointment date is not in the past"""
        from django.utils import timezone
        if value < timezone.now().date():
            raise serializers.ValidationError("Appointment date cannot be in the past")
        return value

    def validate_appointment_time(self, value):
        """Validate appointment time format"""
        # Basic time validation
        if not value:
            raise serializers.ValidationError("Appointment time is required")
        return value

    def validate(self, data):
        """Validate the entire appointment"""
        from django.utils import timezone
        
        doctor = data.get('doctor')
        appointment_date = data.get('appointment_date')
        appointment_time = data.get('appointment_time')
        
        # Check if doctor exists and is available
        if doctor:
            if not Doctor.objects.filter(id=doctor.id, available=True).exists():
                raise serializers.ValidationError({
                    'doctor': 'Selected doctor is not available'
                })
        
        # Check for existing appointments at the same time
        if doctor and appointment_date and appointment_time:
            existing_appointments = Appointment.objects.filter(
                doctor=doctor,
                appointment_date=appointment_date,
                appointment_time=appointment_time,
                status__in=['pending', 'confirmed']
            )
            
            if self.instance:  # If updating, exclude current appointment
                existing_appointments = existing_appointments.exclude(id=self.instance.id)
            
            if existing_appointments.exists():
                raise serializers.ValidationError({
                    'appointment_time': 'Doctor already has an appointment at this time'
                })
        
        return data

class PrescriptionMedicineSerializer(serializers.ModelSerializer):
    medicine_name = serializers.CharField(source='medicine.name', read_only=True)
    medicine_price = serializers.DecimalField(source='medicine.price', read_only=True, max_digits=10, decimal_places=2)
    
    class Meta:
        model = PrescriptionMedicine
        fields = '__all__'

class PrescriptionSerializer(serializers.ModelSerializer):
    medicines = PrescriptionMedicineSerializer(many=True, read_only=True)
    doctor_name = serializers.CharField(source='doctor.user.get_full_name', read_only=True)
    patient_name = serializers.CharField(source='patient.user.get_full_name', read_only=True)
    
    class Meta:
        model = Prescription
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    medicine_name = serializers.CharField(source='medicine.name', read_only=True)
    medicine_image = serializers.ImageField(source='medicine.image', read_only=True)
    
    class Meta:
        model = OrderItem
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    patient_name = serializers.CharField(source='patient.user.get_full_name', read_only=True)
    
    class Meta:
        model = Order
        fields = '__all__'

class ChatMessageSerializer(serializers.ModelSerializer):
    sender_name = serializers.CharField(source='sender.get_full_name', read_only=True)
    sender_type = serializers.CharField(source='sender.user_type', read_only=True)
    
    class Meta:
        model = ChatMessage
        fields = '__all__'

class VideoCallSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoCall
        fields = '__all__'
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        if username and password:
            # Allow login with either username or email
            if '@' in username:
                try:
                    user_obj = User.objects.get(email=username)
                    username = user_obj.username
                except User.DoesNotExist:
                    raise serializers.ValidationError('Unable to log in with provided credentials.')
            
            user = authenticate(username=username, password=password)
            
            if user:
                if user.is_active:
                    data['user'] = user
                else:
                    raise serializers.ValidationError('User account is disabled.')
            else:
                raise serializers.ValidationError('Unable to log in with provided credentials.')
        else:
            raise serializers.ValidationError('Must include "username" and "password".')

        return data



class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    user_type = serializers.ChoiceField(choices=User.USER_TYPE_CHOICES, required=True)  # FIXED FIELD NAME

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password2', 'first_name', 'last_name', 'user_type', 'phone')
        extra_kwargs = {
            'email': {'required': True},
            'first_name': {'required': True},
            'last_name': {'required': True},
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        
        # Check if username already exists
        if User.objects.filter(username=attrs['username']).exists():
            raise serializers.ValidationError({"username": "A user with this username already exists."})
            
        # Check if email already exists
        if User.objects.filter(email=attrs['email']).exists():
            raise serializers.ValidationError({"email": "A user with this email already exists."})
            
        return attrs

    def create(self, validated_data):
        # Remove password2 from validated data
        validated_data.pop('password2')
        password = validated_data.pop('password')
        
        # Create user
        user = User.objects.create_user(
            **validated_data,
            password=password
        )
        
        # Create corresponding profile - FIXED VERSION
        try:
            if user.user_type == 'patient':
                Patient.objects.create(user=user)
            elif user.user_type == 'doctor':
                Doctor.objects.create(
                    user=user,
                    specialty='general',
                    license_number=f"TEMP_{user.id}_{user.username}",
                    experience=0,
                    qualification='To be updated',
                    consultation_fee=0.00,
                    bio='Profile being setup'
                )
        except Exception as e:
            # If profile creation fails, delete the user
            user.delete()
            raise serializers.ValidationError(f"Error creating user profile: {str(e)}")
        
        return user

