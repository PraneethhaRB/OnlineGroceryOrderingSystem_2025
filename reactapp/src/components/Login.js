// // src/components/Login.js
// import React, { useState } from "react";
// import { login } from "../utils/api";
// import { useNavigate } from "react-router-dom";

// export default function Login({ onLogin }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       const user = await login({ email, password });
//       // localStorage.setItem("user", JSON.stringify(user)); // ✅ save user details
//       onLogin(user);
//       navigate("/products");
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Login</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// }
// src/components/Login.js
import React, { useState } from "react";
import { login } from "../utils/api";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // ✅ import CSS

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   setError("");
//   try {
//     const user = await login({ email, password });

//     // ✅ Save the email in localStorage for getCurrentUser
//     localStorage.setItem("userEmail", user.email);

//     onLogin(user); // optional if you maintain state in App.js
//     navigate("/products");
//   } catch (err) {
//     setError(err.response?.data?.message || "Login failed");
//   }
// };
const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  try {
    const user = await login({ email, password });

    // ✅ Save full user object
    localStorage.setItem("currentUser", JSON.stringify(user));

    onLogin(user);
    navigate("/products");
  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
  }
};


  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-card">
        <h2 className="login-title">Welcome Back 👋</h2>
        <p className="login-subtitle">Please sign in to continue</p>

        {error && <p className="error-message">[Error - You need to specify the message]</p>}

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
