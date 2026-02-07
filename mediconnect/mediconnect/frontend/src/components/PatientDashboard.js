// import React, { useState } from 'react';
// import { mockData } from '../data/mockData';

// function PatientDashboard({ user, onNavigate }) {
//   const [appointments] = useState([
//     { id: 1, doctor: 'Dr. Maya Ramesh', specialty: 'Cardiologist', date: '2025-11-15', time: '10:00 AM', status: 'upcoming' },
//     { id: 2, doctor: 'Dr. Anil Kumar', specialty: 'Neurologist', date: '2025-11-12', time: '02:00 PM', status: 'completed' }
//   ]);

//   const [prescriptions] = useState([
//     { id: 1, doctor: 'Dr. Anil Kumar', date: '2025-11-12', medicines: ['Paracetamol 500mg', 'Cetirizine 10mg'] }
//   ]);

//   const [orders] = useState([
//     { id: 1, items: 2, total: 159, status: 'delivered', date: '2025-11-10' },
//     { id: 2, items: 1, total: 24, status: 'in-transit', date: '2025-11-11' }
//   ]);

//   return (
//     <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#f0f2f5' }}>
//       <div className="container py-4">
//         <div className="mb-4 fade-in">
//           <h1>Welcome back, {user.name}!</h1>
//           <p className="text-muted">Here's your health dashboard</p>
//         </div>

//         {/* Stats */}
//         <div className="row mb-4">
//           <div className="col-md-3 mb-3 slide-in-left">
//             <div className="stat-card" style={{ borderLeft: '4px solid var(--primary-color)' }}>
//               <div className="stat-icon" style={{ background: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary-color)' }}>
//                 <i className="fas fa-calendar-check"></i>
//               </div>
//               <h3 className="mb-1">{appointments.length}</h3>
//               <p className="text-muted mb-0">Appointments</p>
//             </div>
//           </div>
//           <div className="col-md-3 mb-3 fade-in" style={{ animationDelay: '0.1s' }}>
//             <div className="stat-card" style={{ borderLeft: '4px solid var(--success-color)' }}>
//               <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success-color)' }}>
//                 <i className="fas fa-prescription"></i>
//               </div>
//               <h3 className="mb-1">{prescriptions.length}</h3>
//               <p className="text-muted mb-0">Prescriptions</p>
//             </div>
//           </div>
//           <div className="col-md-3 mb-3 fade-in" style={{ animationDelay: '0.2s' }}>
//             <div className="stat-card" style={{ borderLeft: '4px solid var(--warning-color)' }}>
//               <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning-color)' }}>
//                 <i className="fas fa-box"></i>
//               </div>
//               <h3 className="mb-1">{orders.length}</h3>
//               <p className="text-muted mb-0">Orders</p>
//             </div>
//           </div>
//           <div className="col-md-3 mb-3 slide-in-right">
//             <div className="stat-card" style={{ borderLeft: '4px solid var(--secondary-color)' }}>
//               <div className="stat-icon" style={{ background: 'rgba(6, 182, 212, 0.1)', color: 'var(--secondary-color)' }}>
//                 <i className="fas fa-user-md"></i>
//               </div>
//               <h3 className="mb-1">{mockData.doctors.length}</h3>
//               <p className="text-muted mb-0">Available Doctors</p>
//             </div>
//           </div>
//         </div>

//         {/* Quick Actions */}
//         {/* <div className="card mb-4 fade-in">
//           <div className="card-body">
//             <h5 className="mb-3">Quick Actions</h5>
//             <div className="d-flex gap-2 flex-wrap">
//               <button className="btn btn-primary" onClick={() => onNavigate('doctors')}>
//                 <i className="fas fa-user-md me-2"></i>Find a Doctor
//               </button>
//               <button className="btn btn-success" onClick={() => onNavigate('medicines')}>
//                 <i className="fas fa-pills me-2"></i>Order Medicines
//               </button>
//               <button className="btn btn-info text-white">
//                 <i className="fas fa-download me-2"></i>Download Reports
//               </button>
//             </div>
//           </div>
//         </div> */}
//         <div className="d-flex gap-2 flex-wrap">
//   <button className="btn btn-primary" onClick={() => onNavigate('doctors')}>
//     <i className="fas fa-user-md me-2"></i>Find a Doctor
//   </button>
//   <button className="btn btn-success" onClick={() => onNavigate('medicines')}>
//     <i className="fas fa-pills me-2"></i>Order Medicines
//   </button>
//   <button className="btn btn-info text-white" onClick={() => onNavigate('quick-actions')}>
//     <i className="fas fa-bolt me-2"></i>Quick Actions
//   </button>
//   <button className="btn btn-warning text-white">
//     <i className="fas fa-download me-2"></i>Download Reports
//   </button>
// </div>

//         <div className="row">
//           {/* Upcoming Appointments */}
//           <div className="col-lg-6 mb-4">
//             <div className="card slide-in-left">
//               <div className="card-header bg-white">
//                 <h5 className="mb-0"><i className="fas fa-calendar-alt me-2"></i>Upcoming Appointments</h5>
//               </div>
//               <div className="card-body">
//                 {appointments.filter(a => a.status === 'upcoming').map((apt, index) => (
//                   <div key={apt.id} className="mb-3 pb-3" style={{ borderBottom: index < appointments.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
//                     <div className="d-flex justify-content-between align-items-start">
//                       <div>
//                         <h6 className="mb-1">{apt.doctor}</h6>
//                         <p className="text-muted small mb-1">{apt.specialty}</p>
//                         <p className="mb-0"><i className="fas fa-calendar me-1"></i>{apt.date} at {apt.time}</p>
//                       </div>
//                       <button className="btn btn-sm btn-outline-primary">
//                         <i className="fas fa-video"></i>
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//                 {appointments.filter(a => a.status === 'upcoming').length === 0 && (
//                   <p className="text-muted text-center">No upcoming appointments</p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Recent Prescriptions */}
//           <div className="col-lg-6 mb-4">
//             <div className="card slide-in-right">
//               <div className="card-header bg-white">
//                 <h5 className="mb-0"><i className="fas fa-prescription me-2"></i>Recent Prescriptions</h5>
//               </div>
//               <div className="card-body">
//                 {prescriptions.map((prescription, index) => (
//                   <div key={prescription.id} className="mb-3 pb-3" style={{ borderBottom: index < prescriptions.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
//                     <div className="d-flex justify-content-between align-items-start">
//                       <div>
//                         <h6 className="mb-1">Prescription from {prescription.doctor}</h6>
//                         <p className="text-muted small mb-2">{prescription.date}</p>
//                         <div>
//                           {prescription.medicines.map((med, idx) => (
//                             <span key={idx} className="badge bg-light text-dark me-1 mb-1">{med}</span>
//                           ))}
//                         </div>
//                       </div>
//                       <button className="btn btn-sm btn-outline-primary">
//                         <i className="fas fa-download"></i>
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Order Tracking */}
//           <div className="col-12">
//             <div className="card fade-in">
//               <div className="card-header bg-white">
//                 <h5 className="mb-0"><i className="fas fa-shipping-fast me-2"></i>Medicine Orders</h5>
//               </div>
//               <div className="card-body">
//                 <div className="row">
//                   {orders.map((order) => (
//                     <div key={order.id} className="col-md-6 mb-3">
//                       <div className="card" style={{ background: '#f8f9fa' }}>
//                         <div className="card-body">
//                           <div className="d-flex justify-content-between align-items-start mb-3">
//                             <div>
//                               <h6 className="mb-1">Order #{order.id}</h6>
//                               <p className="text-muted small mb-0">{order.date}</p>
//                             </div>
//                             <span className={`badge ${order.status === 'delivered' ? 'bg-success' : 'bg-warning'}`}>
//                               {order.status === 'delivered' ? 'Delivered' : 'In Transit'}
//                             </span>
//                           </div>
//                           <div className="d-flex justify-content-between align-items-center">
//                             <span>{order.items} items</span>
//                             <strong>₹{order.total}</strong>
//                           </div>
//                           <div className="progress mt-2" style={{ height: '6px' }}>
//                             <div 
//                               className={`progress-bar ${order.status === 'delivered' ? 'bg-success' : 'bg-warning'}`}
//                               style={{ width: order.status === 'delivered' ? '100%' : '60%' }}
//                             ></div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PatientDashboard;


import React, { useState, useEffect } from 'react';
import { dashboardAPI, appointmentsAPI, prescriptionsAPI, ordersAPI } from '../services/api';

function PatientDashboard({ user, onNavigate }) {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await dashboardAPI.getPatientDashboard();
      setDashboardData(data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      setError('Failed to load dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#f0f2f5' }}>
        <div className="container py-4">
          <div className="text-center">
            <div className="spinner-border text-primary mb-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <h3>Loading Dashboard...</h3>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#f0f2f5' }}>
        <div className="container py-4">
          <div className="text-center">
            <i className="fas fa-exclamation-triangle text-warning mb-3" style={{ fontSize: '48px' }}></i>
            <h3>Unable to Load Dashboard</h3>
            <p className="mb-4">{error}</p>
            <button className="btn btn-primary" onClick={fetchDashboardData}>
              <i className="fas fa-redo me-2"></i>Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { stats, upcoming_appointments, recent_prescriptions, recent_orders } = dashboardData;

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#f0f2f5' }}>
      <div className="container py-4">
        <div className="mb-4 fade-in">
          <h1>Welcome back, {user.name}!</h1>
          <p className="text-muted">Here's your health dashboard</p>
        </div>

        {/* Stats */}
        <div className="row mb-4">
          <div className="col-md-3 mb-3 slide-in-left">
            <div className="stat-card" style={{ borderLeft: '4px solid var(--primary-color)' }}>
              <div className="stat-icon" style={{ background: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary-color)' }}>
                <i className="fas fa-calendar-check"></i>
              </div>
              <h3 className="mb-1">{stats?.appointments_count || 0}</h3>
              <p className="text-muted mb-0">Appointments</p>
            </div>
          </div>
          <div className="col-md-3 mb-3 fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="stat-card" style={{ borderLeft: '4px solid var(--success-color)' }}>
              <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success-color)' }}>
                <i className="fas fa-prescription"></i>
              </div>
              <h3 className="mb-1">{stats?.prescriptions_count || 0}</h3>
              <p className="text-muted mb-0">Prescriptions</p>
            </div>
          </div>
          <div className="col-md-3 mb-3 fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="stat-card" style={{ borderLeft: '4px solid var(--warning-color)' }}>
              <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning-color)' }}>
                <i className="fas fa-box"></i>
              </div>
              <h3 className="mb-1">{stats?.orders_count || 0}</h3>
              <p className="text-muted mb-0">Orders</p>
            </div>
          </div>
          <div className="col-md-3 mb-3 slide-in-right">
            <div className="stat-card" style={{ borderLeft: '4px solid var(--secondary-color)' }}>
              <div className="stat-icon" style={{ background: 'rgba(6, 182, 212, 0.1)', color: 'var(--secondary-color)' }}>
                <i className="fas fa-user-md"></i>
              </div>
              <h3 className="mb-1">{stats?.doctors_count || 0}</h3>
              <p className="text-muted mb-0">Available Doctors</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="d-flex gap-2 flex-wrap mb-4">
          <button className="btn btn-primary" onClick={() => onNavigate('doctors')}>
            <i className="fas fa-user-md me-2"></i>Find a Doctor
          </button>
          <button className="btn btn-success" onClick={() => onNavigate('medicines')}>
            <i className="fas fa-pills me-2"></i>Order Medicines
          </button>
          <button className="btn btn-info text-white" onClick={() => onNavigate('quick-actions')}>
            <i className="fas fa-bolt me-2"></i>Quick Actions
          </button>
          <button className="btn btn-warning text-white">
            <i className="fas fa-download me-2"></i>Download Reports
          </button>
        </div>

        <div className="row">
          {/* Upcoming Appointments */}
          <div className="col-lg-6 mb-4">
            <div className="card slide-in-left">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0"><i className="fas fa-calendar-alt me-2"></i>Upcoming Appointments</h5>
                <span className="badge bg-primary">{upcoming_appointments?.length || 0}</span>
              </div>
              <div className="card-body">
                {upcoming_appointments && upcoming_appointments.length > 0 ? (
                  upcoming_appointments.map((apt, index) => (
                    <div key={apt.id} className="mb-3 pb-3" style={{ borderBottom: index < upcoming_appointments.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="mb-1">{apt.doctor_name}</h6>
                          <p className="text-muted small mb-1">{apt.doctor_specialty}</p>
                          <p className="mb-0">
                            <i className="fas fa-calendar me-1"></i>
                            {new Date(apt.appointment_date).toLocaleDateString()} at {apt.appointment_time}
                          </p>
                          <span className={`badge ${apt.status === 'confirmed' ? 'bg-success' : 'bg-warning'}`}>
                            {apt.status}
                          </span>
                        </div>
                        <button className="btn btn-sm btn-outline-primary">
                          <i className="fas fa-video"></i>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted text-center">No upcoming appointments</p>
                )}
              </div>
            </div>
          </div>

          {/* Recent Prescriptions */}
          <div className="col-lg-6 mb-4">
            <div className="card slide-in-right">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0"><i className="fas fa-prescription me-2"></i>Recent Prescriptions</h5>
                <span className="badge bg-success">{recent_prescriptions?.length || 0}</span>
              </div>
              <div className="card-body">
                {recent_prescriptions && recent_prescriptions.length > 0 ? (
                  recent_prescriptions.map((prescription, index) => (
                    <div key={prescription.id} className="mb-3 pb-3" style={{ borderBottom: index < recent_prescriptions.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="mb-1">Prescription from {prescription.doctor_name}</h6>
                          <p className="text-muted small mb-2">
                            {new Date(prescription.created_at).toLocaleDateString()}
                          </p>
                          <div>
                            {prescription.medicines && prescription.medicines.slice(0, 3).map((med, idx) => (
                              <span key={idx} className="badge bg-light text-dark me-1 mb-1">
                                {med.medicine_name}
                              </span>
                            ))}
                            {prescription.medicines && prescription.medicines.length > 3 && (
                              <span className="badge bg-secondary">
                                +{prescription.medicines.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                        <button className="btn btn-sm btn-outline-primary">
                          <i className="fas fa-download"></i>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted text-center">No recent prescriptions</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Refresh button */}
        <div className="text-center mt-4">
          <button 
            className="btn btn-outline-primary btn-sm" 
            onClick={fetchDashboardData}
            disabled={loading}
          >
            <i className="fas fa-sync-alt me-2"></i>
            {loading ? 'Refreshing...' : 'Refresh Dashboard'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PatientDashboard;