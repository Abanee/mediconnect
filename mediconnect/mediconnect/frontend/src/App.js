


import React, { useState, useEffect } from 'react';
import './App.css';
import { authAPI, getCurrentUser, isAuthenticated } from './services/api';

// Import your components
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import DoctorDirectory from './components/DoctorDirectory';
import AppointmentBookingModal from './components/AppointmentBookingModal';
import ChatConsultation from './components/ChatConsultation';
import MedicineCatalog from './components/MedicineCatalog';
import PatientDashboard from './components/PatientDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import OrderCheckout from './components/OrderCheckout';
import VideoConsultation from './components/VideoConsultation';
import QuickActionsPage from './components/QuickActionsPage';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [user, setUser] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [medicineCart, setMedicineCart] = useState([]);
  const [loading, setLoading] = useState(false);

  // Check for existing login on app start
  useEffect(() => {
    const checkAuth = async () => {
      if (isAuthenticated()) {
        try {
          const userData = getCurrentUser();
          if (userData) {
            setUser(userData);
            // Set the correct dashboard based on user type
            if (userData.user_type === 'doctor') {
              setCurrentPage('doctor-dashboard');
            } else {
              setCurrentPage('patient-dashboard');
            }
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          // Clear invalid tokens
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('user');
        }
      }
    };

    checkAuth();
  }, []);

  const handleLogin = async (loginData) => {
    setLoading(true);
    try {
      const response = await authAPI.login(loginData.username, loginData.password);
      
      // Store tokens and user data
      localStorage.setItem('access_token', response.access);
      localStorage.setItem('refresh_token', response.refresh);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      setUser(response.user);
      
      // Redirect to correct dashboard based on user type
      if (response.user.user_type === 'doctor') {
        setCurrentPage('doctor-dashboard');
      } else {
        setCurrentPage('patient-dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
      const errorMessage = error.data?.detail || error.data?.message || 'Login failed. Please check your credentials.';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (registerData) => {
    setLoading(true);
    try {
      const response = await authAPI.register(registerData);
      
      // Store tokens and user data
      localStorage.setItem('access_token', response.access);
      localStorage.setItem('refresh_token', response.refresh);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      setUser(response.user);
      
      // Redirect to correct dashboard based on user type
      if (response.user.user_type === 'doctor') {
        setCurrentPage('doctor-dashboard');
      } else {
        setCurrentPage('patient-dashboard');
      }
      alert('Registration successful!');
    } catch (error) {
      console.error('Registration failed:', error);
      const errorMessage = error.data?.detail || error.data?.message || 'Registration failed. Please try again.';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authAPI.logout();
    setUser(null);
    setCurrentPage('landing');
  };

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setShowBookingModal(true);
  };

  const handleConfirmBooking = async (bookingData) => {
    try {
      console.log('Appointment booking confirmed:', bookingData);
      alert('Appointment booked successfully!');
      setShowBookingModal(false);
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Failed to book appointment. Please try again.');
    }
  };

  const handleStartChat = (doctor) => {
    setSelectedDoctor(doctor);
    setShowChat(true);
  };

  const handleStartVideoCall = (doctor) => {
    setSelectedDoctor(doctor);
    setShowVideoCall(true);
  };

  const handleProceedToCheckout = (cart) => {
    setMedicineCart(cart);
    setCurrentPage('checkout');
  };

  const handlePlaceOrder = async (orderData) => {
    try {
      console.log('Placing order:', orderData);
      alert('Order placed successfully!');
      setCurrentPage('patient-dashboard');
    } catch (error) {
      console.error('Order failed:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  // Render the correct dashboard based on current page and user type
  const renderDashboard = () => {
    if (!user) return null;

    if (currentPage === 'patient-dashboard') {
      return <PatientDashboard user={user} onNavigate={setCurrentPage} />;
    } else if (currentPage === 'doctor-dashboard') {
      return <DoctorDashboard user={user} onNavigate={setCurrentPage} />;
    }
    return null;
  };

  return (
    <div className="App">
      {user && currentPage !== 'landing' && currentPage !== 'login' && currentPage !== 'register' && (
        <Navbar
          user={user}
          onNavigate={setCurrentPage}
          onLogout={handleLogout}
          currentPage={currentPage}
        />
      )}

      <main className="main-content">
        {currentPage === 'landing' && <LandingPage onNavigate={setCurrentPage} />}
        {currentPage === 'login' && (
          <Login 
            onNavigate={setCurrentPage} 
            onLogin={handleLogin}
            loading={loading}
          />
        )}
        {currentPage === 'register' && (
          <Register 
            onNavigate={setCurrentPage} 
            onRegister={handleRegister}
            loading={loading}
          />
        )}

        {/* Render the correct dashboard */}
        {renderDashboard()}

        {user && currentPage === 'doctors' && (
          <DoctorDirectory
            onBookAppointment={handleBookAppointment}
            onStartChat={handleStartChat}
            onStartVideoCall={handleStartVideoCall}
          />
        )}

        {user && currentPage === 'medicines' && (
          <MedicineCatalog onProceedToCheckout={handleProceedToCheckout} />
        )}

        {user && currentPage === 'checkout' && (
          <OrderCheckout
            cart={medicineCart}
            user={user}
            onNavigate={setCurrentPage}
            onPlaceOrder={handlePlaceOrder}
          />
        )}

        {user && currentPage === 'quick-actions' && (
          <QuickActionsPage user={user} onNavigate={setCurrentPage} />
        )}

        {showBookingModal && selectedDoctor && (
          <AppointmentBookingModal
            doctor={selectedDoctor}
            onClose={() => setShowBookingModal(false)}
            onConfirm={handleConfirmBooking}
          />
        )}

        {showChat && selectedDoctor && (
          <ChatConsultation
            doctor={selectedDoctor}
            patient={user}
            onClose={() => setShowChat(false)}
          />
        )}

        {showVideoCall && selectedDoctor && (
          <VideoConsultation
            doctor={selectedDoctor}
            user={user}
            onClose={() => setShowVideoCall(false)}
          />
        )}
      </main>
    </div>
  );
}

export default App;