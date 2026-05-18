
// import React, { useState } from 'react';
// import { createOrder } from '../utils/api';
// import { formatCurrency } from '../utils/helpers';
// import './CheckoutForm.css';

// export default function CheckoutForm({ cartItems = [], onOrderPlaced }) {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [errors, setErrors] = useState({});
//   const [apiError, setApiError] = useState('');
//   const [showPopup, setShowPopup] = useState(false); // ✅ popup state

//   const validate = () => {
//     const newErrors = {};
//     if (!name.trim()) newErrors.name = 'Name is required';
//     if (!email.trim()) newErrors.email = 'Email is required';
//     else if (!/\S+@\S+\.\S+/.test(email))
//       newErrors.email = 'Please enter a valid email address';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const totalAmount = cartItems.reduce(
//     (sum, item) =>
//       sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
//     0
//   );

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setApiError('');
//     if (!validate()) return;

//     try {
//       const orderItems = cartItems.map((item) => ({
//         quantity: item.quantity,
//         subtotal: item.price * item.quantity,
//         product: { id: item.id }
//       }));

//       const order = await createOrder({
//         customerName: name,
//         customerEmail: email,
//         orderItems,
//         totalAmount,
//       });

//       onOrderPlaced && onOrderPlaced(order);

//       setName('');
//       setEmail('');
//       setErrors({});
//       setApiError('');

//       setShowPopup(true); // ✅ show popup on success
//     } catch (err) {
//       const message =
//         (err && err.response && err.response.data && err.response.data.message) ||
//         err.message ||
//         'Failed to place order';
//       setApiError(message);
//     }
//   };



//   return (
//     <div className="checkout-container" data-testid="checkout-form-container">
//       <h2 className="checkout-title">Checkout</h2>
//       <form onSubmit={handleSubmit} className="checkout-form" data-testid="checkout-form">
//         <div className="form-group">
//           <label htmlFor="name" className="form-group label">Name</label>
//           <input
//             id="name"
//             className={`form-input ${errors.name ? 'error' : ''}`}
//             data-testid="name-input"
//             placeholder="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             aria-label="name"
//           />
//           {errors.name && <div className="error-message" data-testid="name-error">{errors.name}</div>}
//         </div>
//         <div className="form-group">
//           <label htmlFor="email" className="form-group label">Email</label>
//           <input
//             id="email"
//             className={`form-input ${errors.email ? 'error' : ''}`}
//             data-testid="email-input"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             aria-label="email"
//           />
//           {errors.email && <div className="error-message" data-testid="email-error">{errors.email}</div>}
//         </div>
//         <button
//           className="submit-button"
//           data-testid="submit-order-btn"
//           type="submit"
//           disabled={cartItems.length === 0}
//         >
//           Place Order
//         </button>
//         {apiError && <div className="api-error" data-testid="checkout-error">{apiError}</div>}
//       </form>

//       <div className="order-summary" data-testid="order-summary">
//         <h3>Order Summary</h3>
//         {cartItems.length === 0 ? (
//           <div className="no-items" data-testid="no-cart-items">No items in cart</div>
//         ) : (
//           cartItems.map((item) => (
//             <div key={item.id} className="summary-item" data-testid={`summary-item-${item.id}`}>
//               <span className="item-details">{item.name} x {item.quantity}</span>
//               <span className="item-total">{formatCurrency(item.price * item.quantity)}</span>
//             </div>
//           ))
//         )}
//         <div className="total-amount">
//           <strong data-testid="order-total">Total: {formatCurrency(totalAmount)}</strong>
//         </div>
//       </div>



//       {/* ✅ Popup Message */}
//       {showPopup && (
//         <div className="popup-overlay">
//           <div className="popup">
//             <h3>✅ Checkout Successful!</h3>
//             <p>Your order has been placed successfully.</p>
//             <button onClick={() => setShowPopup(false)}>OK</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// //above is the correct
// import React, { useState, useEffect } from 'react';
// import { createOrder, createUser } from '../utils/api';
// import { formatCurrency } from '../utils/helpers';
// import './CheckoutForm.css';

// export default function CheckoutForm({ cartItems = [], onOrderPlaced }) {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errors, setErrors] = useState({});
//   const [apiError, setApiError] = useState('');
//   const [showPopup, setShowPopup] = useState(false);
//   const [createdUser, setCreatedUser] = useState(null);

//   const validate = () => {
//     const newErrors = {};
//     if (!name.trim()) newErrors.name = 'Name is required';
//     if (!email.trim()) newErrors.email = 'Email is required';
//     else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Please enter a valid email address';
//     if (!password.trim()) newErrors.password = 'Password is required';
//     else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const totalAmount = cartItems.reduce(
//     (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
//     0
//   );

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setApiError('');
//     if (!validate()) return;

//     try {
//       // Step 1: Create user if not already created
//       let user = createdUser;
//       if (!user) {
//         user = await createUser({ name, email, password });
//         setCreatedUser(user);
//       }

//       // Step 2: Prepare orderItems
//       const orderItems = cartItems.map((item) => ({
//         quantity: item.quantity,
//         subtotal: item.price * item.quantity,
//         product: { id: item.id }
//       }));

//       // Step 3: Create order with user ID
//       const orderPayload = {
//         customerName: name,
//         customerEmail: email,
//         totalAmount,
//         orderItems,
//         user: { id: user.id }
//       };

//       const order = await createOrder(orderPayload);
//       onOrderPlaced && onOrderPlaced(order);

//       // Step 4: Reset form
//       setName('');
//       setEmail('');
//       setPassword('');
//       setErrors({});
//       setApiError('');
//       setShowPopup(true); // show success popup
//     } catch (err) {
//       const message =
//         (err && err.response && err.response.data && err.response.data.message) ||
//         err.message ||
//         'Failed to place order';
//       setApiError(message);
//     }
//   };

//   return (
//     <div className="checkout-container">
//       <h2>Checkout</h2>
//       <form onSubmit={handleSubmit} className="checkout-form">
//         <div className="form-group">
//           <label>Name</label>
//           <input
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className={errors.name ? 'error' : ''}
//             placeholder="Name"
//           />
//           {errors.name && <div className="error-message">{errors.name}</div>}
//         </div>

//         <div className="form-group">
//           <label>Email</label>
//           <input
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className={errors.email ? 'error' : ''}
//             placeholder="Email"
//           />
//           {errors.email && <div className="error-message">{errors.email}</div>}
//         </div>

//         <div className="form-group">
//           <label>Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className={errors.password ? 'error' : ''}
//             placeholder="Password"
//           />
//           {errors.password && <div className="error-message">{errors.password}</div>}
//         </div>

//         <button type="submit" disabled={cartItems.length === 0}>
//           Place Order
//         </button>
//         {apiError && <div className="api-error">{apiError}</div>}
//       </form>

//       <div className="order-summary">
//         <h3>Order Summary</h3>
//         {cartItems.length === 0 ? (
//           <div>No items in cart</div>
//         ) : (
//           cartItems.map((item) => (
//             <div key={item.id} className="summary-item">
//               <span>{item.name} x {item.quantity}</span>
//               <span>{formatCurrency(item.price * item.quantity)}</span>
//             </div>
//           ))
//         )}
//         <div className="total-amount">
//           <strong>Total: {formatCurrency(totalAmount)}</strong>
//         </div>
//       </div>

//       {showPopup && (
//         <div className="popup-overlay">
//           <div className="popup">
//             <h3>✅ Checkout Successful!</h3>
//             <p>Your order has been placed successfully.</p>
//             <button onClick={() => setShowPopup(false)}>OK</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// src/components/CheckoutForm.js
import React, { useState } from 'react';
import { createOrder } from '../utils/api';
import { formatCurrency } from '../utils/helpers';
import './CheckoutForm.css';

export default function CheckoutForm({ cartItems = [], onOrderPlaced }) {
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  // Get current logged-in user from localStorage
  const storedUser = localStorage.getItem('currentUser');
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user) {
    return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Please log in to place an order</h2>;
  }

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    setErrors({});

    if (cartItems.length === 0) {
      setErrors({ cart: 'Your cart is empty' });
      return;
    }

    try {
      // Build order items
      const orderItems = cartItems.map((item) => ({
        quantity: item.quantity,
        subtotal: item.price * item.quantity,
        product: { id: item.id },
      }));

      // Create order linked to current user
      const order = await createOrder({
        user: { id: user.id },  // ✅ link to logged-in user
        orderItems,
        totalAmount,
      });

      onOrderPlaced && onOrderPlaced(order);

      setShowPopup(true); // show success popup
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        'Failed to place order';
      setApiError(message);
    }
  };

  return (
    <div className="checkout-container" data-testid="checkout-form-container">
      <h2 className="checkout-title">Checkout</h2>

      {errors.cart && <div className="error-message">{errors.cart}</div>}
      {apiError && <div className="api-error">{apiError}</div>}

      <form onSubmit={handleSubmit} className="checkout-form" data-testid="checkout-form">
        <div className="form-group">
          <label className="form-group label">Name</label>
          <input
            type="text"
            value={user.name}
            readOnly
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-group label">Email</label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="form-input"
          />
        </div>

        <button
          type="submit"
          className="submit-button"
          disabled={cartItems.length === 0}
        >
          Place Order
        </button>
      </form>

      <div className="order-summary" data-testid="order-summary">
        <h3>Order Summary</h3>
        {cartItems.length === 0 ? (
          <div className="no-items" data-testid="no-cart-items">No items in cart</div>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="summary-item" data-testid={`summary-item-${item.id}`}>
              <span className="item-details">{item.name} x {item.quantity}</span>
              <span className="item-total">{formatCurrency(item.price * item.quantity)}</span>
            </div>
          ))
        )}
        <div className="total-amount">
          <strong data-testid="order-total">Total: {formatCurrency(totalAmount)}</strong>
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>✅ Checkout Successful!</h3>
            <p>Your order has been placed successfully.</p>
            <button onClick={() => setShowPopup(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}