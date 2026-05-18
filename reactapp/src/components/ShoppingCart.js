// import React from 'react';

// import { formatCurrency } from '../utils/helpers';
// import './ShoppingCart.css';
// export default function ShoppingCart({
//  cartItems = [],
//  onRemoveItem,
//  onUpdateQuantity,
//  onCheckout
// }) {
//  const handleQuantityChange = (id, value, max) => {
//   let qty = parseInt(value, 10);
//   if (Number.isNaN(qty)) qty = 1;
//   if (max !== undefined && qty > max) qty = max;
//   if (qty < 1) qty = 1;
//   onUpdateQuantity && onUpdateQuantity(id, qty);
//  };

//  const total = cartItems.reduce(
//   (sum, i) => sum + (Number(i.price) || 0) * (Number(i.quantity) || 0),
//   0
//  );

//  if (!cartItems || cartItems.length === 0) {
//   return (
//    <div>
//     <div data-testid="cart-empty">Your cart is empty</div>
//     <button data-testid="cart-checkout-btn" disabled>Checkout</button>
//    </div>
//   );
//  }

//  return (
//   <div data-testid="shopping-cart">
//    {cartItems.map((item) => (
//     <div key={item.id} data-testid={`cart-item-${item.id}`}>
//      <span data-testid={`cart-item-name-${item.id}`}>{item.name}</span>
//      <input
//       data-testid={`cart-quantity-input-${item.id}`}
//       type="number"
//       min={1}
//       max={item.stockQuantity || undefined}
//       value={item.quantity}
//       onChange={(e) => handleQuantityChange(item.id, e.target.value, item.stockQuantity)}
//      />
//      <span data-testid={`cart-item-subtotal-${item.id}`}>
//       {formatCurrency((item.price || 0) * (item.quantity || 0))}
//      </span>
//      <button
//       data-testid={`cart-remove-btn-${item.id}`}
//       onClick={() => onRemoveItem && onRemoveItem(item.id)}
//      >
//       Remove
//      </button>
//     </div>
//    ))}
//    <div data-testid="cart-total">{formatCurrency(total)}</div>
//    <button data-testid="cart-checkout-btn" onClick={() => onCheckout && onCheckout()}>
//     Checkout
//    </button>
//   </div>
//  );
// }
// import React from 'react';
// import { formatCurrency } from '../utils/helpers';
// import { useNavigate } from 'react-router-dom'; // ✅ import useNavigate
// import './ShoppingCart.css';

// export default function ShoppingCart({ cartItems = [], onRemoveItem, onUpdateQuantity }) {
//   const navigate = useNavigate(); // ✅ initialize navigate

//   const handleQuantityChange = (id, value, max) => {
//     let qty = parseInt(value, 10);
//     if (Number.isNaN(qty)) qty = 1;
//     if (max !== undefined && qty > max) qty = max;
//     if (qty < 1) qty = 1;
//     onUpdateQuantity && onUpdateQuantity(id, qty);
//   };

//   const total = cartItems.reduce(
//     (sum, i) => sum + (Number(i.price) || 0) * (Number(i.quantity) || 0),
//     0
//   );

//   if (!cartItems || cartItems.length === 0) {
//     return (
//       <div>
//         <div data-testid="cart-empty">Your cart is empty</div>
//         <button data-testid="cart-checkout-btn" disabled>Checkout</button>
//       </div>
//     );
//   }

//   return (
//     <div data-testid="shopping-cart">
//       {cartItems.map((item) => (
//         <div key={item.id} data-testid={`cart-item-${item.id}`}>
//           <span data-testid={`cart-item-name-${item.id}`}>{item.name}</span>
//           <input
//             data-testid={`cart-quantity-input-${item.id}`}
//             type="number"
//             min={1}
//             max={item.stockQuantity || undefined}
//             value={item.quantity}
//             onChange={(e) => handleQuantityChange(item.id, e.target.value, item.stockQuantity)}
//           />
//           <span data-testid={`cart-item-subtotal-${item.id}`}>
//             {formatCurrency((item.price || 0) * (item.quantity || 0))}
//           </span>
//           <button
//             data-testid={`cart-remove-btn-${item.id}`}
//             onClick={() => onRemoveItem && onRemoveItem(item.id)}
//           >
//             Remove
//           </button>
//         </div>
//       ))}
//       <div data-testid="cart-total">{formatCurrency(total)}</div>
//       <div style={{ display: 'flex', justifyContent: 'space-between', gap: '2%' }}>
//   <button
//     data-testid="cart-checkout-btn"
//     onClick={() => navigate('/checkout')}
//     disabled={cartItems.length === 0}
//   >
//     Checkout
//   </button>

//   <button
//     data-testid="cart-continue-btn"
//     onClick={() => navigate('/products')}
//   >
//     Continue Shopping
//   </button>
// </div>
      
//     </div>
//   );
// }
import React from 'react';
import { formatCurrency } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaArrowLeft, FaTrash } from 'react-icons/fa';
import './ShoppingCart.css';

export default function ShoppingCart({ cartItems = [], onRemoveItem, onUpdateQuantity }) {
  const navigate = useNavigate();

  const handleQuantityChange = (id, value, max) => {
    let qty = parseInt(value, 10);
    if (Number.isNaN(qty)) qty = 1;
    if (max !== undefined && qty > max) qty = max;
    if (qty < 1) qty = 1;
    onUpdateQuantity && onUpdateQuantity(id, qty);
  };

  const total = cartItems.reduce(
    (sum, i) => sum + (Number(i.price) || 0) * (Number(i.quantity) || 0),
    0
  );

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="shopping-cart-container">
        <div className="cart-empty">Your cart is empty</div>
        <button className="cart-btn continue-btn" onClick={() => navigate('/products')}>
          <FaArrowLeft style={{ marginRight: '0.5rem' }} />
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="shopping-cart-container">
      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <div className="cart-item-info">
            <span className="cart-item-name">{item.name}</span>
            <input
              className="cart-quantity-input"
              type="number"
              min={1}
              max={item.stockQuantity || undefined}
              value={item.quantity}
              onChange={(e) => handleQuantityChange(item.id, e.target.value, item.stockQuantity)}
            />
            <span className="cart-item-subtotal">
              {formatCurrency((item.price || 0) * (item.quantity || 0))}
            </span>
          </div>
          <button
            className="cart-remove-btn"
            onClick={() => onRemoveItem && onRemoveItem(item.id)}
          >
            <FaTrash />
          </button>
        </div>
      ))}

      <div className="cart-summary">
        <span className="cart-total">Total: {formatCurrency(total)}</span>
        <div className="cart-buttons">
          <button
            className="cart-btn checkout-btn"
            onClick={() => navigate('/checkout')}
            disabled={cartItems.length === 0}
          >
            <FaShoppingCart style={{ marginRight: '0.5rem' }} />
            Checkout
          </button>
          <button
            className="cart-btn continue-btn"
            onClick={() => navigate('/products')}
          >
            <FaArrowLeft style={{ marginRight: '0.5rem' }} />
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}