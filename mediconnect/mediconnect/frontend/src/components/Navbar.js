// import React from 'react';

// function Navbar({ user, onNavigate, onLogout, currentPage }) {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-light fixed-top">
//       <div className="container-fluid px-4">
//         <a className="navbar-brand" href="#" onClick={(e) => { e.preventDefault(); onNavigate('dashboard'); }}>
//           <i className="fas fa-heartbeat me-2" style={{ color: 'var(--primary-color)' }}></i>
//           <strong>MediConnect</strong>
//         </a>
//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav ms-auto">
//             <li className="nav-item">
//               <a className={`nav-link ${currentPage === 'dashboard' ? 'active' : ''}`} href="#" onClick={(e) => { e.preventDefault(); onNavigate('dashboard'); }}>
//                 <i className="fas fa-home me-1"></i>Dashboard
//               </a>
//             </li>
//             {/* {user.userType === 'patient' && (
//               <>
//                 <li className="nav-item">
//                   <a className={`nav-link ${currentPage === 'doctors' ? 'active' : ''}`} href="#" onClick={(e) => { e.preventDefault(); onNavigate('doctors'); }}>
//                     <i className="fas fa-user-md me-1"></i>Doctors
//                   </a>
//                 </li>
//                 <li className="nav-item">
//                   <a className={`nav-link ${currentPage === 'medicines' ? 'active' : ''}`} href="#" onClick={(e) => { e.preventDefault(); onNavigate('medicines'); }}>
//                     <i className="fas fa-pills me-1"></i>Medicines
//                   </a>
//                 </li>
//               </>
//             )} */}

//             {user.userType === 'patient' && (
//   <>
//     <li className="nav-item">
//       <a className={`nav-link ${currentPage === 'doctors' ? 'active' : ''}`} href="#" onClick={(e) => { e.preventDefault(); onNavigate('doctors'); }}>
//         <i className="fas fa-user-md me-1"></i>Doctors
//       </a>
//     </li>
//     <li className="nav-item">
//       <a className={`nav-link ${currentPage === 'medicines' ? 'active' : ''}`} href="#" onClick={(e) => { e.preventDefault(); onNavigate('medicines'); }}>
//         <i className="fas fa-pills me-1"></i>Medicines
//       </a>
//     </li>
//     <li className="nav-item">
//       <a className={`nav-link ${currentPage === 'quick-actions' ? 'active' : ''}`} href="#" onClick={(e) => { e.preventDefault(); onNavigate('quick-actions'); }}>
//         <i className="fas fa-bolt me-1"></i>Quick Actions
//       </a>
//     </li>
//   </>
// )}
//             <li className="nav-item dropdown">
//               <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
//                 <i className="fas fa-user-circle me-1"></i>{user.name}
//               </a>
//               <ul className="dropdown-menu dropdown-menu-end">
//                 <li><a className="dropdown-item" href="#"><i className="fas fa-user me-2"></i>Profile</a></li>
//                 <li><hr className="dropdown-divider" /></li>
//                 <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); onLogout(); }}>
//                   <i className="fas fa-sign-out-alt me-2"></i>Logout
//                 </a></li>
//               </ul>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import React from 'react';

function Navbar({ user, onNavigate, onLogout, currentPage }) {
  // Handle dashboard navigation based on user type
  const handleDashboardClick = (e) => {
    e.preventDefault();
    if (user.user_type === 'doctor') {
      onNavigate('doctor-dashboard');
    } else {
      onNavigate('patient-dashboard');
    }
  };

  // Get display name from user object
  const getDisplayName = () => {
    return user.name || user.first_name || user.username;
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <div className="container-fluid px-4">
        <a className="navbar-brand" href="#" onClick={handleDashboardClick}>
          <i className="fas fa-heartbeat me-2" style={{ color: 'var(--primary-color)' }}></i>
          <strong>MediConnect</strong>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Dashboard Link - Dynamic based on user type */}
            <li className="nav-item">
              <a 
                className={`nav-link ${currentPage.includes('dashboard') ? 'active' : ''}`} 
                href="#" 
                onClick={handleDashboardClick}
              >
                <i className="fas fa-home me-1"></i>
                Dashboard
                <span className="badge bg-secondary ms-1">
                  {user.user_type === 'doctor' ? 'Doctor' : 'Patient'}
                </span>
              </a>
            </li>

            {/* Patient-specific menu items */}
            {user.user_type === 'patient' && (
              <>
                <li className="nav-item">
                  <a 
                    className={`nav-link ${currentPage === 'doctors' ? 'active' : ''}`} 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); onNavigate('doctors'); }}
                  >
                    <i className="fas fa-user-md me-1"></i>Doctors
                  </a>
                </li>
                <li className="nav-item">
                  <a 
                    className={`nav-link ${currentPage === 'medicines' ? 'active' : ''}`} 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); onNavigate('medicines'); }}
                  >
                    <i className="fas fa-pills me-1"></i>Medicines
                  </a>
                </li>
                <li className="nav-item">
                  <a 
                    className={`nav-link ${currentPage === 'quick-actions' ? 'active' : ''}`} 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); onNavigate('quick-actions'); }}
                  >
                    <i className="fas fa-bolt me-1"></i>Quick Actions
                  </a>
                </li>
              </>
            )}

            {/* Doctor-specific menu items */}
            {user.user_type === 'doctor' && (
              <>
                <li className="nav-item">
                  <a 
                    className={`nav-link ${currentPage === 'appointments' ? 'active' : ''}`} 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); onNavigate('appointments'); }}
                  >
                    <i className="fas fa-calendar-check me-1"></i>Appointments
                  </a>
                </li>
                <li className="nav-item">
                  <a 
                    className={`nav-link ${currentPage === 'patients' ? 'active' : ''}`} 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); onNavigate('patients'); }}
                  >
                    <i className="fas fa-users me-1"></i>Patients
                  </a>
                </li>
              </>
            )}

            {/* User Dropdown */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                <i className="fas fa-user-circle me-1"></i>
                {getDisplayName()}
                <span className="badge bg-primary ms-1">{user.user_type}</span>
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <a className="dropdown-item" href="#">
                    <i className="fas fa-user me-2"></i>Profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <i className="fas fa-cog me-2"></i>Settings
                  </a>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <a 
                    className="dropdown-item" 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); onLogout(); }}
                  >
                    <i className="fas fa-sign-out-alt me-2"></i>Logout
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;