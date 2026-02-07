from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Doctor, Patient, Medicine, Appointment, Prescription, PrescriptionMedicine, Order, OrderItem, ChatMessage, VideoCall

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'user_type', 'is_staff', 'is_active')
    list_filter = ('user_type', 'is_staff', 'is_superuser', 'is_active', 'created_at')
    search_fields = ('username', 'email', 'first_name', 'last_name')
    ordering = ('-created_at',)
    
    fieldsets = UserAdmin.fieldsets + (
        ('Additional Info', {'fields': ('user_type', 'phone', 'date_of_birth', 'address', 'profile_picture')}),
    )
    
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Additional Info', {'fields': ('user_type', 'phone', 'email', 'first_name', 'last_name')}),
    )

@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ('get_name', 'specialty', 'experience', 'consultation_fee', 'rating', 'available')
    list_filter = ('specialty', 'available', 'experience')
    search_fields = ('user__first_name', 'user__last_name', 'specialty', 'license_number')
    readonly_fields = ('rating',)
    
    def get_name(self, obj):
        return obj.user.get_full_name()
    get_name.short_description = 'Name'

@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ('get_name', 'blood_group', 'get_email', 'get_phone')
    list_filter = ('blood_group',)
    search_fields = ('user__first_name', 'user__last_name', 'user__email')
    
    def get_name(self, obj):
        return obj.user.get_full_name()
    get_name.short_description = 'Name'
    
    def get_email(self, obj):
        return obj.user.email
    get_email.short_description = 'Email'
    
    def get_phone(self, obj):
        return obj.user.phone
    get_phone.short_description = 'Phone'

@admin.register(Medicine)
class MedicineAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'in_stock', 'stock_quantity', 'requires_prescription', 'manufacturer')
    list_filter = ('in_stock', 'requires_prescription')
    search_fields = ('name', 'manufacturer', 'description')
    list_editable = ('price', 'in_stock', 'stock_quantity')

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('patient', 'doctor', 'appointment_date', 'appointment_time', 'status', 'consultation_type')
    list_filter = ('status', 'consultation_type', 'appointment_date', 'doctor__specialty')
    search_fields = ('patient__user__first_name', 'doctor__user__first_name', 'symptoms')
    date_hierarchy = 'appointment_date'

@admin.register(Prescription)
class PrescriptionAdmin(admin.ModelAdmin):
    list_display = ('patient', 'doctor', 'diagnosis', 'created_at')
    list_filter = ('created_at', 'doctor__specialty')
    search_fields = ('patient__user__first_name', 'doctor__user__first_name', 'diagnosis')

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'patient', 'total_amount', 'status', 'payment_method', 'payment_status', 'created_at')
    list_filter = ('status', 'payment_method', 'payment_status', 'created_at')
    search_fields = ('patient__user__first_name', 'id')
    readonly_fields = ('created_at', 'updated_at')

@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ('sender', 'appointment', 'is_prescription', 'timestamp')
    list_filter = ('is_prescription', 'timestamp')
    search_fields = ('sender__username', 'appointment__id', 'message')
    readonly_fields = ('timestamp',)

@admin.register(VideoCall)
class VideoCallAdmin(admin.ModelAdmin):
    list_display = ('appointment', 'room_name', 'started_at', 'ended_at', 'duration')
    list_filter = ('started_at',)
    search_fields = ('room_name', 'appointment__id')
    readonly_fields = ('started_at', 'ended_at', 'duration')

# Register remaining models
admin.site.register(PrescriptionMedicine)
admin.site.register(OrderItem)