from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'auth', views.AuthViewSet, basename='auth')
router.register(r'doctors', views.DoctorViewSet, basename='doctors')
router.register(r'medicines', views.MedicineViewSet, basename='medicines')
router.register(r'appointments', views.AppointmentViewSet, basename='appointments')
router.register(r'orders', views.OrderViewSet, basename='orders')
router.register(r'prescriptions', views.PrescriptionViewSet, basename='prescriptions')
router.register(r'chat-messages', views.ChatMessageViewSet, basename='chat-messages')
router.register(r'video-calls', views.VideoCallViewSet, basename='video-calls')

# urlpatterns = [
#     path('', include(router.urls)),
#     path('dashboard/patient/', views.PatientDashboardView.as_view(), name='patient-dashboard'),
#     path('dashboard/doctor/', views.DoctorDashboardView.as_view(), name='doctor-dashboard'),
#     path('quick-actions/', views.quick_actions, name='quick-actions'),
# ]

urlpatterns = [
    path('', include(router.urls)),
    path('dashboard/patient/', views.PatientDashboardView.as_view(), name='patient-dashboard'),
    path('dashboard/doctor/', views.DoctorDashboardView.as_view(), name='doctor-dashboard'),
    path('quick-actions/', views.quick_actions, name='quick-actions'),
    path('debug/user-info/', views.debug_user_info, name='debug-user-info'), 
    # path('check-auth/', views.check_auth, name='check-auth'),  # Add this line
]