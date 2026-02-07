// import React, { useState } from 'react';

// function OrderCheckout({ cart, user, onNavigate }) {
//   const [formData, setFormData] = useState({
//     name: user.name,
//     address: '',
//     city: '',
//     pincode: '',
//     paymentMethod: 'card'
//   });

//   const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//   const deliveryCharge = totalAmount > 500 ? 0 : 40;
//   const finalTotal = totalAmount + deliveryCharge;

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert('Order placed successfully!');
//     onNavigate('dashboard');
//   };

//   return (
//     <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#f0f2f5' }}>
//       <div className="container py-4">
//         <div className="checkout-container">
//           <h1 className="mb-4">Checkout</h1>
//           <div className="checkout-content">
//             <div className="checkout-form">
//               <h3>Delivery Details</h3>
//               <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                   <label>Full Name</label>
//                   <input 
//                     type="text" 
//                     value={formData.name}
//                     onChange={(e) => setFormData({...formData, name: e.target.value})}
//                     required 
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Delivery Address</label>
//                   <textarea 
//                     rows="3"
//                     value={formData.address}
//                     onChange={(e) => setFormData({...formData, address: e.target.value})}
//                     required
//                   ></textarea>
//                 </div>
//                 <div className="form-row">
//                   <div className="form-group">
//                     <label>City</label>
//                     <input 
//                       type="text"
//                       value={formData.city}
//                       onChange={(e) => setFormData({...formData, city: e.target.value})}
//                       required
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>Pincode</label>
//                     <input 
//                       type="text"
//                       value={formData.pincode}
//                       onChange={(e) => setFormData({...formData, pincode: e.target.value})}
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div className="form-group">
//                   <label>Payment Method</label>
//                   <select 
//                     value={formData.paymentMethod}
//                     onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
//                   >
//                     <option value="card">Credit/Debit Card</option>
//                     <option value="upi">UPI</option>
//                     <option value="cod">Cash on Delivery</option>
//                   </select>
//                 </div>
//                 <button type="submit" className="btn-place-order">
//                   Place Order - ₹{finalTotal}
//                 </button>
//               </form>
//             </div>

//             <div className="order-summary">
//               <h3>Order Summary</h3>
//               {cart.map(item => (
//                 <div key={item.id} className="summary-item">
//                   <span>{item.name} × {item.quantity}</span>
//                   <span>₹{item.price * item.quantity}</span>
//                 </div>
//               ))}
//               <div className="summary-totals">
//                 <div className="summary-row">
//                   <span>Subtotal</span>
//                   <span>₹{totalAmount}</span>
//                 </div>
//                 <div className="summary-row">
//                   <span>Delivery</span>
//                   <span>₹{deliveryCharge}</span>
//                 </div>
//                 <div className="summary-row total">
//                   <strong>Total</strong>
//                   <strong>₹{finalTotal}</strong>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default OrderCheckout;

import React, { useState } from 'react';
import { ordersAPI } from '../services/api';

function OrderCheckout({ cart, user, onNavigate }) {
  const [formData, setFormData] = useState({
    name: user.name,
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'card'
  });
  const [loading, setLoading] = useState(false);

  const totalAmount = cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
  const deliveryCharge = totalAmount > 500 ? 0 : 40;
  const finalTotal = totalAmount + deliveryCharge;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        items: cart.map(item => ({
          medicine: item.id,
          quantity: item.quantity,
          price: parseFloat(item.price)
        })),
        shipping_address: `${formData.address}, ${formData.city}, ${formData.pincode}`,
        payment_method: formData.paymentMethod,
        total_amount: finalTotal
      };

      await ordersAPI.create(orderData);
      alert('Order placed successfully!');
      onNavigate('dashboard');
    } catch (error) {
      console.error('Failed to place order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#f0f2f5' }}>
      <div className="container py-4">
        <div className="checkout-container">
          <h1 className="mb-4">Checkout</h1>
          <div className="checkout-content">
            <div className="checkout-form">
              <h3>Delivery Details</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Delivery Address</label>
                  <textarea 
                    rows="3"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    required
                  ></textarea>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>City</label>
                    <input 
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Pincode</label>
                    <input 
                      type="text"
                      value={formData.pincode}
                      onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Payment Method</label>
                  <select 
                    value={formData.paymentMethod}
                    onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                  >
                    <option value="card">Credit/Debit Card</option>
                    <option value="upi">UPI</option>
                    <option value="cod">Cash on Delivery</option>
                  </select>
                </div>
                <button type="submit" className="btn-place-order" disabled={loading}>
                  {loading ? 'Placing Order...' : `Place Order - ₹${finalTotal.toFixed(2)}`}
                </button>
              </form>
            </div>

            <div className="order-summary">
              <h3>Order Summary</h3>
              {cart.map(item => (
                <div key={item.id} className="summary-item">
                  <span>{item.name} × {item.quantity}</span>
                  <span>₹{(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="summary-totals">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{totalAmount.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery</span>
                  <span>₹{deliveryCharge.toFixed(2)}</span>
                </div>
                <div className="summary-row total">
                  <strong>Total</strong>
                  <strong>₹{finalTotal.toFixed(2)}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderCheckout;