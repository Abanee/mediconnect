import React from 'react';

function QuickActionsPage({ user, onNavigate }) {
  const quickActions = [
    {
      icon: 'fas fa-user-md',
      title: 'Book Appointment',
      description: 'Schedule consultation with specialist doctors',
      color: '#4f46e5',
      action: () => onNavigate('doctors')
    },
    {
      icon: 'fas fa-prescription',
      title: 'Order Medicines',
      description: 'Get prescribed medicines delivered to your doorstep',
      color: '#10b981',
      action: () => onNavigate('medicines')
    },
    {
      icon: 'fas fa-file-medical',
      title: 'Medical Records',
      description: 'Access your health records and reports',
      color: '#f59e0b',
      action: () => alert('Medical records feature coming soon!')
    },
    {
      icon: 'fas fa-ambulance',
      title: 'Emergency',
      description: 'Immediate medical assistance',
      color: '#ef4444',
      action: () => alert('Emergency services would be connected here')
    },
    {
      icon: 'fas fa-calendar-check',
      title: 'My Appointments',
      description: 'View and manage your appointments',
      color: '#06b6d4',
      action: () => onNavigate('dashboard')
    },
    {
      icon: 'fas fa-heartbeat',
      title: 'Health Tips',
      description: 'Get personalized health recommendations',
      color: '#8b5cf6',
      action: () => alert('Health tips feature coming soon!')
    }
  ];

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#f0f2f5' }}>
      <div className="quick-actions-page">
        <div className="page-header">
          <h1>Quick Actions</h1>
          <p className="text-muted">Quick access to all healthcare services</p>
        </div>

        <div className="actions-grid">
          {quickActions.map((action, index) => (
            <div 
              key={index}
              className="action-card fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={action.action}
            >
              <div 
                className="action-icon"
                style={{ background: `${action.color}20`, color: action.color }}
              >
                <i className={action.icon}></i>
              </div>
              <div className="action-content">
                <h3>{action.title}</h3>
                <p>{action.description}</p>
              </div>
              <div className="action-arrow">
                <i className="fas fa-chevron-right"></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuickActionsPage;