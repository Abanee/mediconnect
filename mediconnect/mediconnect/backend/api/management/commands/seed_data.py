from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from api.models import Doctor, Patient, Medicine, Appointment, Prescription, PrescriptionMedicine
from datetime import datetime, timedelta
import random

User = get_user_model()

class Command(BaseCommand):
    help = 'Seed the database with sample data'

    def handle(self, *args, **options):
        self.stdout.write('Seeding database...')
        
        # Create sample medicines
        medicines_data = [
            {'name': 'Paracetamol', 'price': 24, 'description': 'Pain relief and fever reducer', 'in_stock': True, 'stock_quantity': 100},
            {'name': 'Amoxicillin', 'price': 120, 'description': 'Antibiotic for bacterial infections', 'in_stock': True, 'stock_quantity': 50},
            {'name': 'Cetirizine', 'price': 35, 'description': 'Antihistamine for allergies', 'in_stock': False, 'stock_quantity': 0},
            {'name': 'Ibuprofen', 'price': 45, 'description': 'Anti-inflammatory medication', 'in_stock': True, 'stock_quantity': 75},
            {'name': 'Omeprazole', 'price': 80, 'description': 'Reduces stomach acid', 'in_stock': True, 'stock_quantity': 60},
        ]
        
        for med_data in medicines_data:
            Medicine.objects.get_or_create(
                name=med_data['name'],
                defaults=med_data
            )
        
        self.stdout.write(self.style.SUCCESS('Successfully seeded medicines'))
        
        # Create sample doctors if they don't exist
        doctors_data = [
            {
                'username': 'drmaya', 'email': 'maya@mediconnect.com', 'first_name': 'Maya', 'last_name': 'Ramesh',
                'specialty': 'cardiologist', 'experience': 15, 'license_number': 'CAR001', 'consultation_fee': 500
            },
            {
                'username': 'dranil', 'email': 'anil@mediconnect.com', 'first_name': 'Anil', 'last_name': 'Kumar',
                'specialty': 'neurologist', 'experience': 12, 'license_number': 'NEU001', 'consultation_fee': 600
            },
            {
                'username': 'drleena', 'email': 'leena@mediconnect.com', 'first_name': 'Leena', 'last_name': 'Sahu',
                'specialty': 'pediatrician', 'experience': 10, 'license_number': 'PED001', 'consultation_fee': 400
            },
        ]
        
        for doc_data in doctors_data:
            user_data = {k: v for k, v in doc_data.items() if k in ['username', 'email', 'first_name', 'last_name']}
            doctor_data = {k: v for k, v in doc_data.items() if k not in ['username', 'email', 'first_name', 'last_name']}
            
            user, created = User.objects.get_or_create(
                username=user_data['username'],
                defaults={
                    **user_data,
                    'user_type': 'doctor',
                    'password': 'password123'
                }
            )
            
            if created:
                user.set_password('password123')
                user.save()
                
                Doctor.objects.create(
                    user=user,
                    **doctor_data
                )
        
        self.stdout.write(self.style.SUCCESS('Successfully seeded doctors'))
        
        self.stdout.write(self.style.SUCCESS('Database seeding completed!'))