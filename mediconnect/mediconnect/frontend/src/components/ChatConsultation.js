// import React, { useState, useEffect, useRef } from 'react';

// function ChatConsultation({ doctor, onClose }) {
//   const [messages, setMessages] = useState([
//     { id: 1, sender: 'doctor', text: `Hello! I'm ${doctor.name}. How can I help you today?`, timestamp: new Date() }
//   ]);
//   const [inputMessage, setInputMessage] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const chatEndRef = useRef(null);

//   const scrollToBottom = () => {
//     chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleSendMessage = () => {
//     if (!inputMessage.trim()) return;

//     const newMessage = {
//       id: messages.length + 1,
//       sender: 'patient',
//       text: inputMessage,
//       timestamp: new Date()
//     };

//     setMessages([...messages, newMessage]);
//     setInputMessage('');
//     setIsTyping(true);

//     // Simulate doctor response
//     setTimeout(() => {
//       const responses = [
//         "I understand. Can you tell me more about your symptoms?",
//         "Based on what you've told me, I'd recommend getting some rest and staying hydrated.",
//         "Let me prescribe some medication for you.",
//         "Have you experienced these symptoms before?",
//         "I'm prescribing Paracetamol for fever. Take it twice daily after meals."
//       ];
      
//       const response = {
//         id: messages.length + 2,
//         sender: 'doctor',
//         text: responses[Math.floor(Math.random() * responses.length)],
//         timestamp: new Date()
//       };
      
//       setMessages(prev => [...prev, response]);
//       setIsTyping(false);

//       // Randomly send a prescription
//       if (Math.random() > 0.7) {
//         setTimeout(() => {
//           const prescription = {
//             id: messages.length + 3,
//             sender: 'doctor',
//             isPrescription: true,
//             medicines: [
//               { name: 'Paracetamol', dosage: '500mg', frequency: 'Twice daily', duration: '3 days' },
//               { name: 'Cetirizine', dosage: '10mg', frequency: 'Once daily', duration: '5 days' }
//             ],
//             timestamp: new Date()
//           };
//           setMessages(prev => [...prev, prescription]);
//         }, 1500);
//       }
//     }, 2000);
//   };

//   return (
//     <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#f0f2f5' }}>
//       <div className="container py-4">
//         <div className="card fade-in" style={{ maxWidth: '900px', margin: '0 auto' }}>
//           <div className="card-header bg-white" style={{ borderBottom: '2px solid #f0f0f0', padding: '20px' }}>
//             <div className="d-flex justify-content-between align-items-center">
//               <div className="d-flex align-items-center">
//                 <div className="doctor-avatar" style={{ width: '50px', height: '50px', fontSize: '20px', marginRight: '12px', marginBottom: '0' }}>
//                   <i className="fas fa-user-md"></i>
//                 </div>
//                 <div>
//                   <h5 className="mb-0">{doctor.name}</h5>
//                   <small className="text-success"><i className="fas fa-circle me-1" style={{ fontSize: '8px' }}></i>Online</small>
//                 </div>
//               </div>
//               <button className="btn btn-outline-secondary" onClick={onClose}>
//                 <i className="fas fa-times"></i>
//               </button>
//             </div>
//           </div>
//           <div className="card-body" style={{ padding: '0' }}>
//             <div className="chat-container">
//               {messages.map((message) => (
//                 <div key={message.id} className={`message message-${message.sender}`}>
//                   {message.isPrescription ? (
//                     <div className="card" style={{ maxWidth: '100%', background: '#e0f7fa' }}>
//                       <div className="card-body">
//                         <h6><i className="fas fa-prescription me-2"></i>Prescription</h6>
//                         {message.medicines.map((med, idx) => (
//                           <div key={idx} className="mb-2">
//                             <strong>{med.name}</strong> - {med.dosage}<br/>
//                             <small className="text-muted">{med.frequency} for {med.duration}</small>
//                           </div>
//                         ))}
//                         <button className="btn btn-sm btn-primary mt-2">
//                           <i className="fas fa-download me-1"></i>Download
//                         </button>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="message-bubble">
//                       <p className="mb-1">{message.text}</p>
//                       <small style={{ opacity: 0.7, fontSize: '11px' }}>
//                         {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                       </small>
//                     </div>
//                   )}
//                 </div>
//               ))}
//               {isTyping && (
//                 <div className="message message-doctor fade-in">
//                   <div className="message-bubble">
//                     <div className="pulse">Doctor is typing...</div>
//                   </div>
//                 </div>
//               )}
//               <div ref={chatEndRef} />
//             </div>
//           </div>
//           <div className="card-footer bg-white" style={{ borderTop: '2px solid #f0f0f0', padding: '20px' }}>
//             <div className="input-group">
//               <input 
//                 type="text" 
//                 className="form-control" 
//                 placeholder="Type your message..."
//                 value={inputMessage}
//                 onChange={(e) => setInputMessage(e.target.value)}
//                 onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//               />
//               <button className="btn btn-primary" onClick={handleSendMessage}>
//                 <i className="fas fa-paper-plane"></i>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatConsultation;
import React, { useState, useEffect, useRef } from 'react';
import { chatMessagesAPI } from '../services/api';

// function ChatConsultation({ doctor, patient, onClose }) {
//   const [messages, setMessages] = useState([
//     { 
//       id: 1, 
//       sender: 'doctor', 
//       text: `Hello! I'm ${doctor.name}. How can I help you today?`, 
//       timestamp: new Date() 
//     }
//   ]);
//   const [inputMessage, setInputMessage] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const chatEndRef = useRef(null);

function ChatConsultation({ doctor, patient, onClose }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'patient',
      text: inputMessage,
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate doctor response
    setTimeout(() => {
      const responses = [
        "I understand. Can you tell me more about your symptoms?",
        "Based on what you've told me, I'd recommend getting some rest and staying hydrated.",
        "Let me prescribe some medication for you.",
        "Have you experienced these symptoms before?",
        "I'm prescribing Paracetamol for fever. Take it twice daily after meals.",
        "How long have you been experiencing these symptoms?",
        "Any other symptoms like fever or cough?",
        "Let me check your medical history for similar issues."
      ];
      
      const response = {
        id: messages.length + 2,
        sender: 'doctor',
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, response]);
      setIsTyping(false);

      // Randomly send a prescription after some conversations
      if (Math.random() > 0.7 && messages.length > 3) {
        setTimeout(() => {
          const prescription = {
            id: messages.length + 3,
            sender: 'doctor',
            isPrescription: true,
            medicines: [
              { name: 'Paracetamol', dosage: '500mg', frequency: 'Twice daily', duration: '3 days' },
              { name: 'Cetirizine', dosage: '10mg', frequency: 'Once daily', duration: '5 days' }
            ],
            instructions: "Take after meals. Avoid driving after taking medication.",
            timestamp: new Date()
          };
          setMessages(prev => [...prev, prescription]);
        }, 1500);
      }
    }, 2000);
  };

  const downloadPrescription = (medicines) => {
    const prescriptionText = `PRESCRIPTION\n\nPatient: ${patient?.name || 'Patient'}\nDoctor: ${doctor.name}\nDate: ${new Date().toLocaleDateString()}\n\nMedications:\n${medicines.map(med => `- ${med.name} ${med.dosage}: ${med.frequency} for ${med.duration}`).join('\n')}\n\nInstructions: Take as directed. Complete the full course.`;
    
    const blob = new Blob([prescriptionText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prescription-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#f0f2f5' }}>
      <div className="container py-4">
        <div className="card fade-in" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="card-header bg-white" style={{ borderBottom: '2px solid #f0f0f0', padding: '20px' }}>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <div className="doctor-avatar" style={{ width: '50px', height: '50px', fontSize: '20px', marginRight: '12px', marginBottom: '0' }}>
                  <i className="fas fa-user-md"></i>
                </div>
                <div>
                  <h5 className="mb-0">{doctor.name}</h5>
                  <p className="text-muted mb-0 small">{doctor.specialty}</p>
                  <small className="text-success">
                    <i className="fas fa-circle me-1" style={{ fontSize: '8px' }}></i>Online
                  </small>
                </div>
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-outline-success btn-sm">
                  <i className="fas fa-video me-1"></i>Video Call
                </button>
                <button className="btn btn-outline-secondary" onClick={onClose}>
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="card-body" style={{ padding: '0' }}>
            <div className="chat-container">
              {messages.map((message) => (
                <div key={message.id} className={`message message-${message.sender}`}>
                  {message.isPrescription ? (
                    <div className="card" style={{ maxWidth: '100%', background: '#e0f7fa', border: '2px solid #4f46e5' }}>
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h6 className="mb-0">
                            <i className="fas fa-prescription me-2" style={{ color: '#4f46e5' }}></i>
                            Prescription from Dr. {doctor.name}
                          </h6>
                          <small className="text-muted">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </small>
                        </div>
                        {message.medicines.map((med, idx) => (
                          <div key={idx} className="mb-2 p-2" style={{ background: 'white', borderRadius: '8px' }}>
                            <strong>{med.name}</strong> - {med.dosage}<br/>
                            <small className="text-muted">{med.frequency} for {med.duration}</small>
                          </div>
                        ))}
                        {message.instructions && (
                          <div className="mt-2 p-2" style={{ background: '#fff3cd', borderRadius: '8px' }}>
                            <small>
                              <strong>Instructions:</strong> {message.instructions}
                            </small>
                          </div>
                        )}
                        <button 
                          className="btn btn-sm btn-primary mt-2"
                          onClick={() => downloadPrescription(message.medicines)}
                        >
                          <i className="fas fa-download me-1"></i>Download Prescription
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="message-bubble">
                      <p className="mb-1">{message.text}</p>
                      <small style={{ opacity: 0.7, fontSize: '11px' }}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </small>
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="message message-doctor fade-in">
                  <div className="message-bubble">
                    <div className="pulse">
                      <i className="fas fa-ellipsis-h me-2"></i>
                      Dr. {doctor.name} is typing...
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          </div>
          <div className="card-footer bg-white" style={{ borderTop: '2px solid #f0f0f0', padding: '20px' }}>
            <div className="input-group">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button className="btn btn-primary" onClick={handleSendMessage}>
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatConsultation;