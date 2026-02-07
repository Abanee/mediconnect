

// // import React, { useState } from 'react';
// // import { appointmentsAPI } from '../services/api';

// // function AppointmentBookingModal({ doctor, onClose, onConfirm }) {
// //   const [selectedDate, setSelectedDate] = useState(null);
// //   const [selectedTime, setSelectedTime] = useState(null);
// //   const [symptoms, setSymptoms] = useState('');
// //   const [showConfirmation, setShowConfirmation] = useState(false);
// //   const [loading, setLoading] = useState(false);

// //   const dates = Array.from({ length: 7 }, (_, i) => {
// //     const date = new Date();
// //     date.setDate(date.getDate() + i);
// //     return date;
// //   });

// //   const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];

// //   const handleConfirm = async () => {
// //     if (!selectedDate || !selectedTime) return;

// //     setLoading(true);
// //     try {
// //       const appointmentData = {
// //         doctor: doctor.id,
// //         appointment_date: selectedDate,
// //         appointment_time: selectedTime,
// //         symptoms: symptoms,
// //         consultation_type: 'video' // or 'chat' based on your logic
// //       };

// //       await appointmentsAPI.create(appointmentData);
// //       setShowConfirmation(true);
// //       setTimeout(() => {
// //         onConfirm({ doctor, date: selectedDate, time: selectedTime, symptoms });
// //         onClose();
// //       }, 2000);
// //     } catch (error) {
// //       console.error('Failed to book appointment:', error);
// //       alert('Failed to book appointment. Please try again.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   if (showConfirmation) {
// //     return (
// //       <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
// //         <div className="modal-dialog modal-dialog-centered">
// //           <div className="modal-content" style={{ border: 'none', borderRadius: '16px' }}>
// //             <div className="modal-body text-center py-5 fade-in">
// //               <div className="mb-4">
// //                 <i className="fas fa-check-circle" style={{ fontSize: '80px', color: 'var(--success-color)' }}></i>
// //               </div>
// //               <h3>Appointment Confirmed!</h3>
// //               <p className="text-muted">Your appointment has been booked successfully</p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
// //       <div className="modal-dialog modal-lg modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
// //         <div className="modal-content fade-in" style={{ border: 'none', borderRadius: '16px' }}>
// //           <div className="modal-header" style={{ borderBottom: '2px solid #f0f0f0' }}>
// //             <h5 className="modal-title">
// //               <i className="fas fa-calendar-check me-2" style={{ color: 'var(--primary-color)' }}></i>
// //               Book Appointment with {doctor.name}
// //             </h5>
// //             <button type="button" className="btn-close" onClick={onClose}></button>
// //           </div>
// //           <div className="modal-body">
// //             <div className="mb-4">
// //               <h6 className="mb-3">Select Date</h6>
// //               <div className="d-flex gap-2 flex-wrap">
// //                 {dates.map((date, index) => (
// //                   <button
// //                     key={index}
// //                     className={`calendar-day ${selectedDate === date.toDateString() ? 'selected' : 'available'}`}
// //                     onClick={() => setSelectedDate(date.toDateString())}
// //                     style={{ flex: '1', minWidth: '80px' }}
// //                   >
// //                     <div style={{ fontSize: '12px' }}>{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
// //                     <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{date.getDate()}</div>
// //                     <div style={{ fontSize: '11px' }}>{date.toLocaleDateString('en-US', { month: 'short' })}</div>
// //                   </button>
// //                 ))}
// //               </div>
// //             </div>

// //             {selectedDate && (
// //               <div className="mb-4 fade-in">
// //                 <h6 className="mb-3">Select Time Slot</h6>
// //                 <div className="d-flex gap-2 flex-wrap">
// //                   {timeSlots.map((time, index) => (
// //                     <button
// //                       key={index}
// //                       className={`btn ${selectedTime === time ? 'btn-primary' : 'btn-outline-primary'}`}
// //                       onClick={() => setSelectedTime(time)}
// //                     >
// //                       <i className="fas fa-clock me-1"></i>{time}
// //                     </button>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}

// //             {selectedTime && (
// //               <div className="mb-3 fade-in">
// //                 <label className="form-label">Describe your symptoms (optional)</label>
// //                 <textarea 
// //                   className="form-control" 
// //                   rows="3" 
// //                   placeholder="Tell us about your health concerns..."
// //                   value={symptoms}
// //                   onChange={(e) => setSymptoms(e.target.value)}
// //                 ></textarea>
// //               </div>
// //             )}
// //           </div>
// //           <div className="modal-footer" style={{ borderTop: '2px solid #f0f0f0' }}>
// //             <button type="button" className="btn btn-secondary" onClick={onClose}>
// //               Cancel
// //             </button>
// //             <button 
// //               type="button" 
// //               className="btn btn-primary"
// //               onClick={handleConfirm}
// //               disabled={!selectedDate || !selectedTime || loading}
// //             >
// //               {loading ? (
// //                 <><span className="spinner-border spinner-border-sm me-2"></span>Booking...</>
// //               ) : (
// //                 <><i className="fas fa-check me-1"></i>Confirm Booking</>
// //               )}
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default AppointmentBookingModal;

// import React, { useState } from 'react';
// import { appointmentsAPI } from '../services/api';

// function AppointmentBookingModal({ doctor, onClose, onConfirm }) {
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedTime, setSelectedTime] = useState(null);
//   const [symptoms, setSymptoms] = useState('');
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const dates = Array.from({ length: 7 }, (_, i) => {
//     const date = new Date();
//     date.setDate(date.getDate() + i);
//     return date;
//   });

//   const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];

//   // Format date to YYYY-MM-DD for API
//   const formatDateForAPI = (dateString) => {
//     const date = new Date(dateString);
//     return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
//   };

//   const handleConfirm = async () => {
//     if (!selectedDate || !selectedTime) return;

//     setLoading(true);
//     try {
//       const formattedDate = formatDateForAPI(selectedDate);
      
//       const appointmentData = {
//         doctor: doctor.id,
//         appointment_date: formattedDate, // Use formatted date
//         appointment_time: selectedTime,
//         symptoms: symptoms,
//         consultation_type: 'video'
//       };

//       await appointmentsAPI.create(appointmentData);
//       setShowConfirmation(true);
//       setTimeout(() => {
//         onConfirm({ 
//           doctor, 
//           date: formattedDate, // Pass formatted date to parent
//           time: selectedTime, 
//           symptoms 
//         });
//         onClose();
//       }, 2000);
//     } catch (error) {
//       console.error('Failed to book appointment:', error);
//       alert('Failed to book appointment. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (showConfirmation) {
//     return (
//       <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
//         <div className="modal-dialog modal-dialog-centered">
//           <div className="modal-content" style={{ border: 'none', borderRadius: '16px' }}>
//             <div className="modal-body text-center py-5 fade-in">
//               <div className="mb-4">
//                 <i className="fas fa-check-circle" style={{ fontSize: '80px', color: 'var(--success-color)' }}></i>
//               </div>
//               <h3>Appointment Confirmed!</h3>
//               <p className="text-muted">Your appointment has been booked successfully</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
//       <div className="modal-dialog modal-lg modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
//         <div className="modal-content fade-in" style={{ border: 'none', borderRadius: '16px' }}>
//           <div className="modal-header" style={{ borderBottom: '2px solid #f0f0f0' }}>
//             <h5 className="modal-title">
//               <i className="fas fa-calendar-check me-2" style={{ color: 'var(--primary-color)' }}></i>
//               Book Appointment with {doctor.name}
//             </h5>
//             <button type="button" className="btn-close" onClick={onClose}></button>
//           </div>
//           <div className="modal-body">
//             <div className="mb-4">
//               <h6 className="mb-3">Select Date</h6>
//               <div className="d-flex gap-2 flex-wrap">
//                 {dates.map((date, index) => (
//                   <button
//                     key={index}
//                     className={`calendar-day ${selectedDate === date.toDateString() ? 'selected' : 'available'}`}
//                     onClick={() => setSelectedDate(date.toDateString())}
//                     style={{ flex: '1', minWidth: '80px' }}
//                   >
//                     <div style={{ fontSize: '12px' }}>{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
//                     <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{date.getDate()}</div>
//                     <div style={{ fontSize: '11px' }}>{date.toLocaleDateString('en-US', { month: 'short' })}</div>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {selectedDate && (
//               <div className="mb-4 fade-in">
//                 <h6 className="mb-3">Select Time Slot</h6>
//                 <div className="d-flex gap-2 flex-wrap">
//                   {timeSlots.map((time, index) => (
//                     <button
//                       key={index}
//                       className={`btn ${selectedTime === time ? 'btn-primary' : 'btn-outline-primary'}`}
//                       onClick={() => setSelectedTime(time)}
//                     >
//                       <i className="fas fa-clock me-1"></i>{time}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {selectedTime && (
//               <div className="mb-3 fade-in">
//                 <label className="form-label">Describe your symptoms (optional)</label>
//                 <textarea 
//                   className="form-control" 
//                   rows="3" 
//                   placeholder="Tell us about your health concerns..."
//                   value={symptoms}
//                   onChange={(e) => setSymptoms(e.target.value)}
//                 ></textarea>
//               </div>
//             )}
//           </div>
//           <div className="modal-footer" style={{ borderTop: '2px solid #f0f0f0' }}>
//             <button type="button" className="btn btn-secondary" onClick={onClose}>
//               Cancel
//             </button>
//             <button 
//               type="button" 
//               className="btn btn-primary"
//               onClick={handleConfirm}
//               disabled={!selectedDate || !selectedTime || loading}
//             >
//               {loading ? (
//                 <><span className="spinner-border spinner-border-sm me-2"></span>Booking...</>
//               ) : (
//                 <><i className="fas fa-check me-1"></i>Confirm Booking</>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AppointmentBookingModal;

// import React, { useState } from 'react';
// import { appointmentsAPI } from '../services/api';

// function AppointmentBookingModal({ doctor, onClose, onConfirm }) {
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedTime, setSelectedTime] = useState(null);
//   const [symptoms, setSymptoms] = useState('');
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const dates = Array.from({ length: 7 }, (_, i) => {
//     const date = new Date();
//     date.setDate(date.getDate() + i);
//     return date;
//   });

//   const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']; // 24-hour format for backend

//   // Format date to YYYY-MM-DD for API
//   const formatDateForAPI = (dateString) => {
//     const date = new Date(dateString);
//     return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
//   };

//   // Convert time to 24-hour format for backend
//   const formatTimeForAPI = (timeString) => {
//     // If time is already in 24-hour format, return as is
//     if (timeString.includes('AM') || timeString.includes('PM')) {
//       const [time, modifier] = timeString.split(' ');
//       let [hours, minutes] = time.split(':');
      
//       if (modifier === 'PM' && hours !== '12') {
//         hours = parseInt(hours, 10) + 12;
//       }
//       if (modifier === 'AM' && hours === '12') {
//         hours = '00';
//       }
      
//       return `${hours.toString().padStart(2, '0')}:${minutes || '00'}`;
//     }
//     return timeString; // Already in 24-hour format
//   };

//   const handleConfirm = async () => {
//     if (!selectedDate || !selectedTime) return;

//     setLoading(true);
//     setError('');
    
//     try {
//       const formattedDate = formatDateForAPI(selectedDate);
//       const formattedTime = formatTimeForAPI(selectedTime);
      
//       console.log('Sending appointment data:', {
//         doctor: doctor.id,
//         appointment_date: formattedDate,
//         appointment_time: formattedTime,
//         symptoms: symptoms,
//         consultation_type: 'video'
//       });

//       const appointmentData = {
//         doctor: doctor.id,
//         appointment_date: formattedDate,
//         appointment_time: formattedTime,
//         symptoms: symptoms || '', // Ensure it's never null
//         consultation_type: 'video'
//       };

//       const response = await appointmentsAPI.create(appointmentData);
//       console.log('Appointment created successfully:', response);
      
//       setShowConfirmation(true);
//       setTimeout(() => {
//         onConfirm({ 
//           doctor, 
//           date: formattedDate,
//           time: formattedTime, 
//           symptoms 
//         });
//         onClose();
//       }, 2000);
//     } catch (error) {
//       console.error('Failed to book appointment:', error);
//       console.error('Error response:', error.response?.data);
      
//       // Show specific error message from backend if available
//       const errorMessage = error.response?.data?.detail || 
//                           error.response?.data?.message || 
//                           'Failed to book appointment. Please try again.';
//       setError(errorMessage);
//       alert(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (showConfirmation) {
//     return (
//       <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
//         <div className="modal-dialog modal-dialog-centered">
//           <div className="modal-content" style={{ border: 'none', borderRadius: '16px' }}>
//             <div className="modal-body text-center py-5 fade-in">
//               <div className="mb-4">
//                 <i className="fas fa-check-circle" style={{ fontSize: '80px', color: 'var(--success-color)' }}></i>
//               </div>
//               <h3>Appointment Confirmed!</h3>
//               <p className="text-muted">Your appointment has been booked successfully</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
//       <div className="modal-dialog modal-lg modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
//         <div className="modal-content fade-in" style={{ border: 'none', borderRadius: '16px' }}>
//           <div className="modal-header" style={{ borderBottom: '2px solid #f0f0f0' }}>
//             <h5 className="modal-title">
//               <i className="fas fa-calendar-check me-2" style={{ color: 'var(--primary-color)' }}></i>
//               Book Appointment with {doctor.name}
//             </h5>
//             <button type="button" className="btn-close" onClick={onClose}></button>
//           </div>
//           <div className="modal-body">
//             {error && (
//               <div className="alert alert-danger fade-in">
//                 <i className="fas fa-exclamation-triangle me-2"></i>
//                 {error}
//               </div>
//             )}
            
//             <div className="mb-4">
//               <h6 className="mb-3">Select Date</h6>
//               <div className="d-flex gap-2 flex-wrap">
//                 {dates.map((date, index) => (
//                   <button
//                     key={index}
//                     className={`calendar-day ${selectedDate === date.toDateString() ? 'selected' : 'available'}`}
//                     onClick={() => setSelectedDate(date.toDateString())}
//                     style={{ flex: '1', minWidth: '80px' }}
//                   >
//                     <div style={{ fontSize: '12px' }}>{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
//                     <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{date.getDate()}</div>
//                     <div style={{ fontSize: '11px' }}>{date.toLocaleDateString('en-US', { month: 'short' })}</div>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {selectedDate && (
//               <div className="mb-4 fade-in">
//                 <h6 className="mb-3">Select Time Slot</h6>
//                 <div className="d-flex gap-2 flex-wrap">
//                   {timeSlots.map((time, index) => (
//                     <button
//                       key={index}
//                       className={`btn ${selectedTime === time ? 'btn-primary' : 'btn-outline-primary'}`}
//                       onClick={() => setSelectedTime(time)}
//                     >
//                       <i className="fas fa-clock me-1"></i>
//                       {/* Display in 12-hour format for user */}
//                       {formatTimeForDisplay(time)}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {selectedTime && (
//               <div className="mb-3 fade-in">
//                 <label className="form-label">Describe your symptoms (optional)</label>
//                 <textarea 
//                   className="form-control" 
//                   rows="3" 
//                   placeholder="Tell us about your health concerns..."
//                   value={symptoms}
//                   onChange={(e) => setSymptoms(e.target.value)}
//                 ></textarea>
//               </div>
//             )}
//           </div>
//           <div className="modal-footer" style={{ borderTop: '2px solid #f0f0f0' }}>
//             <button type="button" className="btn btn-secondary" onClick={onClose}>
//               Cancel
//             </button>
//             <button 
//               type="button" 
//               className="btn btn-primary"
//               onClick={handleConfirm}
//               disabled={!selectedDate || !selectedTime || loading}
//             >
//               {loading ? (
//                 <><span className="spinner-border spinner-border-sm me-2"></span>Booking...</>
//               ) : (
//                 <><i className="fas fa-check me-1"></i>Confirm Booking</>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Helper function to display time in 12-hour format
// function formatTimeForDisplay(timeString) {
//   if (!timeString.includes(':')) return timeString;
  
//   const [hours, minutes] = timeString.split(':');
//   const hour = parseInt(hours, 10);
//   const ampm = hour >= 12 ? 'PM' : 'AM';
//   const displayHour = hour % 12 || 12;
  
//   return `${displayHour}:${minutes || '00'} ${ampm}`;
// }

// export default AppointmentBookingModal;


import React, { useState } from 'react';
import { appointmentsAPI } from '../services/api';

function AppointmentBookingModal({ doctor, onClose, onConfirm }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [symptoms, setSymptoms] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']; // 24-hour format for backend

  // Format date to YYYY-MM-DD for API
  const formatDateForAPI = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
  };

  const handleConfirm = async () => {
    if (!selectedDate || !selectedTime) return;

    setLoading(true);
    setError('');
    
    try {
      const formattedDate = formatDateForAPI(selectedDate);
      
      console.log('Sending appointment data:', {
        doctor: doctor.id,
        appointment_date: formattedDate,
        appointment_time: selectedTime,
        symptoms: symptoms,
        consultation_type: 'video'
      });

      const appointmentData = {
        doctor: doctor.id,
        appointment_date: formattedDate,
        appointment_time: selectedTime, // Already in 24-hour format
        symptoms: symptoms || '', // Ensure it's never null
        consultation_type: 'video'
      };

      const response = await appointmentsAPI.create(appointmentData);
      console.log('Appointment created successfully:', response);
      
      setShowConfirmation(true);
      setTimeout(() => {
        onConfirm({ 
          doctor, 
          date: formattedDate,
          time: selectedTime, 
          symptoms 
        });
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Failed to book appointment:', error);
      console.error('Error response:', error.response?.data);
      
      // Show specific error message from backend if available
      let errorMessage = 'Failed to book appointment. Please try again.';
      
      if (error.data) {
        // Handle Django serializer errors
        if (typeof error.data === 'object') {
          const errorMessages = [];
          for (const [field, messages] of Object.entries(error.data)) {
            if (Array.isArray(messages)) {
              errorMessages.push(...messages);
            } else {
              errorMessages.push(messages);
            }
          }
          errorMessage = errorMessages.join(', ');
        } else if (error.data.detail) {
          errorMessage = error.data.detail;
        } else if (error.data.message) {
          errorMessage = error.data.message;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (showConfirmation) {
    return (
      <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{ border: 'none', borderRadius: '16px' }}>
            <div className="modal-body text-center py-5 fade-in">
              <div className="mb-4">
                <i className="fas fa-check-circle" style={{ fontSize: '80px', color: 'var(--success-color)' }}></i>
              </div>
              <h3>Appointment Confirmed!</h3>
              <p className="text-muted">Your appointment has been booked successfully</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div className="modal-dialog modal-lg modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content fade-in" style={{ border: 'none', borderRadius: '16px' }}>
          <div className="modal-header" style={{ borderBottom: '2px solid #f0f0f0' }}>
            <h5 className="modal-title">
              <i className="fas fa-calendar-check me-2" style={{ color: 'var(--primary-color)' }}></i>
              Book Appointment with {doctor.name}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {error && (
              <div className="alert alert-danger fade-in">
                <i className="fas fa-exclamation-triangle me-2"></i>
                {error}
              </div>
            )}
            
            <div className="mb-4">
              <h6 className="mb-3">Select Date</h6>
              <div className="d-flex gap-2 flex-wrap">
                {dates.map((date, index) => (
                  <button
                    key={index}
                    className={`btn ${selectedDate === date.toDateString() ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setSelectedDate(date.toDateString())}
                    style={{ flex: '1', minWidth: '80px', padding: '10px' }}
                  >
                    <div style={{ fontSize: '12px' }}>{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                    <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{date.getDate()}</div>
                    <div style={{ fontSize: '11px' }}>{date.toLocaleDateString('en-US', { month: 'short' })}</div>
                  </button>
                ))}
              </div>
            </div>

            {selectedDate && (
              <div className="mb-4 fade-in">
                <h6 className="mb-3">Select Time Slot</h6>
                <div className="d-flex gap-2 flex-wrap">
                  {timeSlots.map((time, index) => (
                    <button
                      key={index}
                      className={`btn ${selectedTime === time ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => setSelectedTime(time)}
                      style={{ minWidth: '100px' }}
                    >
                      <i className="fas fa-clock me-1"></i>
                      {formatTimeForDisplay(time)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedTime && (
              <div className="mb-3 fade-in">
                <label className="form-label">Describe your symptoms (optional)</label>
                <textarea 
                  className="form-control" 
                  rows="3" 
                  placeholder="Tell us about your health concerns..."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                ></textarea>
              </div>
            )}
          </div>
          <div className="modal-footer" style={{ borderTop: '2px solid #f0f0f0' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={handleConfirm}
              disabled={!selectedDate || !selectedTime || loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Booking...
                </>
              ) : (
                <>
                  <i className="fas fa-check me-1"></i>
                  Confirm Booking
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to display time in 12-hour format
function formatTimeForDisplay(timeString) {
  if (!timeString.includes(':')) return timeString;
  
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  
  return `${displayHour}:${minutes || '00'} ${ampm}`;
}

export default AppointmentBookingModal;