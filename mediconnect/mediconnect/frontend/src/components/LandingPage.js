import React from 'react';

function LandingPage({ onNavigate }) {
  return (
    <div className="hero-section fade-in">
      <div className="container">
        <div className="bounce">
          <i className="fas fa-heartbeat" style={{ fontSize: '80px', marginBottom: '20px' }}></i>
        </div>
        <h1 className="hero-title">Welcome to MediConnect</h1>
        <p className="hero-subtitle">Your Virtual Healthcare Companion</p>
        <p className="mb-4" style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 40px' }}>
          Connect with experienced doctors, book appointments, get prescriptions, and order medicines - all from the comfort of your home.
        </p>
        <div className="d-flex gap-3 justify-content-center flex-wrap">
          <button className="btn btn-light btn-lg" onClick={() => onNavigate('login')}>
            <i className="fas fa-sign-in-alt me-2"></i>Login
          </button>
          <button className="btn btn-outline-light btn-lg" onClick={() => onNavigate('register')}>
            <i className="fas fa-user-plus me-2"></i>Register
          </button>
        </div>
        <div className="mt-5">
          <div className="row text-center">
            <div className="col-md-4 mb-3 slide-in-left">
              <i className="fas fa-user-md" style={{ fontSize: '48px', marginBottom: '16px' }}></i>
              <h4>Expert Doctors</h4>
              <p>Consult with specialists</p>
            </div>
            <div className="col-md-4 mb-3 fade-in" style={{ animationDelay: '0.2s' }}>
              <i className="fas fa-video" style={{ fontSize: '48px', marginBottom: '16px' }}></i>
              <h4>Virtual Consultations</h4>
              <p>Chat with doctors online</p>
            </div>
            <div className="col-md-4 mb-3 slide-in-right">
              <i className="fas fa-pills" style={{ fontSize: '48px', marginBottom: '16px' }}></i>
              <h4>Medicine Delivery</h4>
              <p>Order medicines online</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
