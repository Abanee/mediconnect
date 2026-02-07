

import React, { useState } from 'react';

function Login({ onNavigate, onLogin, loading }) {
  const [formData, setFormData] = useState({
    username: '', // Fixed: using username instead of email
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = 'Username or email is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    onLogin(formData);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card fade-in">
        <div className="text-center mb-4">
          <i className="fas fa-heartbeat" style={{ fontSize: '48px', color: 'var(--primary-color)' }}></i>
          <h2 className="mt-3">Welcome Back</h2>
          <p className="text-muted">Login to your account</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username or Email</label>
            <input 
              type="text" 
              className={`form-control ${errors.username ? 'is-invalid' : ''}`}
              placeholder="Enter your username or email"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              required
            />
            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              required
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading}>
            {loading ? (
              <><span className="spinner-border spinner-border-sm me-2"></span>Logging in...</>
            ) : (
              <><i className="fas fa-sign-in-alt me-2"></i>Login</>
            )}
          </button>
        </form>
        <div className="text-center">
          <p className="text-muted">
            Don't have an account? 
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); onNavigate('register'); }} 
              className="ms-1" 
              style={{ color: 'var(--primary-color)' }}
            >
              Register
            </a>
          </p>
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); onNavigate('landing'); }} 
            className="text-muted"
          >
            <i className="fas fa-arrow-left me-1"></i>Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;