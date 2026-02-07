# from django.test import TestCase

# # Create your tests here.
# tests.py - BASIC TEST STRUCTURE
from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Doctor, Patient, Medicine, Appointment

User = get_user_model()

class AuthenticationTests(APITestCase):
    def test_patient_registration(self):
        data = {
            'username': 'testpatient',
            'email': 'patient@test.com',
            'password': 'testpass123',
            'password2': 'testpass123',
            'first_name': 'John',
            'last_name': 'Doe',
            'user_type': 'patient',
            'phone': '1234567890'
        }
        response = self.client.post('/api/auth/register/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
    def test_doctor_registration(self):
        data = {
            'username': 'testdoctor',
            'email': 'doctor@test.com',
            'password': 'testpass123',
            'password2': 'testpass123',
            'first_name': 'Jane',
            'last_name': 'Smith',
            'user_type': 'doctor',
            'phone': '1234567890'
        }
        response = self.client.post('/api/auth/register/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

class ModelTests(TestCase):
    def test_create_doctor(self):
        user = User.objects.create_user(
            username='doctor1',
            email='doctor1@test.com',
            password='testpass123',
            user_type='doctor'
        )
        doctor = Doctor.objects.create(
            user=user,
            specialty='cardiologist',
            license_number='LIC123',
            experience=10,
            qualification='MD'
        )
        self.assertEqual(str(doctor), f"Dr. {user.get_full_name()} - cardiologist")