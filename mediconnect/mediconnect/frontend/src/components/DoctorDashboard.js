// import React, { useState } from 'react';

// function DoctorDashboard({ user }) {
//   const [todayAppointments] = useState([
//     { id: 1, patient: 'Ravi Prasad', time: '10:00 AM', status: 'completed' },
//     { id: 2, patient: 'Priya Menon', time: '11:30 AM', status: 'upcoming' },
//     { id: 3, patient: 'Amit Sharma', time: '02:00 PM', status: 'upcoming' }
//   ]);

//   return (
//     <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#f0f2f5' }}>
//       <div className="container py-4">
//         <div className="mb-4 fade-in">
//           <h1>Welcome, {user.name}!</h1>
//           <p className="text-muted">Here's your practice overview</p>
//         </div>

//         {/* Stats */}
//         <div className="row mb-4">
//           <div className="col-md-3 mb-3 slide-in-left">
//             <div className="stat-card" style={{ borderLeft: '4px solid var(--primary-color)' }}>
//               <div className="stat-icon" style={{ background: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary-color)' }}>
//                 <i className="fas fa-calendar-day"></i>
//               </div>
//               <h3 className="mb-1">{todayAppointments.length}</h3>
//               <p className="text-muted mb-0">Today's Appointments</p>
//             </div>
//           </div>
//           <div className="col-md-3 mb-3 fade-in" style={{ animationDelay: '0.1s' }}>
//             <div className="stat-card" style={{ borderLeft: '4px solid var(--success-color)' }}>
//               <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success-color)' }}>
//                 <i className="fas fa-users"></i>
//               </div>
//               <h3 className="mb-1">127</h3>
//               <p className="text-muted mb-0">Total Patients</p>
//             </div>
//           </div>
//           <div className="col-md-3 mb-3 fade-in" style={{ animationDelay: '0.2s' }}>
//             <div className="stat-card" style={{ borderLeft: '4px solid var(--warning-color)' }}>
//               <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning-color)' }}>
//                 <i className="fas fa-star"></i>
//               </div>
//               <h3 className="mb-1">4.8</h3>
//               <p className="text-muted mb-0">Rating</p>
//             </div>
//           </div>
//           <div className="col-md-3 mb-3 slide-in-right">
//             <div className="stat-card" style={{ borderLeft: '4px solid var(--secondary-color)' }}>
//               <div className="stat-icon" style={{ background: 'rgba(6, 182, 212, 0.1)', color: 'var(--secondary-color)' }}>
//                 <i className="fas fa-prescription"></i>
//               </div>
//               <h3 className="mb-1">45</h3>
//               <p className="text-muted mb-0">Prescriptions Issued</p>
//             </div>
//           </div>
//         </div>

//         <div className="row">
//           {/* Today's Schedule */}
//           <div className="col-lg-8 mb-4">
//             <div className="card slide-in-left">
//               <div className="card-header bg-white">
//                 <h5 className="mb-0"><i className="fas fa-calendar-alt me-2"></i>Today's Schedule</h5>
//               </div>
//               <div className="card-body">
//                 {todayAppointments.map((apt, index) => (
//                   <div key={apt.id} className="mb-3 pb-3" style={{ borderBottom: index < todayAppointments.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
//                     <div className="d-flex justify-content-between align-items-center">
//                       <div>
//                         <h6 className="mb-1">{apt.patient}</h6>
//                         <p className="mb-0 text-muted"><i className="fas fa-clock me-1"></i>{apt.time}</p>
//                       </div>
//                       <div>
//                         {apt.status === 'completed' ? (
//                           <span className="badge bg-success">Completed</span>
//                         ) : (
//                           <button className="btn btn-sm btn-primary">
//                             <i className="fas fa-video me-1"></i>Start Consultation
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Quick Actions */}
//           <div className="col-lg-4 mb-4">
//             <div className="card slide-in-right">
//               <div className="card-header bg-white">
//                 <h5 className="mb-0"><i className="fas fa-bolt me-2"></i>Quick Actions</h5>
//               </div>
//               <div className="card-body">
//                 <div className="d-grid gap-2">
//                   <button className="btn btn-outline-primary">
//                     <i className="fas fa-calendar-plus me-2"></i>Manage Availability
//                   </button>
//                   <button className="btn btn-outline-success">
//                     <i className="fas fa-user-plus me-2"></i>Add Patient
//                   </button>
//                   <button className="btn btn-outline-info">
//                     <i className="fas fa-prescription me-2"></i>Create Prescription
//                   </button>
//                   <button className="btn btn-outline-warning">
//                     <i className="fas fa-chart-line me-2"></i>View Reports
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DoctorDashboard;


import React, { useState, useEffect } from 'react';
import { dashboardAPI } from '../services/api';

function DoctorDashboard({ user }) {
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
      const data = await dashboardAPI.getDoctorDashboard();
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

  const { stats, today_schedule, recent_appointments } = dashboardData;

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#f0f2f5' }}>
      <div className="container py-4">
        <div className="mb-4 fade-in">
          <h1>Welcome, {user.name}!</h1>
          <p className="text-muted">Here's your practice overview</p>
        </div>

        {/* Stats */}
        <div className="row mb-4">
          <div className="col-md-3 mb-3 slide-in-left">
            <div className="stat-card" style={{ borderLeft: '4px solid var(--primary-color)' }}>
              <div className="stat-icon" style={{ background: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary-color)' }}>
                <i className="fas fa-calendar-day"></i>
              </div>
              <h3 className="mb-1">{stats?.today_appointments || 0}</h3>
              <p className="text-muted mb-0">Today's Appointments</p>
            </div>
          </div>
          <div className="col-md-3 mb-3 fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="stat-card" style={{ borderLeft: '4px solid var(--success-color)' }}>
              <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success-color)' }}>
                <i className="fas fa-users"></i>
              </div>
              <h3 className="mb-1">{stats?.total_patients || 0}</h3>
              <p className="text-muted mb-0">Total Patients</p>
            </div>
          </div>
          <div className="col-md-3 mb-3 fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="stat-card" style={{ borderLeft: '4px solid var(--warning-color)' }}>
              <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning-color)' }}>
                <i className="fas fa-star"></i>
              </div>
              <h3 className="mb-1">{stats?.rating || 0}</h3>
              <p className="text-muted mb-0">Rating</p>
            </div>
          </div>
          <div className="col-md-3 mb-3 slide-in-right">
            <div className="stat-card" style={{ borderLeft: '4px solid var(--secondary-color)' }}>
              <div className="stat-icon" style={{ background: 'rgba(6, 182, 212, 0.1)', color: 'var(--secondary-color)' }}>
                <i className="fas fa-prescription"></i>
              </div>
              <h3 className="mb-1">{stats?.prescriptions_issued || 0}</h3>
              <p className="text-muted mb-0">Prescriptions Issued</p>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Today's Schedule */}
          <div className="col-lg-8 mb-4">
            <div className="card slide-in-left">
              <div className="card-header bg-white">
                <h5 className="mb-0"><i className="fas fa-calendar-alt me-2"></i>Today's Schedule</h5>
              </div>
              <div className="card-body">
                {today_schedule && today_schedule.length > 0 ? (
                  today_schedule.map((apt, index) => (
                    <div key={apt.id} className="mb-3 pb-3" style={{ borderBottom: index < today_schedule.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-1">{apt.patient_name}</h6>
                          <p className="mb-0 text-muted"><i className="fas fa-clock me-1"></i>{apt.appointment_time}</p>
                        </div>
                        <div>
                          {apt.status === 'completed' ? (
                            <span className="badge bg-success">Completed</span>
                          ) : (
                            <button className="btn btn-sm btn-primary">
                              <i className="fas fa-video me-1"></i>Start Consultation
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted text-center">No appointments for today</p>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="col-lg-4 mb-4">
            <div className="card slide-in-right">
              <div className="card-header bg-white">
                <h5 className="mb-0"><i className="fas fa-bolt me-2"></i>Quick Actions</h5>
              </div>
              <div className="card-body">
                <div className="d-grid gap-2">
                  <button className="btn btn-outline-primary">
                    <i className="fas fa-calendar-plus me-2"></i>Manage Availability
                  </button>
                  <button className="btn btn-outline-success">
                    <i className="fas fa-user-plus me-2"></i>Add Patient
                  </button>
                  <button className="btn btn-outline-info">
                    <i className="fas fa-prescription me-2"></i>Create Prescription
                  </button>
                  <button className="btn btn-outline-warning">
                    <i className="fas fa-chart-line me-2"></i>View Reports
                  </button>
                </div>
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

export default DoctorDashboard;