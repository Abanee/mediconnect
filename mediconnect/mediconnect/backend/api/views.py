

from rest_framework import viewsets, status, generics
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from django.db.models import Q, Count, Sum
from django.utils import timezone
from datetime import datetime, timedelta
from .models import *
from .serializers import *
from .permissions import IsDoctor, IsPatient, IsOwnerOrReadOnly


# ============================================
# AUTHENTICATION VIEWSET
# ============================================


class AuthViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]
    
    @action(detail=False, methods=['post'])
    def register(self, request):
        print("=== REGISTER REQUEST DATA ===")
        print("Raw data:", request.data)
        
        # Handle both 'user_type' and 'userType' from frontend
        data = request.data.copy()
        if 'userType' in data and 'user_type' not in data:
            data['user_type'] = data['userType']
        
        serializer = RegisterSerializer(data=data)
        print("Serializer data:", serializer.initial_data)
        
        if serializer.is_valid():
            print("Register valid - creating user")
            try:
                user = serializer.save()
                refresh = RefreshToken.for_user(user)
                
                # Get user profile data with error handling
                try:
                    if user.user_type == 'doctor' and hasattr(user, 'doctor_profile'):
                        profile_data = DoctorSerializer(user.doctor_profile).data
                    elif user.user_type == 'patient' and hasattr(user, 'patient_profile'):
                        profile_data = PatientSerializer(user.patient_profile).data
                    else:
                        profile_data = UserSerializer(user).data
                except Exception as e:
                    print(f"Error getting profile data: {e}")
                    profile_data = UserSerializer(user).data
                
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'user': profile_data
                }, status=status.HTTP_201_CREATED)
                
            except Exception as e:
                print(f"Error during user creation: {e}")
                return Response(
                    {'error': 'User creation failed'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
        else:
            print("Register validation errors:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['post'])
    def login(self, request):
        print("=== LOGIN REQUEST DATA ===")
        print("Raw data:", request.data)
        
        serializer = LoginSerializer(data=request.data)
        print("Login serializer data:", serializer.initial_data)
        
        if serializer.is_valid():
            user = serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)
            
            # Get user profile data with proper error handling
            try:
                if user.user_type == 'doctor' and hasattr(user, 'doctor_profile'):
                    profile_data = DoctorSerializer(user.doctor_profile).data
                elif user.user_type == 'patient' and hasattr(user, 'patient_profile'):
                    profile_data = PatientSerializer(user.patient_profile).data
                else:
                    profile_data = UserSerializer(user).data
            except Exception as e:
                print(f"Error getting profile data: {e}")
                profile_data = UserSerializer(user).data
            
            print(f"Login successful for user: {user.username}, type: {user.user_type}")
            
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': profile_data
            })
        else:
            print("Login validation errors:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# ============================================
# DOCTOR VIEWSET
# ============================================
class DoctorViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for listing and retrieving doctors"""
    queryset = Doctor.objects.select_related('user').all()
    serializer_class = DoctorSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['specialty', 'available']
    search_fields = ['user__first_name', 'user__last_name', 'specialty']
    ordering_fields = ['rating', 'experience', 'consultation_fee']


# ============================================
# MEDICINE VIEWSET
# ============================================
class MedicineViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for listing and retrieving medicines"""
    queryset = Medicine.objects.all()
    serializer_class = MedicineSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['in_stock', 'requires_prescription']
    search_fields = ['name', 'description', 'manufacturer']
    ordering_fields = ['price', 'name']


# # ============================================
# # APPOINTMENT VIEWSET
# # ============================================
# class AppointmentViewSet(viewsets.ModelViewSet):
#     """ViewSet for managing appointments"""
#     serializer_class = AppointmentSerializer
#     permission_classes = [IsAuthenticated]
#     filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
#     filterset_fields = ['status', 'consultation_type', 'appointment_date']
#     ordering_fields = ['appointment_date', 'appointment_time']

#     def get_queryset(self):
#         """Filter appointments based on user type"""
#         user = self.request.user
        
#         if user.user_type == 'patient' and hasattr(user, 'patient_profile'):
#             return Appointment.objects.filter(patient=user.patient_profile).select_related('doctor__user', 'patient__user')
#         elif user.user_type == 'doctor' and hasattr(user, 'doctor_profile'):
#             return Appointment.objects.filter(doctor=user.doctor_profile).select_related('doctor__user', 'patient__user')
        
#         return Appointment.objects.none()

#     def perform_create(self, serializer):
#         """Automatically set patient when creating appointment"""
#         if self.request.user.user_type == 'patient' and hasattr(self.request.user, 'patient_profile'):
#             serializer.save(patient=self.request.user.patient_profile)
# ============================================
# APPOINTMENT VIEWSET - FIXED VERSION
# ============================================
class AppointmentViewSet(viewsets.ModelViewSet):
    """ViewSet for managing appointments"""
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['status', 'consultation_type', 'appointment_date']
    ordering_fields = ['appointment_date', 'appointment_time']

    def get_queryset(self):
        """Filter appointments based on user type"""
        user = self.request.user
        
        if user.user_type == 'patient' and hasattr(user, 'patient_profile'):
            return Appointment.objects.filter(patient=user.patient_profile).select_related('doctor__user', 'patient__user')
        elif user.user_type == 'doctor' and hasattr(user, 'doctor_profile'):
            return Appointment.objects.filter(doctor=user.doctor_profile).select_related('doctor__user', 'patient__user')
        
        return Appointment.objects.none()

    def create(self, request, *args, **kwargs):
        """Override create to add debugging"""
        print("=== APPOINTMENT CREATE REQUEST ===")
        print("User:", request.user.username)
        print("User type:", request.user.user_type)
        print("Has patient profile:", hasattr(request.user, 'patient_profile'))
        print("Request data:", request.data)
        
        # Check if user is a patient
        if not hasattr(request.user, 'patient_profile'):
            print("ERROR: User doesn't have patient profile")
            return Response(
                {'error': 'Only patients can create appointments'}, 
                status=status.HTTP_403_FORBIDDEN
            )
        
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            print("Serializer is valid - creating appointment")
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        else:
            print("Serializer validation errors:", serializer.errors)
            return Response(
                {'error': 'Validation failed', 'details': serializer.errors},
                status=status.HTTP_400_BAD_REQUEST
            )

    def perform_create(self, serializer):
        """Automatically set patient when creating appointment"""
        print("Setting patient:", self.request.user.patient_profile.id)
        serializer.save(
            patient=self.request.user.patient_profile, 
            status='pending'
        )




# ============================================
# ORDER VIEWSET - FIXED VERSION
# ============================================
class OrderViewSet(viewsets.ModelViewSet):
    """ViewSet for managing medicine orders"""
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Get orders for the authenticated patient"""
        if hasattr(self.request.user, 'patient_profile'):
            return Order.objects.filter(patient=self.request.user.patient_profile).prefetch_related('items__medicine')
        return Order.objects.none()

    def create(self, request, *args, **kwargs):
        """Create order with proper validation"""
        if not hasattr(request.user, 'patient_profile'):
            return Response(
                {'error': 'Only patients can place orders'}, 
                status=status.HTTP_403_FORBIDDEN
            )
        
        patient = request.user.patient_profile
        cart_items = request.data.get('items', [])
        
        if not cart_items:
            return Response(
                {'error': 'No items in cart'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        # Calculate total and validate items
        total_amount = 0
        order_items_data = []
        
        for item in cart_items:
            try:
                medicine = Medicine.objects.get(id=item['medicine_id'])
                quantity = item.get('quantity', 1)
                
                # Validate quantity
                if quantity <= 0:
                    return Response(
                        {'error': f'Invalid quantity for {medicine.name}'},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                
                # Check stock availability
                if not medicine.in_stock or medicine.stock_quantity < quantity:
                    return Response(
                        {'error': f'{medicine.name} is out of stock or insufficient quantity'},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                
                item_total = medicine.price * quantity
                total_amount += item_total
                
                order_items_data.append({
                    'medicine': medicine,
                    'quantity': quantity,
                    'price': medicine.price
                })
                    
            except Medicine.DoesNotExist:
                return Response(
                    {'error': f'Medicine with id {item.get("medicine_id")} not found'},
                    status=status.HTTP_400_BAD_REQUEST
                )

        # Create order
        order_data = {
            'patient': patient.id,
            'total_amount': total_amount,
            'shipping_address': patient.user.address or "Address not provided",
            'payment_method': request.data.get('payment_method', 'cod'),
            'payment_status': 'pending',
            'status': 'pending'
        }
        
        serializer = self.get_serializer(data=order_data)
        if serializer.is_valid():
            order = serializer.save()
            
            # Create order items
            for item_data in order_items_data:
                OrderItem.objects.create(
                    order=order,
                    medicine=item_data['medicine'],
                    quantity=item_data['quantity'],
                    price=item_data['price']
                )
            
            # Update medicine stock
            for item_data in order_items_data:
                medicine = item_data['medicine']
                medicine.stock_quantity -= item_data['quantity']
                if medicine.stock_quantity <= 0:
                    medicine.in_stock = False
                medicine.save()
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ============================================
# PRESCRIPTION VIEWSET
# ============================================
class PrescriptionViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for viewing prescriptions"""
    serializer_class = PrescriptionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Filter prescriptions based on user type"""
        user = self.request.user
        
        if user.user_type == 'patient' and hasattr(user, 'patient_profile'):
            return Prescription.objects.filter(patient=user.patient_profile).select_related('doctor__user')
        elif user.user_type == 'doctor' and hasattr(user, 'doctor_profile'):
            return Prescription.objects.filter(doctor=user.doctor_profile).select_related('patient__user')
        
        return Prescription.objects.none()


# ============================================
# CHAT MESSAGE VIEWSET
# ============================================
class ChatMessageViewSet(viewsets.ModelViewSet):
    """ViewSet for chat messages in appointments"""
    serializer_class = ChatMessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Get messages for a specific appointment"""
        appointment_id = self.request.query_params.get('appointment')
        if appointment_id:
            return ChatMessage.objects.filter(appointment_id=appointment_id).select_related('sender')
        return ChatMessage.objects.none()

    def perform_create(self, serializer):
        """Automatically set sender to current user"""
        serializer.save(sender=self.request.user)


# ============================================
# VIDEO CALL VIEWSET
# ============================================
class VideoCallViewSet(viewsets.ModelViewSet):
    """ViewSet for managing video consultations"""
    serializer_class = VideoCallSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Filter video calls based on user type"""
        user = self.request.user
        
        if user.user_type == 'patient' and hasattr(user, 'patient_profile'):
            return VideoCall.objects.filter(appointment__patient=user.patient_profile)
        elif user.user_type == 'doctor' and hasattr(user, 'doctor_profile'):
            return VideoCall.objects.filter(appointment__doctor=user.doctor_profile)
        
        return VideoCall.objects.none()

    @action(detail=False, methods=['post'])
    def start_call(self, request):
        """Start a new video call"""
        appointment_id = request.data.get('appointment_id')
        room_name = request.data.get('room_name')
        
        try:
            appointment = Appointment.objects.get(id=appointment_id)
            video_call = VideoCall.objects.create(
                appointment=appointment,
                room_name=room_name
            )
            return Response(VideoCallSerializer(video_call).data)
        except Appointment.DoesNotExist:
            return Response({'error': 'Appointment not found'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'])
    def end_call(self, request, pk=None):
        """End an ongoing video call"""
        video_call = self.get_object()
        video_call.ended_at = timezone.now()
        duration = (video_call.ended_at - video_call.started_at).seconds
        video_call.duration = duration
        video_call.save()
        return Response({'status': 'Call ended', 'duration': duration})


# ============================================
# PATIENT DASHBOARD VIEW
# ============================================
# class PatientDashboardView(generics.RetrieveAPIView):
#     """Dashboard view for patients - FIXED"""
#     permission_classes = [IsAuthenticated]

#     def get(self, request, *args, **kwargs):
#         # Check if user is a patient
#         if not hasattr(request.user, 'patient_profile'):
#             return Response(
#                 {'error': 'Access denied. Patient dashboard only.'},
#                 status=status.HTTP_403_FORBIDDEN
#             )
        
#         patient = request.user.patient_profile
#         appointments = Appointment.objects.filter(patient=patient).select_related('doctor__user')
#         prescriptions = Prescription.objects.filter(patient=patient).select_related('doctor__user')
#         orders = Order.objects.filter(patient=patient).prefetch_related('items')
        
#         # Today's appointments
#         today = timezone.now().date()
#         today_appointments = appointments.filter(appointment_date=today)
        
#         data = {
#             'patient': PatientSerializer(patient).data,
#             'stats': {
#                 'appointments_count': appointments.count(),
#                 'prescriptions_count': prescriptions.count(),
#                 'orders_count': orders.count(),
#                 'doctors_count': Doctor.objects.filter(available=True).count(),
#                 'today_appointments': today_appointments.count(),
#             },
#             'upcoming_appointments': AppointmentSerializer(
#                 appointments.filter(
#                     status__in=['pending', 'confirmed'],
#                     appointment_date__gte=today
#                 ).order_by('appointment_date')[:5],
#                 many=True
#             ).data,
#             'recent_prescriptions': PrescriptionSerializer(
#                 prescriptions.order_by('-created_at')[:5],
#                 many=True
#             ).data,
#             'recent_orders': OrderSerializer(
#                 orders.order_by('-created_at')[:5],
#                 many=True
#             ).data,
#         }
        
#         return Response(data)


# class DoctorDashboardView(generics.RetrieveAPIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request, *args, **kwargs):
#         # Check if user is a doctor and has doctor_profile
#         if not hasattr(request.user, 'doctor_profile'):
#             print(f"User {request.user.username} is not a doctor or missing doctor_profile")
#             return Response(
#                 {'error': 'Access denied. Doctor dashboard only.', 'user_type': request.user.user_type},
#                 status=status.HTTP_403_FORBIDDEN
#             )
        
#         try:
#             doctor = request.user.doctor_profile
#             appointments = Appointment.objects.filter(doctor=doctor).select_related('patient__user')
            
#             # Today's appointments
#             today = timezone.now().date()
#             today_appointments = appointments.filter(appointment_date=today)
            
#             # Patient statistics
#             total_patients = Patient.objects.filter(
#                 appointments__doctor=doctor
#             ).distinct().count()
            
#             data = {
#                 'doctor': DoctorSerializer(doctor).data,
#                 'stats': {
#                     'today_appointments': today_appointments.count(),
#                     'total_patients': total_patients,
#                     'rating': doctor.rating,
#                     'prescriptions_issued': Prescription.objects.filter(doctor=doctor).count(),
#                     'total_appointments': appointments.count(),
#                 },
#                 'today_schedule': AppointmentSerializer(
#                     today_appointments.order_by('appointment_time'),
#                     many=True
#                 ).data,
#                 'recent_appointments': AppointmentSerializer(
#                     appointments.order_by('-created_at')[:10],
#                     many=True
#                 ).data,
#             }
            
#             return Response(data)
            
#         except Exception as e:
#             print(f"Error in doctor dashboard: {e}")
#             return Response(
#                 {'error': 'Internal server error'},
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR
#             )
# In views.py - Update dashboard views

class PatientDashboardView(generics.RetrieveAPIView):
    """Dashboard view for patients - FIXED with proper permissions"""
    permission_classes = [IsAuthenticated, IsPatient]  # ADD THIS LINE

    def get(self, request, *args, **kwargs):
        # Remove the manual check since permission class handles it
        patient = request.user.patient_profile
        appointments = Appointment.objects.filter(patient=patient).select_related('doctor__user')
        prescriptions = Prescription.objects.filter(patient=patient).select_related('doctor__user')
        orders = Order.objects.filter(patient=patient).prefetch_related('items')
        
        # Today's appointments
        today = timezone.now().date()
        today_appointments = appointments.filter(appointment_date=today)
        
        data = {
            'patient': PatientSerializer(patient).data,
            'stats': {
                'appointments_count': appointments.count(),
                'prescriptions_count': prescriptions.count(),
                'orders_count': orders.count(),
                'doctors_count': Doctor.objects.filter(available=True).count(),
                'today_appointments': today_appointments.count(),
            },
            'upcoming_appointments': AppointmentSerializer(
                appointments.filter(
                    status__in=['pending', 'confirmed'],
                    appointment_date__gte=today
                ).order_by('appointment_date')[:5],
                many=True
            ).data,
            'recent_prescriptions': PrescriptionSerializer(
                prescriptions.order_by('-created_at')[:5],
                many=True
            ).data,
            'recent_orders': OrderSerializer(
                orders.order_by('-created_at')[:5],
                many=True
            ).data,
        }
        
        return Response(data)

class DoctorDashboardView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated, IsDoctor]  # ADD THIS LINE

    def get(self, request, *args, **kwargs):
        # Permission class ensures user is a doctor
        doctor = request.user.doctor_profile
        appointments = Appointment.objects.filter(doctor=doctor).select_related('patient__user')
        
        # Today's appointments
        today = timezone.now().date()
        today_appointments = appointments.filter(appointment_date=today)
        
        # Patient statistics
        total_patients = Patient.objects.filter(
            appointments__doctor=doctor
        ).distinct().count()
        
        data = {
            'doctor': DoctorSerializer(doctor).data,
            'stats': {
                'today_appointments': today_appointments.count(),
                'total_patients': total_patients,
                'rating': doctor.rating,
                'prescriptions_issued': Prescription.objects.filter(doctor=doctor).count(),
                'total_appointments': appointments.count(),
            },
            'today_schedule': AppointmentSerializer(
                today_appointments.order_by('appointment_time'),
                many=True
            ).data,
            'recent_appointments': AppointmentSerializer(
                appointments.order_by('-created_at')[:10],
                many=True
            ).data,
        }
        
        return Response(data)

# Add to views.py for debugging
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def debug_user_info(request):
    """Debug endpoint to check user profile status"""
    user = request.user
    data = {
        'username': user.username,
        'email': user.email,
        'user_type': user.user_type,
        'has_doctor_profile': hasattr(user, 'doctor_profile'),
        'has_patient_profile': hasattr(user, 'patient_profile'),
    }
    
    if hasattr(user, 'doctor_profile'):
        data['doctor_profile'] = DoctorSerializer(user.doctor_profile).data
    if hasattr(user, 'patient_profile'):
        data['patient_profile'] = PatientSerializer(user.patient_profile).data
        
    return Response(data)
# ============================================
# QUICK ACTIONS API
# ============================================
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def quick_actions(request):
    """Get quick action buttons based on user type"""
    user = request.user
    actions = []
    
    if user.user_type == 'patient':
        actions = [
            {
                'icon': 'fas fa-user-md',
                'title': 'Book Appointment',
                'description': 'Schedule consultation with specialist doctors',
                'color': '#4f46e5',
                'action': 'doctors'
            },
            {
                'icon': 'fas fa-prescription',
                'title': 'Order Medicines',
                'description': 'Get prescribed medicines delivered to your doorstep',
                'color': '#10b981',
                'action': 'medicines'
            },
            {
                'icon': 'fas fa-file-medical',
                'title': 'Medical Records',
                'description': 'Access your health records and reports',
                'color': '#f59e0b',
                'action': 'records'
            },
            {
                'icon': 'fas fa-ambulance',
                'title': 'Emergency',
                'description': 'Immediate medical assistance',
                'color': '#ef4444',
                'action': 'emergency'
            },
        ]
    elif user.user_type == 'doctor':
        actions = [
            {
                'icon': 'fas fa-calendar-plus',
                'title': 'Manage Availability',
                'description': 'Set your available time slots',
                'color': '#4f46e5',
                'action': 'availability'
            },
            {
                'icon': 'fas fa-user-plus',
                'title': 'Add Patient',
                'description': 'Register new patients',
                'color': '#10b981',
                'action': 'add_patient'
            },
            {
                'icon': 'fas fa-prescription',
                'title': 'Create Prescription',
                'description': 'Write prescriptions for patients',
                'color': '#f59e0b',
                'action': 'prescribe'
            },
            {
                'icon': 'fas fa-chart-line',
                'title': 'View Reports',
                'description': 'Access practice analytics',
                'color': '#06b6d4',
                'action': 'reports'
            },
        ]
    
    return Response({'actions': actions})
