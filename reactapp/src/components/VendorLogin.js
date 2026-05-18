
// import React, { useState } from "react";
// import { vendorLogin } from "../utils/api";
// import { useNavigate } from "react-router-dom";
// import "./Vendor.css"; // ✅ reuse styles

// export default function VendorLogin({ onLogin }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       const vendor = await vendorLogin({ email, password });
//       onLogin(vendor);
//       navigate("/vendor-dashboard"); // redirect after login
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="login-container">
//       <form onSubmit={handleSubmit} className="login-card">
//         <h2 className="login-title">Vendor Portal</h2>
//         <p className="login-subtitle">Sign in to manage your account</p>

//         {error && <p className="error-message">[Error - You need to specify the message]</p>}

//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           className="login-input"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           className="login-input"
//         />

//         <button type="submit" className="login-button">Login</button>
//       </form>
//     </div>
//   );
// }
import React, { useState } from "react";
import { vendorLogin } from "../utils/api";
import { useNavigate } from "react-router-dom";
import "./Vendor.css";

export default function VendorLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { vendor, token } = await vendorLogin({ email, password });
      localStorage.setItem("token", token);
      onLogin(vendor); // store in state/context

      navigate("/vendor-dashboard"); // redirect after login
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
};

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-card">
        <h2 className="login-title">Vendor Portal</h2>
        <p className="login-subtitle">Sign in to manage your account</p>

        {/* Display error message */}
        {error && <p className="error-message">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />

        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}