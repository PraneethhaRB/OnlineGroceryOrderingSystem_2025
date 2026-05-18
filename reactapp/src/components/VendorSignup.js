// // import React, { useState } from "react";
// // import { vendorSignup } from "../utils/api";
// // import { useNavigate } from "react-router-dom";

// // export default function VendorSignup({ onSignup }) {
// //   const [name, setName] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [phone, setPhone] = useState("");
// //   const [error, setError] = useState("");
// //   const navigate = useNavigate();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError("");
// //     try {
// //       const vendor = await vendorSignup({ name, email, password, phone });
// //       onSignup(vendor);
// //       navigate("/vendor-dashboard"); // redirect after signup
// //     } catch (err) {
// //       setError(err.response?.data?.message || "Signup failed");
// //     }
// //   };

// //   return (
// //     <form onSubmit={handleSubmit}>
// //       <h2>Vendor Signup</h2>
// //       {error && <p style={{ color: "red" }}>[Error - You need to specify the message]</p>}
// //       <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
// //       <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
// //       <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
// //       <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
// //       <button type="submit">Signup</button>
// //     </form>
// //   );
// // }
// import React, { useState } from "react";
// import { signupVendor } from "../utils/api";
// import { useNavigate } from "react-router-dom";

// export default function VendorSignup({ onSignup }) {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [phone, setPhone] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       const vendor = await signupVendor({ name, email, password, phone });
//       onSignup(vendor);
//       navigate("/vendor-dashboard"); // redirect after signup
//     } catch (err) {
//       setError(err.response?.data?.message || "Signup failed");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Vendor Signup</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
//       <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
//       <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
//       <input type="text" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
//       <button type="submit">Signup</button>
//     </form>
//   );
// }
import React, { useState } from "react";
import { signupVendor } from "../utils/api";
import { useNavigate } from "react-router-dom";
import "./Vendor.css"; // ✅ reuse styles

export default function VendorSignup({ onSignup }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const vendor = await signupVendor({ name, email, password, phone });
      onSignup(vendor);
      navigate("/vendor-dashboard"); // redirect after signup
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-card">
        <h2 className="login-title">Vendor Signup</h2>
        <p className="login-subtitle">Create your vendor account</p>

        {error && <p className="error-message">[Error - You need to specify the message]</p>}

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="login-input"
        />
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
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="login-input"
        />

        <button type="submit" className="login-button">Signup</button>
      </form>
    </div>
  );
}
