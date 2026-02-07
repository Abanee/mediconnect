// import React, { useState } from 'react';

// function Register({ onNavigate }) {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     userType: 'patient'
//   });
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       alert('Registration successful! Please login.');
//       onNavigate('login');
//     }, 1500);
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-card slide-in-right">
//         <div className="text-center mb-4">
//           <i className="fas fa-user-plus" style={{ fontSize: '48px', color: 'var(--primary-color)' }}></i>
//           <h2 className="mt-3">Create Account</h2>
//           <p className="text-muted">Join MediConnect today</p>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label className="form-label">User Type</label>
//             <select 
//               className="form-select"
//               value={formData.userType}
//               onChange={(e) => setFormData({...formData, userType: e.target.value})}
//             >
//               <option value="patient">Patient</option>
//               <option value="doctor">Doctor</option>
//             </select>
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Full Name</label>
//             <input 
//               type="text" 
//               className="form-control" 
//               placeholder="Enter your name"
//               value={formData.name}
//               onChange={(e) => setFormData({...formData, name: e.target.value})}
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Email Address</label>
//             <input 
//               type="email" 
//               className="form-control" 
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={(e) => setFormData({...formData, email: e.target.value})}
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Password</label>
//             <input 
//               type="password" 
//               className="form-control" 
//               placeholder="Create a password"
//               value={formData.password}
//               onChange={(e) => setFormData({...formData, password: e.target.value})}
//               required
//             />
//           </div>
//           <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading}>
//             {loading ? (
//               <><span className="spinner-border spinner-border-sm me-2"></span>Creating Account...</>
//             ) : (
//               <><i className="fas fa-user-plus me-2"></i>Register</>
//             )}
//           </button>
//         </form>
//         <div className="text-center">
//           <p className="text-muted">Already have an account? 
//             <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('login'); }} className="ms-1" style={{ color: 'var(--primary-color)' }}>Login</a>
//           </p>
//           <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('landing'); }} className="text-muted">
//             <i className="fas fa-arrow-left me-1"></i>Back to Home
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Register;



import React, { useState } from 'react';

function Register({ onNavigate, onRegister, loading }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    first_name: '',
    last_name: '',
    userType: 'patient',
    phone: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.password2) {
      alert("Passwords don't match");
      return;
    }
    onRegister(formData);
  };

  return (
    <div className="auth-container">
      <div className="auth-card slide-in-right">
        <div className="text-center mb-4">
          <i className="fas fa-user-plus" style={{ fontSize: '48px', color: 'var(--primary-color)' }}></i>
          <h2 className="mt-3">Create Account</h2>
          <p className="text-muted">Join MediConnect today</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">User Type</label>
            <select 
              className="form-select"
              value={formData.userType}
              onChange={(e) => setFormData({...formData, userType: e.target.value})}
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Choose a username"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              className="form-control" 
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Enter your first name"
              value={formData.first_name}
              onChange={(e) => setFormData({...formData, first_name: e.target.value})}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Enter your last name"
              value={formData.last_name}
              onChange={(e) => setFormData({...formData, last_name: e.target.value})}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="Confirm your password"
              value={formData.password2}
              onChange={(e) => setFormData({...formData, password2: e.target.value})}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading}>
            {loading ? (
              <><span className="spinner-border spinner-border-sm me-2"></span>Creating Account...</>
            ) : (
              <><i className="fas fa-user-plus me-2"></i>Register</>
            )}
          </button>
        </form>
        <div className="text-center">
          <p className="text-muted">Already have an account? 
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('login'); }} className="ms-1" style={{ color: 'var(--primary-color)' }}>Login</a>
          </p>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('landing'); }} className="text-muted">
            <i className="fas fa-arrow-left me-1"></i>Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}

export default Register;