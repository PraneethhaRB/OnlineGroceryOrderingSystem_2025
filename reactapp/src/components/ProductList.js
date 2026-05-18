
// import React, { useEffect, useState } from 'react';
// import { getAllProducts } from '../utils/api';
// import { Link } from 'react-router-dom';
// import './ProductList.css';

// export default function ProductList() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [category, setCategory] = useState('');

//   // Fetch all products
//   const fetchProducts = () => {
//     setLoading(true);
//     setError('');
//     getAllProducts()
//       .then((data) => setProducts(Array.isArray(data) ? data : []))
//       .catch((err) => {
//         const message = err?.response?.data?.message || err.message || 'Failed to fetch products';
//         setError(message);
//       })
//       .finally(() => setLoading(false));
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // Filter products by category (case-insensitive)
//   const filteredProducts = category
//     ? products.filter((p) => p.category?.toLowerCase() === category.toLowerCase())
//     : products;

//   if (loading) return <div className="loading">Loading...</div>;
//   if (error) return <div className="error">[Error - You need to specify the message]</div>;

//   return (
//     <div className="product-list-container">
//       <h2>Products</h2>
//       <select className="category-select" value={category} onChange={(e) => setCategory(e.target.value)}>
//         <option value="">All</option>
//         <option value="Fruits">Fruits</option>
//         <option value="Dairy">Dairy</option>
//         <option value="Bakery">Bakery</option>
//         <option value="Vegetables">Vegetables</option>
//         <option value="Oil">Oil</option>
//       </select>

//       <div className="product-grid">
//         {filteredProducts.length === 0 ? (
//           <div className="no-products">No products found</div>
//         ) : (
//           filteredProducts.map((p) => (
//             <div key={p.id} className="product-card">
//               <div className="product-image">
//                 {p.imageUrl ? <img src={p.imageUrl} alt={p.name} /> : <div className="placeholder">No Image</div>}
//               </div>
//               <div className="product-info">
//                 <h3 className="product-name">{p.name}</h3>
           
//                 <p className="product-category">{p.category}</p>
//                 <p className="product-price">₹{p.price}</p>
//                 <p className={`stock ${p.stockQuantity > 0 ? 'in-stock' : 'out-of-stock'}`}>
//                   {p.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
//                 </p>
//               </div>
//               {p.vendor && (
//                 <div className="vendor-info">
//                   <h4>Vendor Details</h4>
//                   <p><strong>Name:</strong> {p.vendor.name}</p>
//                   <p><strong>Email:</strong> {p.vendor.email}</p>
//                   <p><strong>Phone:</strong> {p.vendor.phone}</p>
//                 </div>
//               )}
//               <Link to={`/product/${p.id}`}>
//                 <button className="view-button">View</button>
//               </Link>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }
// //  correctwithcss
import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../utils/api';
import { Link, useNavigate } from 'react-router-dom';
import './ProductList.css';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [category, setCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Fetch all products
  const fetchProducts = () => {
    setLoading(true);
    setError('');
    getAllProducts()
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch((err) => {
        const message =
          err?.response?.data?.message || err.message || 'Failed to fetch products';
        setError(message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products by category & search term (case-insensitive)
  const filteredProducts = products.filter((p) => {
    const matchesCategory = category
      ? p.category?.toLowerCase() === category.toLowerCase()
      : true;
    const matchesSearch = p.name?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) return <div className="loading">Loading...</div>;
  if (error)
    return (
      <div className="error">Error: [Error - You need to specify the message]</div>
    );


  return (
    <div className="product-list-container">
      {/* Profile Button */}
      {/* <button
        onClick={() => navigate('/profile')}
        style={{
          padding: '10px 15px',
          background: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '15px',
        }}
      >
        Go to Profile
      </button> */}{/* Profile & Logout Buttons */}
<div className="top-buttons">
  <button className="profile-button" onClick={() => navigate('/profile')}>
    👤 Profile
  </button>
  <button
    className="logout-button"
    onClick={() => {
      localStorage.clear(); // clear auth tokens/session
      navigate('/'); // redirect to login
    }}
  >
    🚪 Logout
  </button>
</div>

      <h2>Products</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search products..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Category Filter */}
      <select
        className="category-select"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All</option>
        <option value="Fruits">Fruits</option>
        <option value="Dairy">Dairy</option>
        <option value="Bakery">Bakery</option>
        <option value="Vegetables">Vegetables</option>
        <option value="Oil">Oil</option>
      </select>

      {/* Product Grid */}
      <div className="product-grid">
        {filteredProducts.length === 0 ? (
          <div className="no-products">No products found</div>
        ) : (
          filteredProducts.map((p) => (
            <div key={p.id} className="product-card">
              <div className="product-image">
                {p.imageUrl ? (
                  <img src={p.imageUrl} alt={p.name} />
                ) : (
                  <div className="placeholder">No Image</div>
                )}
              </div>
              <div className="product-info">
                <h3 className="product-name">{p.name}</h3>
                <p className="product-category">{p.category}</p>
                <p className="product-price">₹{p.price}</p>
                <p
                  className={`stock ${
                    p.stockQuantity > 0 ? 'in-stock' : 'out-of-stock'
                  }`}
                >
                  {p.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
                </p>
              </div>

              {/* Removed vendor details since you only want customer-related features */}

              <Link to={`/product/${p.id}`}>
                <button className="view-button">View</button>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

