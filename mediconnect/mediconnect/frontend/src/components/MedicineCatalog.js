


import React, { useState, useEffect } from 'react';
import { medicinesAPI } from '../services/api';

function MedicineCatalog({ onProceedToCheckout }) {
  const [medicines, setMedicines] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch medicines from API
  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await medicinesAPI.getAll();
      // Handle both array and paginated response formats
      const medicinesList = data.results || data;
      setMedicines(medicinesList);
    } catch (error) {
      console.error('Failed to fetch medicines:', error);
      setError('Failed to load medicines. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = () => {
    if (cart.length > 0) {
      onProceedToCheckout(cart);
    }
  };

  const filteredMedicines = medicines.filter(med => 
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (medicine) => {
    const existing = cart.find(item => item.id === medicine.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === medicine.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...medicine, quantity: 1 }]);
    }
  };

  const removeFromCart = (medicineId) => {
    setCart(cart.filter(item => item.id !== medicineId));
  };

  const updateQuantity = (medicineId, change) => {
    setCart(cart.map(item => {
      if (item.id === medicineId) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const totalAmount = cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);

  // Loading state
  if (loading) {
    return (
      <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div className="container py-4">
          <div className="text-center text-white">
            <div className="spinner-border text-light mb-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <h3>Loading Medicines...</h3>
            <p>Please wait while we fetch the latest inventory</p>
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
            <h3>Unable to Load Medicines</h3>
            <p className="mb-4">{error}</p>
            <button className="btn btn-light" onClick={fetchMedicines}>
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
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="text-white fade-in">
            <h1><i className="fas fa-pills me-2"></i>Medicine Catalog</h1>
            <p>Order your prescribed medicines</p>
          </div>
          <button className="btn btn-light position-relative" onClick={() => setShowCart(!showCart)}>
            <i className="fas fa-shopping-cart me-2"></i>Cart
            {cart.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cart.length}
              </span>
            )}
          </button>
        </div>

        {/* Search Bar */}
        <div className="card mb-4 slide-in-left">
          <div className="card-body">
            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-search"></i>
              </span>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Search medicines by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  className="btn btn-outline-secondary" 
                  onClick={() => setSearchTerm('')}
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Medicine Count */}
        <div className="text-white mb-3 fade-in">
          <p>
            Showing {filteredMedicines.length} of {medicines.length} medicines
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        <div className="row">
          <div className={showCart ? 'col-lg-8' : 'col-12'}>
            <div className="row">
              {filteredMedicines.map((medicine, index) => (
                <div key={medicine.id} className="col-md-6 col-lg-4 mb-4" style={{ animation: `fadeIn 0.6s ease-out ${index * 0.1}s both` }}>
                  <div className="card medicine-card h-100">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <h5 className="card-title mb-0">{medicine.name}</h5>
                        {medicine.in_stock ? (
                          <span className="badge bg-success">In Stock</span>
                        ) : (
                          <span className="badge bg-danger">Out of Stock</span>
                        )}
                      </div>
                      <p className="text-muted small mb-3">{medicine.description}</p>
                      
                      {medicine.manufacturer && (
                        <p className="small text-info mb-2">
                          <i className="fas fa-industry me-1"></i>
                          {medicine.manufacturer}
                        </p>
                      )}
                      
                      {medicine.requires_prescription && (
                        <p className="small text-warning mb-2">
                          <i className="fas fa-prescription me-1"></i>
                          Requires Prescription
                        </p>
                      )}

                      <div className="d-flex justify-content-between align-items-center">
                        <h4 className="mb-0" style={{ color: 'var(--primary-color)' }}>
                          ₹{parseFloat(medicine.price).toFixed(2)}
                        </h4>
                        <button 
                          className="btn btn-primary btn-sm"
                          onClick={() => addToCart(medicine)}
                          disabled={!medicine.in_stock}
                        >
                          <i className="fas fa-cart-plus me-1"></i>
                          {!medicine.in_stock ? 'Out of Stock' : 'Add'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No results state */}
            {filteredMedicines.length === 0 && !loading && (
              <div className="text-center text-white py-5 fade-in">
                <i className="fas fa-search" style={{ fontSize: '64px', opacity: 0.5 }}></i>
                <h3 className="mt-3">No medicines found</h3>
                <p>Try adjusting your search terms</p>
                <button className="btn btn-light mt-2" onClick={() => setSearchTerm('')}>
                  <i className="fas fa-times me-2"></i>Clear Search
                </button>
              </div>
            )}
          </div>
          
          {/* Shopping Cart Sidebar */}
          {showCart && (
            <div className="col-lg-4">
              <div className="card sticky-top fade-in" style={{ top: '100px' }}>
                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                  <h5 className="mb-0"><i className="fas fa-shopping-cart me-2"></i>Shopping Cart</h5>
                  <button 
                    className="btn btn-sm btn-light" 
                    onClick={() => setShowCart(false)}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                <div className="card-body" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                  {cart.length === 0 ? (
                    <div className="text-center text-muted py-4">
                      <i className="fas fa-shopping-cart" style={{ fontSize: '48px', opacity: 0.3 }}></i>
                      <p className="mt-2">Your cart is empty</p>
                      <small>Add some medicines to get started</small>
                    </div>
                  ) : (
                    <>
                      {cart.map((item) => (
                        <div key={item.id} className="d-flex justify-content-between align-items-center mb-3 pb-3" style={{ borderBottom: '1px solid #f0f0f0' }}>
                          <div className="flex-grow-1">
                            <h6 className="mb-1">{item.name}</h6>
                            <p className="mb-0 text-muted small">
                              ₹{parseFloat(item.price).toFixed(2)} × {item.quantity}
                            </p>
                            <p className="mb-0 text-success small">
                              ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}
                            </p>
                          </div>
                          <div className="d-flex align-items-center gap-2">
                            <button 
                              className="btn btn-sm btn-outline-secondary" 
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              <i className="fas fa-minus"></i>
                            </button>
                            <span className="fw-bold">{item.quantity}</span>
                            <button 
                              className="btn btn-sm btn-outline-secondary" 
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              <i className="fas fa-plus"></i>
                            </button>
                            <button 
                              className="btn btn-sm btn-outline-danger" 
                              onClick={() => removeFromCart(item.id)}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
                {cart.length > 0 && (
                  <div className="card-footer bg-white">
                    <div className="d-flex justify-content-between mb-3">
                      <strong>Subtotal:</strong>
                      <strong style={{ color: 'var(--primary-color)', fontSize: '1.2rem' }}>
                        ₹{totalAmount.toFixed(2)}
                      </strong>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <small>Delivery:</small>
                      <small>{totalAmount > 500 ? 'FREE' : '₹40.00'}</small>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <strong>Total:</strong>
                      <strong style={{ color: 'var(--primary-color)', fontSize: '1.2rem' }}>
                        ₹{(totalAmount > 500 ? totalAmount : totalAmount + 40).toFixed(2)}
                      </strong>
                    </div>
                    <button 
                      className="btn btn-primary w-100" 
                      onClick={handleCheckout}
                    >
                      <i className="fas fa-credit-card me-2"></i>Proceed to Checkout
                    </button>
                    <button 
                      className="btn btn-outline-secondary w-100 mt-2" 
                      onClick={() => setCart([])}
                    >
                      <i className="fas fa-trash me-2"></i>Clear Cart
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Refresh button */}
        {!loading && (
          <div className="text-center mt-4">
            <button 
              className="btn btn-outline-light btn-sm" 
              onClick={fetchMedicines}
              disabled={loading}
            >
              <i className="fas fa-sync-alt me-2"></i>
              {loading ? 'Refreshing...' : 'Refresh Inventory'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MedicineCatalog;