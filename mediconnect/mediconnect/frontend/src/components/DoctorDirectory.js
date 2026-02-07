// import React, { useState } from 'react';
// import { mockData } from '../data/mockData';

// function DoctorDirectory({ onBookAppointment, onStartChat, onStartVideoCall }) {
//   const [doctors] = useState(mockData.doctors);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterSpecialty, setFilterSpecialty] = useState('all');
//   const [filterAvailability, setFilterAvailability] = useState('all');

//   const specialties = ['all', ...new Set(mockData.doctors.map(d => d.specialty))];

//   const filteredDoctors = doctors.filter(doctor => {
//     const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
//                           doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesSpecialty = filterSpecialty === 'all' || doctor.specialty === filterSpecialty;
//     const matchesAvailability = filterAvailability === 'all' || 
//                                (filterAvailability === 'available' && doctor.available) ||
//                                (filterAvailability === 'unavailable' && !doctor.available);
//     return matchesSearch && matchesSpecialty && matchesAvailability;
//   });

//   return (
//     <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
//       <div className="container py-4">
//         <div className="text-center mb-4 text-white fade-in">
//           <h1><i className="fas fa-user-md me-2"></i>Find Your Doctor</h1>
//           <p>Browse our expert healthcare professionals</p>
//         </div>

//         {/* Filters */}
//         <div className="card mb-4 slide-in-left">
//           <div className="card-body">
//             <div className="row g-3">
//               <div className="col-md-4">
//                 <input 
//                   type="text" 
//                   className="form-control" 
//                   placeholder="Search doctors..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//               <div className="col-md-4">
//                 <select 
//                   className="form-select"
//                   value={filterSpecialty}
//                   onChange={(e) => setFilterSpecialty(e.target.value)}
//                 >
//                   {specialties.map(s => (
//                     <option key={s} value={s}>
//                       {s === 'all' ? 'All Specialties' : s}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="col-md-4">
//                 <select 
//                   className="form-select"
//                   value={filterAvailability}
//                   onChange={(e) => setFilterAvailability(e.target.value)}
//                 >
//                   <option value="all">All Doctors</option>
//                   <option value="available">Available Now</option>
//                   <option value="unavailable">Unavailable</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Doctor Cards */}
//         <div className="row">
//           {filteredDoctors.map((doctor, index) => (
//             <div key={doctor.id} className="col-md-6 col-lg-4 mb-4" style={{ animation: `fadeIn 0.6s ease-out ${index * 0.1}s both` }}>
//               <div className="card doctor-card h-100">
//                 <div className="card-body text-center">
//                   <div className="doctor-avatar">
//                     <i className="fas fa-user-md"></i>
//                   </div>
//                   <h5 className="card-title mb-2">{doctor.name}</h5>
//                   <p className="text-muted mb-2">
//                     <i className="fas fa-stethoscope me-1"></i>{doctor.specialty}
//                   </p>
//                   <div className="mb-3">
//                     {doctor.available ? (
//                       <span className="badge badge-available">
//                         <i className="fas fa-circle me-1"></i>Available
//                       </span>
//                     ) : (
//                       <span className="badge badge-unavailable">
//                         <i className="fas fa-circle me-1"></i>Unavailable
//                       </span>
//                     )}
//                   </div>
//                   <div className="d-flex justify-content-around mb-3">
//                     <div>
//                       <i className="fas fa-star text-warning"></i>
//                       <small className="ms-1">{doctor.rating}</small>
//                     </div>
//                     <div>
//                       <i className="fas fa-briefcase text-primary"></i>
//                       <small className="ms-1">{doctor.experience}</small>
//                     </div>
//                   </div>
//                   {/* <div className="d-grid gap-2">
//                     <button 
//                       className="btn btn-primary btn-sm"
//                       onClick={() => onBookAppointment(doctor)}
//                       disabled={!doctor.available}
//                     >
//                       <i className="fas fa-calendar-check me-1"></i>Book Appointment
//                     </button>
//                     <button 
//                       className="btn btn-outline-primary btn-sm"
//                       onClick={() => onStartChat(doctor)}
//                       disabled={!doctor.available}
//                     >
//                       <i className="fas fa-comments me-1"></i>Start Chat
//                     </button>
//                   </div> */}
//                   <div className="d-grid gap-2">
//     <button 
//       className="btn btn-primary btn-sm"
//       onClick={() => onBookAppointment(doctor)}
//       disabled={!doctor.available}
//     >
//       <i className="fas fa-calendar-check me-1"></i>Book Appointment
//     </button>
//     <button 
//       className="btn btn-outline-primary btn-sm"
//       onClick={() => onStartChat(doctor)}
//       disabled={!doctor.available}
//     >
//       <i className="fas fa-comments me-1"></i>Start Chat
//     </button>
//     <button 
//       className="btn btn-success btn-sm"
//       onClick={() => onStartVideoCall(doctor)}
//       disabled={!doctor.available}
//     >
//       <i className="fas fa-video me-1"></i>Video Call
//     </button>
//   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {filteredDoctors.length === 0 && (
//           <div className="text-center text-white py-5 fade-in">
//             <i className="fas fa-search" style={{ fontSize: '64px', opacity: 0.5 }}></i>
//             <h3 className="mt-3">No doctors found</h3>
//             <p>Try adjusting your search filters</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default DoctorDirectory;


// import React, { useState } from 'react';
// import { mockData } from '../data/mockData';
// import { doctorsAPI } from '../services/api';

// function DoctorDirectory({ onBookAppointment, onStartChat, onStartVideoCall }) {
//   const [doctors] = useState(mockData.doctors);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterSpecialty, setFilterSpecialty] = useState('all');
//   const [filterAvailability, setFilterAvailability] = useState('all');

//   const specialties = ['all', ...new Set(mockData.doctors.map(d => d.specialty))];

//   const filteredDoctors = doctors.filter(doctor => {
//     const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
//                           doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesSpecialty = filterSpecialty === 'all' || doctor.specialty === filterSpecialty;
//     const matchesAvailability = filterAvailability === 'all' || 
//                                (filterAvailability === 'available' && doctor.available) ||
//                                (filterAvailability === 'unavailable' && !doctor.available);
//     return matchesSearch && matchesSpecialty && matchesAvailability;
//   });

//   return (
//     <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
//       <div className="container py-4">
//         <div className="text-center mb-4 text-white fade-in">
//           <h1><i className="fas fa-user-md me-2"></i>Find Your Doctor</h1>
//           <p>Browse our expert healthcare professionals</p>
//         </div>

//         {/* Filters */}
//         <div className="card mb-4 slide-in-left">
//           <div className="card-body">
//             <div className="row g-3">
//               <div className="col-md-4">
//                 <input 
//                   type="text" 
//                   className="form-control" 
//                   placeholder="Search doctors..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//               <div className="col-md-4">
//                 <select 
//                   className="form-select"
//                   value={filterSpecialty}
//                   onChange={(e) => setFilterSpecialty(e.target.value)}
//                 >
//                   {specialties.map(s => (
//                     <option key={s} value={s}>
//                       {s === 'all' ? 'All Specialties' : s}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="col-md-4">
//                 <select 
//                   className="form-select"
//                   value={filterAvailability}
//                   onChange={(e) => setFilterAvailability(e.target.value)}
//                 >
//                   <option value="all">All Doctors</option>
//                   <option value="available">Available Now</option>
//                   <option value="unavailable">Unavailable</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Doctor Cards */}
//         <div className="row">
//           {filteredDoctors.map((doctor, index) => (
//             <div key={doctor.id} className="col-md-6 col-lg-4 mb-4" style={{ animation: `fadeIn 0.6s ease-out ${index * 0.1}s both` }}>
//               <div className="card doctor-card h-100">
//                 <div className="card-body text-center">
//                   <div className="doctor-avatar">
//                     <i className="fas fa-user-md"></i>
//                   </div>
//                   <h5 className="card-title mb-2">{doctor.name}</h5>
//                   <p className="text-muted mb-2">
//                     <i className="fas fa-stethoscope me-1"></i>{doctor.specialty}
//                   </p>
//                   <div className="mb-3">
//                     {doctor.available ? (
//                       <span className="badge badge-available">
//                         <i className="fas fa-circle me-1"></i>Available
//                       </span>
//                     ) : (
//                       <span className="badge badge-unavailable">
//                         <i className="fas fa-circle me-1"></i>Unavailable
//                       </span>
//                     )}
//                   </div>
//                   <div className="d-flex justify-content-around mb-3">
//                     <div>
//                       <i className="fas fa-star text-warning"></i>
//                       <small className="ms-1">{doctor.rating}</small>
//                     </div>
//                     <div>
//                       <i className="fas fa-briefcase text-primary"></i>
//                       <small className="ms-1">{doctor.experience}</small>
//                     </div>
//                   </div>
//                   <div className="d-grid gap-2">
//                     <button 
//                       className="btn btn-primary btn-sm"
//                       onClick={() => onBookAppointment(doctor)}
//                       disabled={!doctor.available}
//                     >
//                       <i className="fas fa-calendar-check me-1"></i>Book Appointment
//                     </button>
//                     <button 
//                       className="btn btn-outline-primary btn-sm"
//                       onClick={() => onStartChat(doctor)}
//                       disabled={!doctor.available}
//                     >
//                       <i className="fas fa-comments me-1"></i>Start Chat
//                     </button>
//                     <button 
//                       className="btn btn-success btn-sm"
//                       onClick={() => onStartVideoCall(doctor)}
//                       disabled={!doctor.available}
//                     >
//                       <i className="fas fa-video me-1"></i>Video Call
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {filteredDoctors.length === 0 && (
//           <div className="text-center text-white py-5 fade-in">
//             <i className="fas fa-search" style={{ fontSize: '64px', opacity: 0.5 }}></i>
//             <h3 className="mt-3">No doctors found</h3>
//             <p>Try adjusting your search filters</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default DoctorDirectory;



import React, { useState, useEffect } from 'react';
import { doctorsAPI } from '../services/api';

function DoctorDirectory({ onBookAppointment, onStartChat, onStartVideoCall }) {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('all');
  const [filterAvailability, setFilterAvailability] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch doctors from API
  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await doctorsAPI.getAll();
      // Handle both array and paginated response formats
      const doctorsList = data.results || data;
      setDoctors(doctorsList);
    } catch (error) {
      console.error('Failed to fetch doctors:', error);
      setError('Failed to load doctors. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Get unique specialties from doctors
  const specialties = ['all', ...new Set(doctors.map(d => d.specialty))];

  // Filter doctors based on search and filters
  const filteredDoctors = doctors.filter(doctor => {
    const doctorName = doctor.name || `${doctor.user?.first_name} ${doctor.user?.last_name}` || '';
    const doctorSpecialty = doctor.specialty || '';
    
    const matchesSearch = doctorName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doctorSpecialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = filterSpecialty === 'all' || doctor.specialty === filterSpecialty;
    const matchesAvailability = filterAvailability === 'all' || 
                               (filterAvailability === 'available' && doctor.available) ||
                               (filterAvailability === 'unavailable' && !doctor.available);
    return matchesSearch && matchesSpecialty && matchesAvailability;
  });

  // Format doctor name for display
  const getDoctorName = (doctor) => {
    return doctor.name || `${doctor.user?.first_name} ${doctor.user?.last_name}` || 'Doctor';
  };

  // Loading state
  if (loading) {
    return (
      <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div className="container py-4">
          <div className="text-center text-white">
            <div className="spinner-border text-light mb-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <h3>Loading Doctors...</h3>
            <p>Please wait while we fetch the latest information</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div className="container py-4">
          <div className="text-center text-white fade-in">
            <i className="fas fa-exclamation-triangle mb-3" style={{ fontSize: '64px', opacity: 0.7 }}></i>
            <h3>Unable to Load Doctors</h3>
            <p className="mb-4">{error}</p>
            <button className="btn btn-light" onClick={fetchDoctors}>
              <i className="fas fa-redo me-2"></i>Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div className="container py-4">
        <div className="text-center mb-4 text-white fade-in">
          <h1><i className="fas fa-user-md me-2"></i>Find Your Doctor</h1>
          <p>Browse our expert healthcare professionals</p>
        </div>

        {/* Filters */}
        <div className="card mb-4 slide-in-left">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-4">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Search doctors by name or specialty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <select 
                  className="form-select"
                  value={filterSpecialty}
                  onChange={(e) => setFilterSpecialty(e.target.value)}
                >
                  {specialties.map(s => (
                    <option key={s} value={s}>
                      {s === 'all' ? 'All Specialties' : s.charAt(0).toUpperCase() + s.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <select 
                  className="form-select"
                  value={filterAvailability}
                  onChange={(e) => setFilterAvailability(e.target.value)}
                >
                  <option value="all">All Doctors</option>
                  <option value="available">Available Now</option>
                  <option value="unavailable">Currently Unavailable</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Count */}
        <div className="text-white mb-3 fade-in">
          <p>
            Showing {filteredDoctors.length} of {doctors.length} doctors
            {searchTerm && ` for "${searchTerm}"`}
            {filterSpecialty !== 'all' && ` in ${filterSpecialty}`}
          </p>
        </div>

        {/* Doctor Cards */}
        <div className="row">
          {filteredDoctors.map((doctor, index) => (
            <div key={doctor.id} className="col-md-6 col-lg-4 mb-4" style={{ animation: `fadeIn 0.6s ease-out ${index * 0.1}s both` }}>
              <div className="card doctor-card h-100">
                <div className="card-body text-center">
                  <div className="doctor-avatar">
                    <i className="fas fa-user-md"></i>
                  </div>
                  <h5 className="card-title mb-2">{getDoctorName(doctor)}</h5>
                  <p className="text-muted mb-2">
                    <i className="fas fa-stethoscope me-1"></i>
                    {doctor.specialty ? doctor.specialty.charAt(0).toUpperCase() + doctor.specialty.slice(1) : 'General Physician'}
                  </p>
                  
                  <div className="mb-3">
                    {doctor.available ? (
                      <span className="badge badge-available">
                        <i className="fas fa-circle me-1"></i>Available
                      </span>
                    ) : (
                      <span className="badge badge-unavailable">
                        <i className="fas fa-circle me-1"></i>Unavailable
                      </span>
                    )}
                  </div>

                  <div className="d-flex justify-content-around mb-3">
                    <div>
                      <i className="fas fa-star text-warning"></i>
                      <small className="ms-1">{doctor.rating || '4.5'}</small>
                    </div>
                    <div>
                      <i className="fas fa-briefcase text-primary"></i>
                      <small className="ms-1">{doctor.experience || '5'}+ years</small>
                    </div>
                    <div>
                      <i className="fas fa-rupee-sign text-success"></i>
                      <small className="ms-1">{doctor.consultation_fee || '500'}</small>
                    </div>
                  </div>

                  <div className="d-grid gap-2">
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => onBookAppointment(doctor)}
                      disabled={!doctor.available}
                    >
                      <i className="fas fa-calendar-check me-1"></i>Book Appointment
                    </button>
                    <button 
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => onStartChat(doctor)}
                      disabled={!doctor.available}
                    >
                      <i className="fas fa-comments me-1"></i>Start Chat
                    </button>
                    <button 
                      className="btn btn-success btn-sm"
                      onClick={() => onStartVideoCall(doctor)}
                      disabled={!doctor.available}
                    >
                      <i className="fas fa-video me-1"></i>Video Call
                    </button>
                  </div>

                  {doctor.bio && (
                    <div className="mt-3">
                      <small className="text-muted">
                        <i>{doctor.bio.length > 100 ? doctor.bio.substring(0, 100) + '...' : doctor.bio}</i>
                      </small>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No results state */}
        {filteredDoctors.length === 0 && !loading && (
          <div className="text-center text-white py-5 fade-in">
            <i className="fas fa-search" style={{ fontSize: '64px', opacity: 0.5 }}></i>
            <h3 className="mt-3">No doctors found</h3>
            <p>Try adjusting your search filters or search terms</p>
            <button className="btn btn-light mt-2" onClick={() => {
              setSearchTerm('');
              setFilterSpecialty('all');
              setFilterAvailability('all');
            }}>
              <i className="fas fa-times me-2"></i>Clear Filters
            </button>
          </div>
        )}

        {/* Refresh button */}
        {!loading && (
          <div className="text-center mt-4">
            <button 
              className="btn btn-outline-light btn-sm" 
              onClick={fetchDoctors}
              disabled={loading}
            >
              <i className="fas fa-sync-alt me-2"></i>
              {loading ? 'Refreshing...' : 'Refresh List'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorDirectory;