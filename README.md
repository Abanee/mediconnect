MediConnect-README.md
🏥 MediConnect - Healthcare Communication Platform
<div align="center">
MediConnect Logo
Python
Django
License

A web-based healthcare platform designed to connect doctors and patients through real-time digital communication

Features • Tech Stack • Installation • Usage • API Documentation • Contributing

</div>
📋 Table of Contents
Overview

Problem Statement

Solution

Features

Tech Stack

System Architecture

Installation

Configuration

Usage

API Documentation

Database Schema

Screenshots

Testing

Deployment

Contributing

License

Contact

🌟 Overview
MediConnect is a comprehensive web-based healthcare platform that enables seamless communication between healthcare providers and patients through secure digital channels. The platform facilitates remote medical consultations using real-time chat and video calling, making healthcare more accessible, fast, and convenient.

🎯 Project Goals
Bridge the gap between patients and healthcare providers

Reduce wait times for medical consultations

Enable remote healthcare access in underserved areas

Provide secure, HIPAA-compliant communication channels

Streamline appointment scheduling and patient record management

❗ Problem Statement
Current Healthcare Challenges
Limited Access: Patients in remote or rural areas face difficulties accessing quality healthcare

Long Wait Times: Traditional in-person consultations involve extended waiting periods

Emergency Response: Delayed response times in urgent medical situations

Record Management: Fragmented medical history across different healthcare providers

Cost Barriers: Transportation and time-off costs for in-person visits

✅ Solution
MediConnect addresses these challenges through:

🔑 Key Solutions
Challenge	MediConnect Solution
Accessibility	Remote consultations via video/chat from anywhere
Wait Times	Real-time appointment scheduling with instant notifications
Emergency Care	Priority queue system for urgent cases
Records	Centralized digital health records with secure access
Cost	Reduced transportation costs and flexible scheduling
🚀 Features
For Patients 👨‍⚕️
✅ User Registration & Authentication

Secure signup with email verification

Multi-factor authentication (MFA)

Password recovery system

💬 Real-time Communication

Instant messaging with healthcare providers

Video calling with HD quality

Voice calling for consultations

File sharing (X-rays, reports, prescriptions)

📅 Appointment Management

Browse available doctors by specialty

Book, reschedule, or cancel appointments

Automated email/SMS reminders

Consultation history tracking

🏥 Health Records

Digital medical history storage

Prescription management

Lab report uploads

Health metrics tracking

🔔 Notifications

Real-time appointment alerts

Medication reminders

Doctor availability updates

For Doctors 👩‍⚕️
📊 Patient Management Dashboard

Complete patient profiles

Medical history access

Appointment queue management

Patient notes and annotations

💊 Prescription System

Digital prescription creation

Drug interaction checker

Prescription history

E-prescription download

📞 Consultation Tools

Video conferencing with screen sharing

Real-time chat during consultations

Session recording (with consent)

Follow-up scheduling

📈 Analytics

Consultation statistics

Patient demographics

Revenue tracking

Performance metrics

For Administrators 🔧
🎛️ System Management

User role management

Platform analytics dashboard

System health monitoring

Audit logs

💳 Payment Integration

Consultation fee management

Payment gateway integration

Transaction history

Invoice generation

🛠️ Tech Stack
Backend
text
🐍 Python 3.8+
🌐 Django 4.0+
🔌 Django REST Framework (DRF)
📡 Django Channels (WebSockets)
🗄️ PostgreSQL / MySQL / SQLite
Frontend
text
⚛️ React.js (or Django Templates)
🎨 HTML5, CSS3, JavaScript
🎭 Bootstrap / Tailwind CSS
📱 Responsive Design
Real-time Communication
text
📹 WebRTC (Video/Voice Calling)
💬 Django Channels (WebSockets for Chat)
🔊 Socket.io
📡 Redis (Message Broker)
Additional Tools
text
🔐 JWT Authentication
📧 SMTP (Email Service)
📱 Twilio (SMS Notifications)
☁️ AWS S3 (File Storage)
🐳 Docker (Containerization)
📊 Celery (Task Queue)
🔍 Elasticsearch (Search)
🏗️ System Architecture
text
┌─────────────────────────────────────────────────────────┐
│                    Client Layer                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │  Browser │  │  Mobile  │  │  Tablet  │              │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘              │
└───────┼─────────────┼─────────────┼────────────────────┘
        │             │             │
        └─────────────┼─────────────┘
                      │
┌─────────────────────▼─────────────────────────────────┐
│              Application Layer (Django)                │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐      │
│  │   REST     │  │  WebSocket │  │   Static   │      │
│  │    API     │  │  (Channels)│  │   Files    │      │
│  └─────┬──────┘  └─────┬──────┘  └────────────┘      │
└────────┼───────────────┼────────────────────────────┘
         │               │
┌────────▼───────┐  ┌───▼──────────────────────────────┐
│   PostgreSQL   │  │  Redis (WebSocket + Celery)      │
│   Database     │  │  Message Broker                   │
└────────────────┘  └──────────────────────────────────┘
         │
┌────────▼─────────────────────────────────────────────┐
│          External Services                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │   AWS    │  │  Twilio  │  │   SMTP   │           │
│  │   S3     │  │   SMS    │  │   Mail   │           │
│  └──────────┘  └──────────┘  └──────────┘           │
└───────────────────────────────────────────────────────┘
📥 Installation
Prerequisites
Before you begin, ensure you have the following installed:

Python 3.8 or higher

pip (Python package manager)

PostgreSQL (or MySQL)

Redis Server

Git

Virtual environment tool (venv or virtualenv)

Step-by-Step Installation
1. Clone the Repository
bash
git clone https://github.com/Abanee/mediconnect.git
cd mediconnect
2. Create Virtual Environment
bash
# On Windows
python -m venv venv
venv\Scripts\activate

# On macOS/Linux
python3 -m venv venv
source venv/bin/activate
3. Install Dependencies
bash
pip install -r requirements.txt
4. Database Setup
bash
# Create PostgreSQL database
createdb mediconnect_db

# Run migrations
python manage.py makemigrations
python manage.py migrate
5. Create Superuser
bash
python manage.py createsuperuser
6. Collect Static Files
bash
python manage.py collectstatic
7. Run Redis Server
bash
# On Windows (if installed via Memurai)
memurai

# On macOS/Linux
redis-server
8. Run Development Server
bash
python manage.py runserver
Visit: http://localhost:8000

⚙️ Configuration
Environment Variables
Create a .env file in the project root:

text
# Django Settings
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database
DB_ENGINE=django.db.backends.postgresql
DB_NAME=mediconnect_db
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Email Configuration
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password

# Twilio (SMS)
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_PHONE_NUMBER=+1234567890

# AWS S3 (File Storage)
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_STORAGE_BUCKET_NAME=mediconnect-files
AWS_S3_REGION_NAME=us-east-1

# WebRTC / Video Calling
WEBRTC_STUN_SERVER=stun:stun.l.google.com:19302
WEBRTC_TURN_SERVER=turn:your-turn-server.com
TURN_USERNAME=your-turn-username
TURN_PASSWORD=your-turn-password
🎮 Usage
For Patients
Register Account

text
Navigate to /register
Fill in personal details
Verify email
Book Appointment

text
Login → Dashboard → Find Doctor
Select specialty and available time
Confirm booking
Start Consultation

text
Go to Appointments
Click "Join Video Call" at scheduled time
Chat or video call with doctor
For Doctors
Setup Profile

text
Login → Profile Settings
Add specialization, qualifications
Set availability schedule
Manage Appointments

text
Dashboard → View Queue
Accept/Reschedule appointments
Add consultation notes
Conduct Consultation

text
Click on patient appointment
Start video/chat session
Write prescription
Schedule follow-up
📡 API Documentation
Authentication Endpoints
Register User
text
POST /api/v1/auth/register/
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "user_type": "patient",
  "first_name": "John",
  "last_name": "Doe"
}

Response: 201 Created
{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
Login
text
POST /api/v1/auth/login/
Content-Type: application/json

{
  "username": "john_doe",
  "password": "SecurePass123"
}

Response: 200 OK
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user_id": 1,
  "username": "john_doe"
}
Appointment Endpoints
Book Appointment
text
POST /api/v1/appointments/
Authorization: Bearer <token>
Content-Type: application/json

{
  "doctor_id": 5,
  "appointment_date": "2026-02-10",
  "appointment_time": "14:30",
  "reason": "Regular checkup"
}

Response: 201 Created
{
  "id": 123,
  "doctor": "Dr. Sarah Smith",
  "patient": "John Doe",
  "date": "2026-02-10",
  "time": "14:30",
  "status": "scheduled"
}
Get Appointments
text
GET /api/v1/appointments/
Authorization: Bearer <token>

Response: 200 OK
[
  {
    "id": 123,
    "doctor": "Dr. Sarah Smith",
    "date": "2026-02-10",
    "time": "14:30",
    "status": "scheduled"
  }
]
WebSocket Endpoints
Connect to Chat
javascript
const socket = new WebSocket(
  'ws://localhost:8000/ws/chat/room_id/'
);

socket.onmessage = function(e) {
  const data = JSON.parse(e.data);
  console.log(data.message);
};

socket.send(JSON.stringify({
  'message': 'Hello Doctor!',
  'sender': 'patient'
}));
🗄️ Database Schema
Key Models
python
# User Model (Extended from Django AbstractUser)
class User(AbstractUser):
    user_type = models.CharField(choices=['patient', 'doctor', 'admin'])
    phone = models.CharField(max_length=15)
    profile_image = models.ImageField(upload_to='profiles/')
    is_verified = models.BooleanField(default=False)

# Patient Model
class Patient(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    date_of_birth = models.DateField()
    blood_group = models.CharField(max_length=5)
    allergies = models.TextField(blank=True)
    medical_history = models.TextField(blank=True)

# Doctor Model
class Doctor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    specialization = models.CharField(max_length=100)
    qualifications = models.TextField()
    experience_years = models.IntegerField()
    consultation_fee = models.DecimalField(max_digits=10, decimal_places=2)
    availability = models.JSONField()

# Appointment Model
class Appointment(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    appointment_date = models.DateField()
    appointment_time = models.TimeField()
    status = models.CharField(choices=['scheduled', 'completed', 'cancelled'])
    reason = models.TextField()
    prescription = models.TextField(blank=True)
    notes = models.TextField(blank=True)

# ChatMessage Model
class ChatMessage(models.Model):
    appointment = models.ForeignKey(Appointment, on_delete=models.CASCADE)
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
📸 Screenshots
Patient Dashboard
Patient Dashboard

Video Consultation
Video Call

Doctor Appointment Queue
Doctor Queue

Real-time Chat
Chat Interface

🧪 Testing
Run Unit Tests
bash
python manage.py test
Run Specific Test Module
bash
python manage.py test appointments.tests
Coverage Report
bash
coverage run --source='.' manage.py test
coverage report
coverage html  # Generate HTML report
API Testing with Postman
Import mediconnect_api_collection.json into Postman

Set environment variables (base_url, token)

Run collection tests

🚀 Deployment
Docker Deployment
1. Build Docker Image
bash
docker build -t mediconnect:latest .
2. Run with Docker Compose
bash
docker-compose up -d
docker-compose.yml:

text
version: '3.8'

services:
  web:
    build: .
    command: gunicorn mediconnect.wsgi:application --bind 0.0.0.0:8000
    volumes:
      - .:/code
      - static_volume:/code/staticfiles
      - media_volume:/code/media
    ports:
      - "8000:8000"
    env_file:
      - .env
    depends_on:
      - db
      - redis

  db:
    image: postgres:13
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_DB=mediconnect_db
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"

  nginx:
    image: nginx:alpine
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - static_volume:/code/staticfiles
      - media_volume:/code/media
    ports:
      - "80:80"
    depends_on:
      - web

volumes:
  postgres_data:
  static_volume:
  media_volume:
Production Deployment (AWS/DigitalOcean)
bash
# Install production dependencies
pip install gunicorn whitenoise

# Collect static files
python manage.py collectstatic --noinput

# Run with Gunicorn
gunicorn mediconnect.wsgi:application --bind 0.0.0.0:8000 --workers 4
🤝 Contributing
We welcome contributions! Please follow these steps:

1. Fork the Repository
Click the "Fork" button at the top right of this page.

2. Clone Your Fork
bash
git clone https://github.com/YOUR-USERNAME/mediconnect.git
cd mediconnect
3. Create a Feature Branch
bash
git checkout -b feature/amazing-feature
4. Make Changes & Commit
bash
git add .
git commit -m "Add: Amazing new feature"
5. Push to Your Fork
bash
git push origin feature/amazing-feature
6. Create Pull Request
Go to the original repository and click "New Pull Request"

Contribution Guidelines
Follow PEP 8 style guide for Python code

Write meaningful commit messages

Add unit tests for new features

Update documentation as needed

Ensure all tests pass before submitting PR

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

text
MIT License

Copyright (c) 2025 Abaneesh M

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
📞 Contact
Abaneesh M

📧 Email: abaneeshabanee87@gmail.com

💼 LinkedIn: linkedin.com/in/abaneesh-m

🐙 GitHub: @Abanee

🌐 Portfolio: Abaneee.netlify.app

📱 Phone: +91 8870517958

🙏 Acknowledgments
Django Community for excellent documentation

WebRTC project for real-time communication

All contributors who helped improve this project

Healthcare professionals who provided domain expertise

🗺️ Roadmap
Version 2.0 (Planned)
 Mobile app (React Native)

 AI-powered symptom checker

 Multi-language support

 Integration with wearable devices

 Pharmacy integration for medicine delivery

 Insurance claim processing

 Health analytics dashboard

 Appointment reminders via WhatsApp

⚠️ Disclaimer
This application is for educational and demonstration purposes. It should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult qualified healthcare providers for medical concerns.

<div align="center">
Built with ❤️ by Abaneesh M

⭐ Star this repo if you find it helpful! ⭐

</div>
