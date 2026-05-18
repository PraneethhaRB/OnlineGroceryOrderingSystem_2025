// // src/components/RoleSelection.js
// import React, { useState } from "react";
// import Signup from "./Signup";
// import Login from "./Login";
// import VendorSignup from "./VendorSignup";
// import VendorLogin from "./VendorLogin";

// export default function RoleSelection({ setUser }) {
//   const [role, setRole] = useState(""); // "USER" or "VENDOR"
//   const [action, setAction] = useState(""); // "login" or "signup"

//   if (!role) {
//     // Step 1: Choose role
//     return (
//       <div style={{ textAlign: "center", marginTop: "50px" }}>
//         <h2>Welcome! Please select your role</h2>
//         <button onClick={() => setRole("USER")}>Customer</button>
//         <button onClick={() => setRole("VENDOR")}>Vendor</button>
//       </div>
//     );
//   }

//   if (!action) {
//     // Step 2: Choose login or signup
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

//   // Step 3: Render the appropriate form
//   if (role === "USER" && action === "signup") return <Signup onSignup={setUser} />;
//   if (role === "USER" && action === "login") return <Login onLogin={setUser} />;
//   if (role === "VENDOR" && action === "signup") return <VendorSignup onSignup={setUser} />;
//   if (role === "VENDOR" && action === "login") return <VendorLogin onLogin={setUser} />;

//   return null;
// }
//correct code
// import React, { useState } from "react";
// import Signup from "./Signup";
// import Login from "./Login";
// import VendorSignup from "./VendorSignup";
// import VendorLogin from "./VendorLogin";

// export default function RoleSelection({ setUser }) {
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

//   // Step 3: Render the appropriate form
//   if (role === "USER" && action === "signup") return <Signup onSignup={setUser} />;
//   if (role === "USER" && action === "login") return <Login onLogin={setUser} />;

//   // ✅ Vendor forms: redirect to dashboard after success
//   if (role === "VENDOR" && action === "signup")
//     return (
//       <VendorSignup
//         onSignup={(vendor) => {
//           setUser(vendor);
//           window.location.href = "/vendor-dashboard"; // redirect
//         }}
//       />
//     );

//   if (role === "VENDOR" && action === "login")
//     return (
//       <VendorLogin
//         onLogin={(vendor) => {
//           setUser(vendor);
//           window.location.href = "/vendor-dashboard"; // redirect
//         }}
//       />
//     );

//   return null;
// }
//correct code
// src/components/RoleSelection.js
import React, { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";
import VendorSignup from "./VendorSignup";
import VendorLogin from "./VendorLogin";

export default function RoleSelection({ setUser }) {
  const [role, setRole] = useState("");
  const [action, setAction] = useState("");

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #f3f4f6, #d1d5db)",
    fontFamily: "Arial, sans-serif",
  };

  const titleStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#111827",
  };

  const buttonContainerStyle = {
    display: "flex",
    gap: "15px",
    marginBottom: "20px",
  };

  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "600",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  const backButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#6b7280",
  };

  const hoverEffect = (e, color) => {
    e.target.style.backgroundColor = color;
  };

  if (!role) {
    return (
      <div style={containerStyle}>
        <h2 style={titleStyle}>Welcome! Please select your role</h2>
        <div style={buttonContainerStyle}>
          <button
            style={buttonStyle}
            onMouseOver={(e) => hoverEffect(e, "#1e40af")}
            onMouseOut={(e) => hoverEffect(e, "#2563eb")}
            onClick={() => setRole("USER")}
          >
            Customer
          </button>
          <button
            style={buttonStyle}
            onMouseOver={(e) => hoverEffect(e, "#1e40af")}
            onMouseOut={(e) => hoverEffect(e, "#2563eb")}
            onClick={() => setRole("VENDOR")}
          >
            Vendor
          </button>
        </div>
      </div>


    );
  }

  if (!action) {
    return (
      <div style={containerStyle}>
        <h2 style={titleStyle}>
          {role === "USER" ? "Customer Portal" : "Vendor Portal"}
        </h2>
        <div style={buttonContainerStyle}>
          <button
            style={buttonStyle}
            onMouseOver={(e) => hoverEffect(e, "#1e40af")}
            onMouseOut={(e) => hoverEffect(e, "#2563eb")}
            onClick={() => setAction("login")}
          >
            Login
          </button>
          <button
            style={buttonStyle}
            onMouseOver={(e) => hoverEffect(e, "#1e40af")}
            onMouseOut={(e) => hoverEffect(e, "#2563eb")}
            onClick={() => setAction("signup")}
          >
            Signup
          </button>
        </div>
        <button
          style={backButtonStyle}
          onMouseOver={(e) => hoverEffect(e, "#4b5563")}
          onMouseOut={(e) => hoverEffect(e, "#6b7280")}
          onClick={() => {
            setRole("");
            setAction("");
          }}
        >
          ⬅ Back
        </button>
      </div>
    );
  }

  if (role === "USER" && action === "signup") return <Signup onSignup={setUser} />;
  if (role === "USER" && action === "login") return <Login onLogin={setUser} />;

  if (role === "VENDOR" && action === "signup")
    return (
      <VendorSignup
        onSignup={(vendor) => {
          setUser(vendor);
          window.location.href = "/vendor-dashboard";
        }}
      />
    );

  if (role === "VENDOR" && action === "login")
    return (
      <VendorLogin
        onLogin={(vendor) => {
          setUser(vendor);
          window.location.href = "/vendor-dashboard";
        }}
      />
    );

  return null;
}
