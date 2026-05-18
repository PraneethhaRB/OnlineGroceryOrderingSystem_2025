// // import React, { useState } from 'react';
// // import ProductList from './components/ProductList';
// // import ProductDetail from './components/ProductDetail';
// // import ShoppingCart from './components/ShoppingCart';
// // import CheckoutForm from './components/CheckoutForm';
// // import OrderConfirmation from './components/OrderConfirmation';

// // export default function App() {
// //  const [cart, setCart] = useState([]);
// //  const [selectedProductId, setSelectedProductId] = useState(null);
// //  const [order, setOrder] = useState(null);

// //  const handleAddToCart = (product) => {
// //   setCart((prev) => {
// //    const existing = prev.find((p) => p.id === product.id);
// //    if (existing) {
// //     return prev.map((p) =>
// //      p.id === product.id ? { ...p, quantity: p.quantity + product.quantity } : p
// //     );
// //    }
// //    return [...prev, { ...product }];
// //   });
// //  };

// //  const handleRemoveItem = (id) => setCart((prev) => prev.filter((p) => p.id !== id));
// //  const handleUpdateQuantity = (id, qty) =>
// //   setCart((prev) => prev.map((p) => (p.id === id ? { ...p, quantity: qty } : p)));

// //  const handleOrderPlaced = (newOrder) => {
// //   setOrder(newOrder);
// //   setCart([]);
// //  };

// //  return (
// //   <div>
// //    <ProductList onSelectProduct={(id) => setSelectedProductId(id)} />
// //    <ProductDetail productId={selectedProductId} onAddToCart={handleAddToCart} />
// //    <ShoppingCart
// //     cartItems={cart}
// //     onRemoveItem={handleRemoveItem}
// //     onUpdateQuantity={handleUpdateQuantity}
// //     onCheckout={() => {}}
// //    />
// //    <CheckoutForm cartItems={cart} onOrderPlaced={handleOrderPlaced} />
// //    <OrderConfirmation order={order} />
// //   </div>
// //  );
// // }

// //change
// // src/App.js
// //correct
// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import ProductList from "./components/ProductList";
// import ProductDetail from "./components/ProductDetail";
// import ShoppingCart from "./components/ShoppingCart";
// import CheckoutForm from "./components/CheckoutForm";
// import OrderConfirmation from "./components/OrderConfirmation";
// import Login from "./components/Login";
// import Signup from "./components/Signup";

// export default function App() {
//   const [cart, setCart] = useState([]);
//   const [selectedProductId, setSelectedProductId] = useState(null);
//   const [order, setOrder] = useState(null);
//   const [user, setUser] = useState(null);

//   const handleAddToCart = (product) => {
//     setCart((prev) => {
//       const existing = prev.find((p) => p.id === product.id);
//       if (existing) {
//         return prev.map((p) =>
//           p.id === product.id ? { ...p, quantity: p.quantity + product.quantity } : p
//         );
//       }
//       return [...prev, { ...product }];
//     });
//   };

//   const handleRemoveItem = (id) =>
//     setCart((prev) => prev.filter((p) => p.id !== id));

//   const handleUpdateQuantity = (id, qty) =>
//     setCart((prev) => prev.map((p) => (p.id === id ? { ...p, quantity: qty } : p)));

//   const handleOrderPlaced = (newOrder) => {
//     setOrder(newOrder);
//     setCart([]);
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<ProductList onSelectProduct={setSelectedProductId} />} />
//         <Route
//           path="/product/:id"
//           element={<ProductDetail productId={selectedProductId} onAddToCart={handleAddToCart} />}
//         />
//         <Route
//           path="/cart"
//           element={
//             <ShoppingCart
//               cartItems={cart}
//               onRemoveItem={handleRemoveItem}
//               onUpdateQuantity={handleUpdateQuantity}
//             />
//           }
//         />
//         <Route
//           path="/checkout"
//           element={user ? (
//             <CheckoutForm cartItems={cart} onOrderPlaced={handleOrderPlaced} />
//           ) : (
//             <Navigate to="/login" />
//           )}
//         />
//         <Route path="/order-confirmation" element={<OrderConfirmation order={order} />} />
//         <Route path="/login" element={<Login onLogin={setUser} />} />
//         <Route path="/signup" element={<Signup onSignup={setUser} />} />
//       </Routes>
//     </Router>
//   );
// }
// //correct
//worked
// src/App.js
// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from "react-router-dom";
// import ProductList from "./components/ProductList";
// import ProductDetail from "./components/ProductDetail";
// import ShoppingCart from "./components/ShoppingCart";
// import CheckoutForm from "./components/CheckoutForm";
// import OrderConfirmation from "./components/OrderConfirmation";
// import Login from "./components/Login";
// import Signup from "./components/Signup";

// export default function App() {
//   const [cart, setCart] = useState([]);
//   const [order, setOrder] = useState(null);
//   const [user, setUser] = useState(null);

//   // 🛒 Cart Handlers
//   const handleAddToCart = (product) => {
//     setCart((prev) => {
//       const existing = prev.find((p) => p.id === product.id);
//       if (existing) {
//         return prev.map((p) =>
//           p.id === product.id
//             ? { ...p, quantity: p.quantity + product.quantity }
//             : p
//         );
//       }
//       return [...prev, { ...product }];
//     });
//   };

//   const handleRemoveItem = (id) =>
//     setCart((prev) => prev.filter((p) => p.id !== id));

//   const handleUpdateQuantity = (id, qty) =>
//     setCart((prev) =>
//       prev.map((p) => (p.id === id ? { ...p, quantity: qty } : p))
//     );

//   const handleOrderPlaced = (newOrder) => {
//     setOrder(newOrder);
//     setCart([]);
//   };

//   return (
//     <Router>
//       <Routes>
//         {/* ✅ Product List */}
//         <Route path="/" element={<ProductList />} />

//         {/* ✅ Product Detail - takes id from URL */}
//         <Route
//           path="/product/:id"
//           element={<ProductDetailWrapper onAddToCart={handleAddToCart} />}
//         />

//         {/* ✅ Shopping Cart */}
//         <Route
//           path="/cart"
//           element={
//             <ShoppingCart
//               cartItems={cart}
//               onRemoveItem={handleRemoveItem}
//               onUpdateQuantity={handleUpdateQuantity}
//             />
//           }
//         />

//         {/* ✅ Checkout - protected route */}
//         <Route
//           path="/checkout"
//           element={
//             user ? (
//               <CheckoutForm cartItems={cart} onOrderPlaced={handleOrderPlaced} />
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         />

//         {/* ✅ Order Confirmation */}
//         <Route
//           path="/order-confirmation"
//           element={<OrderConfirmation order={order} />}
//         />


//         {/* ✅ Auth */}
//         <Route path="/login" element={<Login onLogin={setUser} />} />
//         <Route path="/signup" element={<Signup onSignup={setUser} />} />
//       </Routes>
//     </Router>
//   );
// }

// // ✅ Wrapper for ProductDetail to get :id from URL
// function ProductDetailWrapper({ onAddToCart }) {
//   const { id } = useParams();
//   return <ProductDetail productId={id} onAddToCart={onAddToCart} />;
// }
//worked
// //correct
// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from "react-router-dom";
// import ProductList from "./components/ProductList";
// import ProductDetail from "./components/ProductDetail";
// import ShoppingCart from "./components/ShoppingCart";
// import CheckoutForm from "./components/CheckoutForm";
// import OrderConfirmation from "./components/OrderConfirmation";
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// import VendorLogin from "./components/VendorLogin";
// import VendorSignup from "./components/VendorSignup";

// // Role Selection Component
// function RoleSelection({ setUser }) {
//   const [role, setRole] = useState(""); // "USER" or "VENDOR"
//   const [action, setAction] = useState(""); // "login" or "signup"

//   if (!role) {
//     return (
//       <div style={{ textAlign: "center", marginTop: "50px" }}>
//         <h2>Welcome! Please select your role</h2>
//         <button onClick={() => setRole("USER")}>Customer</button>
//         <button onClick={() => setRole("VENDOR")}>Vendor</button>
//       </div>
//     );
//   }

//   if (!action) {
//     return (
//       <div style={{ textAlign: "center", marginTop: "50px" }}>
//         <h2>{role === "USER" ? "Customer Portal" : "Vendor Portal"}</h2>
//         <button onClick={() => setAction("login")}>Login</button>
//         <button onClick={() => setAction("signup")}>Signup</button>
//         <br />
//         <button onClick={() => { setRole(""); setAction(""); }}>Back</button>
//       </div>
//     );
//   }

//   if (role === "USER" && action === "signup") return <Signup onSignup={setUser} />;
//   if (role === "USER" && action === "login") return <Login onLogin={setUser} />;
//   if (role === "VENDOR" && action === "signup") return <VendorSignup onSignup={setUser} />;
//   if (role === "VENDOR" && action === "login") return <VendorLogin onLogin={setUser} />;

//   return null;
// }

// // Wrapper for ProductDetail
// function ProductDetailWrapper({ onAddToCart }) {
//   const { id } = useParams();
//   return <ProductDetail productId={id} onAddToCart={onAddToCart} />;
// }

// export default function App() {
//   const [cart, setCart] = useState([]);
//   const [order, setOrder] = useState(null);
//   const [user, setUser] = useState(null);

//   // 🛒 Cart Handlers
//   const handleAddToCart = (product) => {
//     setCart((prev) => {
//       const existing = prev.find((p) => p.id === product.id);
//       if (existing) {
  

//         return prev.map((p) =>
//           p.id === product.id
//             ? { ...p, quantity: p.quantity + product.quantity }
//             : p
//         );
//       }
//       return [...prev, { ...product }];
//     });
//   };

//   const handleRemoveItem = (id) =>
//     setCart((prev) => prev.filter((p) => p.id !== id));

//   const handleUpdateQuantity = (id, qty) =>
//     setCart((prev) =>
//       prev.map((p) => (p.id === id ? { ...p, quantity: qty } : p))
//     );

//   const handleOrderPlaced = (newOrder) => {
//     setOrder(newOrder);
//     setCart([]);
//   };

//   return (
//     <Router>
//       <Routes>
//         {/* ✅ Role Selection as root page */}
//         <Route path="/" element={<RoleSelection setUser={setUser} />} />

//         {/* ✅ Product List */}
//         <Route path="/products" element={<ProductList />} />

//         {/* ✅ Product Detail - takes id from URL */}
//         <Route
//           path="/product/:id"
//           element={<ProductDetailWrapper onAddToCart={handleAddToCart} />}
//         />

//         {/* ✅ Shopping Cart */}
//         <Route
//           path="/cart"
//           element={
//             <ShoppingCart
//               cartItems={cart}
//               onRemoveItem={handleRemoveItem}
//               onUpdateQuantity={handleUpdateQuantity}
//             />
//           }
//         />

//         {/* ✅ Checkout - protected route */}
//         <Route
//           path="/checkout"
//           element={
//             user ? (
//               <CheckoutForm cartItems={cart} onOrderPlaced={handleOrderPlaced} />
//             ) : (
//               <Navigate to="/" />
//             )
//           }
//         />

//         {/* ✅ Order Confirmation */}
//         <Route
//           path="/order-confirmation"
//           element={<OrderConfirmation order={order} />}
//         />


//         {/* ✅ Auth routes (optional, can keep for direct access) */}
//         <Route path="/login" element={<Login onLogin={setUser} />} />
//         <Route path="/signup" element={<Signup onSignup={setUser} />} />
//       </Routes>
//     </Router>
//   );
// }
// //correct
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import ShoppingCart from "./components/ShoppingCart";
import CheckoutForm from "./components/CheckoutForm";
import OrderConfirmation from "./components/OrderConfirmation";
import Login from "./components/Login";
import Signup from "./components/Signup";
import VendorLogin from "./components/VendorLogin";
import VendorSignup from "./components/VendorSignup";
import VendorDashboard from "./components/VendorDashboard";
import UserProfile from "./components/UserProfile";

// Role Selection Component
function RoleSelection({ setUser, setRole }) {
  const [role, localSetRole] = useState(""); // "USER" or "VENDOR"
  const [action, setAction] = useState(""); // "login" or "signup"

  // if (!role) {
  //   return (
  //     <div style={{ textAlign: "left", marginTop: "100px" }}>
  //       <h2>Welcome! Please select your role</h2>
  //       <button onClick={() => localSetRole("USER")}>Customer</button>
  //       <button onClick={() => localSetRole("VENDOR")}>Vendor</button>
  //     </div>
  //   );
  // }
  if (!role) {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "20px",
    backgroundImage: "url('https://images.unsplash.com/photo-1688964420317-0c48f1d3781d?q=80&w=2485&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "blur(0px)", // main container not blurred, see inner overlay
    position: "relative",
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    backdropFilter: "blur(5px)",
    zIndex: 1,
  };

  const contentStyle = {
    position: "relative",
    zIndex: 2,
    textAlign: "center",
    maxWidth: "400px",
    padding: "40px",
    borderRadius: "16px",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  };

  const titleStyle = {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: "24px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px 16px",
    margin: "8px 0",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    color: "#ffffff",
    backgroundColor: "#3b82f6",
    transition: "all 0.3s ease",
  };

  const hoverEffect = (e, color) => {
    e.target.style.backgroundColor = color;
  };

  return (
    <div style={containerStyle}>
      <div style={overlayStyle}></div>
      <div style={contentStyle}>
        <h2 style={titleStyle}>Welcome! Please select your role</h2>
        <button
          style={buttonStyle}
          onMouseOver={(e) => hoverEffect(e, "#2563eb")}
          onMouseOut={(e) => hoverEffect(e, "#3b82f6")}
          onClick={() => localSetRole("USER")}
        >
          Customer
        </button>
        <button
          style={buttonStyle}
          onMouseOver={(e) => hoverEffect(e, "#2563eb")}
          onMouseOut={(e) => hoverEffect(e, "#3b82f6")}
          onClick={() => localSetRole("VENDOR")}
        >
          Vendor
        </button>
      </div>
    </div>
  );
}


  // if (!action) {
  //   return (
  //     <div style={{ textAlign: "center", marginTop: "50px" }}>
  //       <h2>{role === "USER" ? "Customer Portal" : "Vendor Portal"}</h2>
  //       <button onClick={() => setAction("login")}>Login</button>
  //       <button onClick={() => setAction("signup")}>Signup</button>
  //       <br />
  //       <button
  //         onClick={() => {
  //           localSetRole("");
  //           setAction("");
  //         }}
  //       >
  //         Back
  //       </button>
  //     </div>
  //   );
  // }
//   if (!action) {
//   return (
//     <div
//       style={{
//         textAlign: "center",
//         margin: "50px auto",
//         padding: "40px 30px",
//         maxWidth: "400px",
//         backgroundImage: "url('https://images.unsplash.com/photo-1679559743504-4e5c4fd14eac?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", // replace with your image URL
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         borderRadius: "16px",
//         boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
//         color: "white",
//         backdropFilter: "blur(5px)", // optional, adds a glassy effect over the image
//       }}
//     >
//       <h2 style={{ marginBottom: "30px", fontSize: "1.8rem", textShadow: "1px 1px 3px rgba(0,0,0,0.6)" }}>
//         {role === "USER" ? "Customer Portal" : "Vendor Portal"}
//       </h2>
//       <button
//         style={{
//           margin: "10px",
//           padding: "10px 25px",
//           border: "none",
//           borderRadius: "8px",
//           backgroundColor: "#007bff",
//           color: "white",
//           fontSize: "1rem",
//           cursor: "pointer",
//           transition: "all 0.3s ease",
//         }}
//         onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
//         onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
//         onClick={() => setAction("login")}
//       >
//         Login
//       </button>
//       <button
//         style={{
//           margin: "10px",
//           padding: "10px 25px",
//           border: "none",
//           borderRadius: "8px",
//           backgroundColor: "#007bff",
//           color: "white",
//           fontSize: "1rem",
//           cursor: "pointer",
//           transition: "all 0.3s ease",
//         }}
//         onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
//         onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
//         onClick={() => setAction("signup")}
//       >
//         Signup
//       </button>
//       <br />
//       <button
//         style={{
//           marginTop: "20px",
//           padding: "10px 25px",
//           border: "none",
//           borderRadius: "8px",
//           backgroundColor: "#6c757d",
//           color: "white",
//           fontSize: "1rem",
//           cursor: "pointer",
//           transition: "all 0.3s ease",
//         }}
//         onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#495057")}
//         onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#6c757d")}
//         onClick={() => {
//           localSetRole("");
//           setAction("");
//         }}
//       >
//         Back
//       </button>
//     </div>
//   );
// }
if (!action) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('https://images.unsplash.com/photo-1679559743504-4e5c4fd14eac?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", // replace with your image
        
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: "40px 30px",
          borderRadius: "16px",
          backgroundColor: "rgba(0,0,0,0.6)", // semi-transparent card
          color: "white",
          boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
          maxWidth: "400px",
          width: "90%",
        }}
      >
        <h2 style={{ marginBottom: "30px", fontSize: "1.8rem" }}>
          {role === "USER" ? "Customer Portal" : "Vendor Portal"}
        </h2>
        <button
          style={{
            margin: "10px",
            padding: "10px 25px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#007bff",
            color: "white",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
          onClick={() => setAction("login")}
        >
          Login
        </button>
        <button
          style={{
            margin: "10px",
            padding: "10px 25px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#007bff",
            color: "white",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
          onClick={() => setAction("signup")}
        >
          Signup
        </button>
        <br />
        <button
         
          style={{
            marginTop: "20px",
            padding: "10px 25px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#6c757d",
            color: "white",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#495057")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#6c757d")}
          onClick={() => {
            localSetRole("");
            setAction("");
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
}


  // ✅ Customer forms
  if (role === "USER" && action === "signup")
    return (
      <Signup
        onSignup={(user) => {
          setUser(user);
          setRole("USER");
        }}
      />
    );
  if (role === "USER" && action === "login")
    return (
      <Login
        onLogin={(user) => {
          setUser(user);
          setRole("USER");
        }}
      />
    );


  // ✅ Vendor forms
  if (role === "VENDOR" && action === "signup")
    return (
      <VendorSignup
        onSignup={(vendor) => {
          setUser(vendor);
          setRole("VENDOR");
        }}
      />
    );
  if (role === "VENDOR" && action === "login")
    return (
      <VendorLogin
        onLogin={(vendor) => {
          setUser(vendor);
          setRole("VENDOR");
        }}
      />
    );

  return null;
}

// Wrapper for ProductDetail
function ProductDetailWrapper({ onAddToCart }) {
  const { id } = useParams();
  return <ProductDetail productId={id} onAddToCart={onAddToCart} />;
}

export default function App() {
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState(null);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(""); // "USER" or "VENDOR"

  // 🛒 Cart Handlers
  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + product.quantity }
            : p
        );
      }
      return [...prev, { ...product }];
    });
  };

  const handleRemoveItem = (id) =>
    setCart((prev) => prev.filter((p) => p.id !== id));

  const handleUpdateQuantity = (id, qty) =>
    setCart((prev) =>
  
      prev.map((p) => (p.id === id ? { ...p, quantity: qty } : p))
    );

  const handleOrderPlaced = (newOrder) => {
    setOrder(newOrder);
    setCart([]);
  };

  return (
    <Router>
      <Routes>
        {/* Role Selection as root page */}
        <Route
          path="/"
          element={<RoleSelection setUser={setUser} setRole={setRole} />}
        />

        {/* Product List */}
        <Route path="/products" element={<ProductList />} />

        {/* Product Detail */}
        <Route
          path="/product/:id"
          element={<ProductDetailWrapper onAddToCart={handleAddToCart} />}
        />

        {/* Shopping Cart */}
        <Route
          path="/cart"
          element={
            <ShoppingCart
              cartItems={cart}
              onRemoveItem={handleRemoveItem}
              onUpdateQuantity={handleUpdateQuantity}
            />
          }
        />

        {/* Checkout - protected for customers */}
        <Route
          path="/checkout"
          element={
            user && role === "USER" ? (
              <CheckoutForm cartItems={cart} onOrderPlaced={handleOrderPlaced} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Order Confirmation */}
        <Route
          path="/order-confirmation"
          element={<OrderConfirmation order={order} />}
        />
<Route path="/profile" element={<UserProfile />} />
        {/* Vendor Dashboard - protected */}
        <Route
          path="/vendor-dashboard"
          element={
            user && role === "VENDOR" ? (
              <VendorDashboard vendor={user}/>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

