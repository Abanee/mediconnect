// import React, { useState, useEffect } from 'react';

// function VideoConsultation({ doctor, user, onClose }) {
//   const [callDuration, setCallDuration] = useState(0);
//   const [isMuted, setIsMuted] = useState(false);
//   const [isVideoOff, setIsVideoOff] = useState(false);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCallDuration(prev => prev + 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   return (
//     <div className="video-consultation-container">
//       <div className="video-header">
//         <div className="call-info">
//           <h4>Video Consultation with {doctor.name}</h4>
//           <div className="status-badge">
//             <i className="fas fa-circle me-1"></i>
//             {formatTime(callDuration)}
//           </div>
//         </div>
//       </div>

//       <div className="video-grid">
//         <div className="remote-video-container">
//           <div className="remote-video">
//             <div style={{
//               width: '100%',
//               height: '100%',
//               background: '#333',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               color: 'white',
//               fontSize: '24px'
//             }}>
//               <div className="text-center">
//                 <div className="doctor-avatar" style={{ margin: '0 auto 20px', width: '100px', height: '100px' }}>
//                   <i className="fas fa-user-md"></i>
//                 </div>
//                 <p>{doctor.name}</p>
//                 <p style={{ fontSize: '14px', opacity: 0.8 }}>{doctor.specialty}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="local-video-container">
//           <div style={{
//             width: '100%',
//             height: '100%',
//             background: '#555',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             color: 'white'
//           }}>
//             <div className="text-center">
//               <i className="fas fa-user" style={{ fontSize: '32px', marginBottom: '8px' }}></i>
//               <p style={{ fontSize: '12px' }}>You</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="video-controls">
//         <button 
//           className={`control-btn ${isMuted ? 'active' : ''}`}
//           onClick={() => setIsMuted(!isMuted)}
//         >
//           <i className={`fas fa-microphone${isMuted ? '-slash' : ''}`}></i>
//         </button>
        
//         <button 
//           className={`control-btn ${isVideoOff ? 'active' : ''}`}
//           onClick={() => setIsVideoOff(!isVideoOff)}
//         >
//           <i className={`fas fa-video${isVideoOff ? '-slash' : ''}`}></i>
//         </button>
        
//         <button className="control-btn end-call" onClick={onClose}>
//           <i className="fas fa-phone-slash"></i>
//         </button>
//       </div>
//     </div>
//   );
// }

// export default VideoConsultation;
import React, { useState, useEffect } from 'react';

function VideoConsultation({ doctor, user, onClose }) {
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePrescribe = () => {
    setShowPrescriptionModal(true);
  };

  const handleEndCall = () => {
    if (window.confirm('Are you sure you want to end the call?')) {
      onClose();
    }
  };

  return (
    <div className="video-consultation-container">
      <div className="video-header">
        <div className="call-info">
          <h4>Video Consultation with {doctor.name}</h4>
          <div className="status-badge">
            <i className="fas fa-circle me-1"></i>
            {formatTime(callDuration)}
          </div>
        </div>
        <div className="call-actions">
          <button className="btn btn-success btn-sm me-2" onClick={handlePrescribe}>
            <i className="fas fa-prescription me-1"></i>Prescribe
          </button>
          <button className="btn btn-info btn-sm me-2">
            <i className="fas fa-share-alt me-1"></i>Share Screen
          </button>
        </div>
      </div>

      <div className="video-grid">
        <div className="remote-video-container">
          <div className="remote-video">
            <div style={{
              width: '100%',
              height: '100%',
              background: '#333',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '24px'
            }}>
              <div className="text-center">
                <div className="doctor-avatar" style={{ margin: '0 auto 20px', width: '100px', height: '100px' }}>
                  <i className="fas fa-user-md"></i>
                </div>
                <p>{doctor.name}</p>
                <p style={{ fontSize: '14px', opacity: 0.8 }}>{doctor.specialty}</p>
                <p style={{ fontSize: '12px', opacity: 0.6 }}>Video feed would appear here</p>
              </div>
            </div>
          </div>
        </div>

        <div className="local-video-container">
          <div style={{
            width: '100%',
            height: '100%',
            background: '#555',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}>
            <div className="text-center">
              <i className="fas fa-user" style={{ fontSize: '32px', marginBottom: '8px' }}></i>
              <p style={{ fontSize: '12px' }}>You</p>
              <p style={{ fontSize: '10px', opacity: 0.7 }}>Your video feed</p>
            </div>
          </div>
        </div>
      </div>

      <div className="video-controls">
        <button 
          className={`control-btn ${isMuted ? 'active' : ''}`}
          onClick={() => setIsMuted(!isMuted)}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          <i className={`fas fa-microphone${isMuted ? '-slash' : ''}`}></i>
        </button>
        
        <button 
          className={`control-btn ${isVideoOff ? 'active' : ''}`}
          onClick={() => setIsVideoOff(!isVideoOff)}
          title={isVideoOff ? 'Turn on video' : 'Turn off video'}
        >
          <i className={`fas fa-video${isVideoOff ? '-slash' : ''}`}></i>
        </button>
        
        <button 
          className={`control-btn ${isRecording ? 'active' : ''}`}
          onClick={() => setIsRecording(!isRecording)}
          title={isRecording ? 'Stop recording' : 'Start recording'}
        >
          <i className={`fas fa-record-vinyl${isRecording ? ' pulse' : ''}`}></i>
        </button>
        
        <button className="control-btn" title="Share screen">
          <i className="fas fa-desktop"></i>
        </button>
        
        <button className="control-btn end-call" onClick={handleEndCall} title="End call">
          <i className="fas fa-phone-slash"></i>
        </button>
      </div>

      {/* Prescription Modal */}
      {showPrescriptionModal && (
        <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create Prescription</h5>
                <button type="button" className="btn-close" onClick={() => setShowPrescriptionModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Prescription functionality would be implemented here with medicine selection, dosage, etc.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowPrescriptionModal(false)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary">
                  Send Prescription
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoConsultation;