
// import React, { useState } from "react";
// import { signup } from "../utils/api";
// import { useNavigate } from "react-router-dom";
// import "./Login.css"; // ✅ reuse same CSS

// export default function Signup({ onSignup }) {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       const user = await signup({ name, email, password });
//       onSignup(user);
//       navigate("/products");
//     } catch (err) {
//       setError(err.response?.data?.message || "Signup failed");
//     }
//   };

//   return (
//     <div className="login-container">
//       <form onSubmit={handleSubmit} className="login-card">
//         <h2>Join Us 🚀</h2>
//         <p className="subtitle">Create an account to get started</p>

//         {error && <p className="error">[Error - You need to specify the message]</p>}

//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <button type="submit">Signup</button>
//       </form>
//     </div>
//   );
// }
import React, { useState } from "react";
import { signup } from "../utils/api";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // ✅ reuse same CSS

export default function Signup({ onSignup }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const user = await signup({ name, email, password });

      // ✅ Save user to state and localStorage
      onSignup(user);
      localStorage.setItem("currentUser", JSON.stringify(user));

      // ✅ Navigate to profile page
      navigate("/products");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-card">
        <h2>Join Us 🚀</h2>
        <p className="subtitle">Create an account to get started</p>

        {error && <p className="error">[Error - You need to specify the message]</p>}

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Signup</button>
      </form>
    </div>
  );
}
