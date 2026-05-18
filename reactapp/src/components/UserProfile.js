// import React from "react";
// import "./UserProfile.css";

// const UserProfile = () => {
//   const storedUser = localStorage.getItem("currentUser");
//   const user = storedUser ? JSON.parse(storedUser) : null;

//   if (!user) {
//     return <h2 style={{ textAlign: "center", marginTop: "50px" }}>No user logged in</h2>;
//   }

//   return (
//     <div className="user-profile-wrapper">
//     <div className="user-profile-container">
//       <h2>Customer Profile</h2>
//       <p><strong>Name:</strong> {user.name}</p>
//       <p><strong>Email:</strong> {user.email}</p>
//       <p><strong>Password:</strong> {user.password || "Not Provided"}</p>
//       {/* <p><strong>Address:</strong> {user.address || "Not Provided"}</p> */}
//     </div>
//     </div>
//   );
// };

// export default UserProfile;
//aboveiscorrect
import React, { useEffect, useState } from "react";
import { getUserById } from "../utils/api"; // create this in your api.js
import { formatCurrency } from "../utils/helpers";
import "./UserProfile.css";

const UserProfile = () => {
  const storedUser = localStorage.getItem("currentUser");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;

  const [user, setUser] = useState(parsedUser);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (parsedUser && parsedUser.id) {
      getUserById(parsedUser.id)
        .then((data) => {
          setUser(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to fetch user orders");
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [parsedUser]);

  if (!parsedUser) {
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>No user logged in</h2>;
  }

  if (loading) return <h2>Loading user data...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="user-profile-wrapper">
      <div className="user-profile-container">
        <h2>Customer Profile</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Password:</strong> {user.password || "Not Provided"}</p>

        <h3>Orders</h3>
        {user.orders && user.orders.length > 0 ? (
          user.orders.map((order) => (
            <div key={order.id} className="user-order">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
              <p><strong>Total Amount:</strong> {formatCurrency(order.totalAmount)}</p>
              <div>
                <strong>Items:</strong>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.id}>
                      {item.product.name} x {item.quantity} - {formatCurrency(item.subtotal)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;