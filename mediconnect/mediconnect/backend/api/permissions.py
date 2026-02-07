from rest_framework import permissions

# class IsDoctor(permissions.BasePermission):
#     def has_permission(self, request, view):
#         return request.user.is_authenticated and request.user.user_type == 'doctor'

# class IsPatient(permissions.BasePermission):
#     def has_permission(self, request, view):
#         return request.user.is_authenticated and request.user.user_type == 'patient'
    
class IsPatient(permissions.BasePermission):
    """
    Check if user is a patient
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and 
                   hasattr(request.user, 'patient_profile'))

class IsDoctor(permissions.BasePermission):
    """
    Check if user is a doctor
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and 
                   hasattr(request.user, 'doctor_profile'))

class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # Check if the object has a user attribute
        if hasattr(obj, 'user'):
            return obj.user == request.user
        elif hasattr(obj, 'patient'):
            return obj.patient.user == request.user
        elif hasattr(obj, 'doctor'):
            return obj.doctor.user == request.user
        
        return False