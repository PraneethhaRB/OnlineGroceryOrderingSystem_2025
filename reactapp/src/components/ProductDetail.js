// //correct
// import React, { useEffect, useState } from 'react';
// import { getProductById } from '../utils/api';

// export default function ProductDetail({ productId, onAddToCart }) {
//  const [product, setProduct] = useState(null);
//  const [loading, setLoading] = useState(Boolean(productId));
//  const [error, setError] = useState('');
//  const [quantity, setQuantity] = useState(1);

//  useEffect(() => {
//  if (productId === undefined || productId === null) {
//  setProduct(null);
//  setLoading(false);
//  return;
//  }
//  setLoading(true);
//  setError('');
//  getProductById(productId)
//  .then((data) => {
//  setProduct(data);
//  setQuantity(1);
//  setLoading(false);
//  })
//  .catch((err) => {
//  const message =
//  (err && err.response && err.response.data && err.response.data.message) ||
//  err.message ||
//  'Failed to fetch product';
//  setError(message);
//  setLoading(false);
//  });
//  }, [productId]);

//  if (loading) return <div data-testid="detail-loading"><p>Loading...</p></div>;
//  if (error) return <div data-testid="detail-error">['Product not found']</div>;
//  if (!product) return null;

//  const handleQuantityChange = (e) => {
//  let val = parseInt(e.target.value, 10);
//  if (Number.isNaN(val)) val = 1;
//  if (product.stockQuantity !== undefined) {
//  if (val > product.stockQuantity) val = product.stockQuantity;
//  }
//  if (val < 1) val = 1;
//  setQuantity(val);
//  };

//  return (
//  <div data-testid="product-detail-container">
//  <h2 data-testid="detail-name">{product.name}</h2>
//  <p data-testid="detail-description">{product.description}</p>
//  {product.stockQuantity > 0 ? (
//  <div data-testid="detail-stock-status">In Stock: {product.stockQuantity}</div>
//  ) : (
//  <div data-testid="detail-stock-status">Out of Stock</div>
//  )}
//  <input
//  data-testid="quantity-input"
//  type="number"
//  min={1}
//  max={product.stockQuantity || 1}
//  value={quantity}
//  disabled={product.stockQuantity === 0}
//  onChange={handleQuantityChange}
//  />
//  <button
//  data-testid="add-to-cart-btn"
//  disabled={product.stockQuantity === 0}
//  onClick={() => onAddToCart && onAddToCart({ ...product, quantity })}
//  >
//  Add to Cart
//  </button>
//  </div>
//  );
// }
// //correct
import React, { useEffect, useState } from 'react';
import { getProductById } from '../utils/api';
import { useNavigate } from 'react-router-dom'; // ✅ import useNavigate
import './ProductDetail.css';
export default function ProductDetail({ productId, onAddToCart }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(Boolean(productId));
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate(); // ✅ initialize navigate

  useEffect(() => {
    if (productId === undefined || productId === null) {
      setProduct(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError('');
    getProductById(productId)
      .then((data) => {
        setProduct(data);
        setQuantity(1);
        setLoading(false);
      })
      .catch((err) => {
        const message =
          (err && err.response && err.response.data && err.response.data.message) ||
          err.message ||
          'Failed to fetch product';
        setError(message);
        setLoading(false);
      });
  }, [productId]);

  if (loading) return <div data-testid="detail-loading"><p>Loading...</p></div>;
  if (error) return <div data-testid="detail-error">['Product not found']</div>;
  if (!product) return null;

  const handleQuantityChange = (e) => {
    let val = parseInt(e.target.value, 10);
    if (Number.isNaN(val)) val = 1;
    if (product.stockQuantity !== undefined && val > product.stockQuantity) val = product.stockQuantity;
    if (val < 1) val = 1;
    setQuantity(val);
  };

  const handleAddClick = () => {
    if (onAddToCart) onAddToCart({ ...product, quantity });
    navigate('/cart'); // ✅ navigate to cart page after adding
  };

  return (
    <div data-testid="product-detail-container">
      <h2 data-testid="detail-name">{product.name}</h2>
      <p data-testid="detail-description">{product.description}</p>
      {product.stockQuantity > 0 ? (
        <div data-testid="detail-stock-status">In Stock: {product.stockQuantity}</div>
      ) : (
        <div data-testid="detail-stock-status">Out of Stock</div>
      )}
      <input
        data-testid="quantity-input"
        type="number"
        min={1}
        max={product.stockQuantity || 1}
        value={quantity}
        disabled={product.stockQuantity === 0}
        onChange={handleQuantityChange}
      />
      <button
      
        data-testid="add-to-cart-btn"
        disabled={product.stockQuantity === 0}
        onClick={handleAddClick} // ✅ updated handler
      >
        Add to Cart
      </button>
    </div>
  );
}
