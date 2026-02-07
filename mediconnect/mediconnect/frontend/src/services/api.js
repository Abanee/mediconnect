

const API_BASE_URL = 'http://localhost:8000/api';

// Helper function to handle API calls
const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('access_token');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  // Remove headers from options to avoid duplication
  if (config.body && typeof config.body === 'object' && !(config.body instanceof FormData)) {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    // Handle unauthorized (token expired)
    if (response.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
      throw new Error('Authentication failed');
    }
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const error = new Error(errorData.detail || errorData.message || `API error: ${response.status}`);
      error.response = response;
      error.data = errorData;
      throw error;
    }
    
    // Handle 204 No Content
    if (response.status === 204) {
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Authentication API
export const authAPI = {
  login: (username, password) => 
    apiRequest('/auth/login/', {
      method: 'POST',
      body: { username, password },
    }),

  register: (userData) =>
    apiRequest('/auth/register/', {
      method: 'POST',
      body: userData,
    }),

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  },
};

// Doctors API
export const doctorsAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/doctors/${queryString ? `?${queryString}` : ''}`);
  },
  getById: (id) => apiRequest(`/doctors/${id}/`),
  search: (query) => apiRequest(`/doctors/?search=${encodeURIComponent(query)}`),
  filterBySpecialty: (specialty) => apiRequest(`/doctors/?specialty=${encodeURIComponent(specialty)}`),
};

// Medicines API
export const medicinesAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/medicines/${queryString ? `?${queryString}` : ''}`);
  },
  getById: (id) => apiRequest(`/medicines/${id}/`),
  search: (query) => apiRequest(`/medicines/?search=${encodeURIComponent(query)}`),
  filterByStock: (inStock) => apiRequest(`/medicines/?in_stock=${inStock}`),
};

// Appointments API
export const appointmentsAPI = {
  getAll: () => apiRequest('/appointments/'),
  getById: (id) => apiRequest(`/appointments/${id}/`),
  create: (appointmentData) =>
    apiRequest('/appointments/', {
      method: 'POST',
      body: appointmentData,
    }),
  update: (id, appointmentData) =>
    apiRequest(`/appointments/${id}/`, {
      method: 'PUT',
      body: appointmentData,
    }),
  delete: (id) =>
    apiRequest(`/appointments/${id}/`, {
      method: 'DELETE',
    }),
};

// Orders API
export const ordersAPI = {
  getAll: () => apiRequest('/orders/'),
  getById: (id) => apiRequest(`/orders/${id}/`),
  create: (orderData) =>
    apiRequest('/orders/', {
      method: 'POST',
      body: orderData,
    }),
  updateStatus: (id, status) =>
    apiRequest(`/orders/${id}/update_status/`, {
      method: 'POST',
      body: { status },
    }),
};

// Prescriptions API
export const prescriptionsAPI = {
  getAll: () => apiRequest('/prescriptions/'),
  getById: (id) => apiRequest(`/prescriptions/${id}/`),
  create: (prescriptionData) =>
    apiRequest('/prescriptions/', {
      method: 'POST',
      body: prescriptionData,
    }),
};

// Chat API
export const chatAPI = {
  getMessages: (appointmentId) => apiRequest(`/chat-messages/?appointment=${appointmentId}`),
  sendMessage: (messageData) =>
    apiRequest('/chat-messages/', {
      method: 'POST',
      body: messageData,
    }),
};

// Dashboard API
export const dashboardAPI = {
  getPatientDashboard: () => apiRequest('/dashboard/patient/'),
  getDoctorDashboard: () => apiRequest('/dashboard/doctor/'),
};

// Quick Actions API
export const quickActionsAPI = {
  getActions: () => apiRequest('/quick-actions/'),
};

// Token management
export const tokenAPI = {
  refreshToken: (refreshToken) =>
    apiRequest('/auth/token/refresh/', {
      method: 'POST',
      body: { refresh: refreshToken },
    }),
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem('access_token');
  if (!token) return false;
  
  // Basic token validation (you might want to add more robust checks)
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp > Date.now() / 1000;
  } catch {
    return false;
  }
};

// Get current user
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};