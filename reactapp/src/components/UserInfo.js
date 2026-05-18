// src/components/UserInfo.js
import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../utils/api";
import "./UserInfo.css";

export default function UserInfo({ email }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email) return; // no email, skip
    setLoading(true);
    getCurrentUser(email)
      .then((data) => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, [email]);

  if (loading) return <div className="user-info-loading">Loading user...</div>;
  if (!user) return <div className="user-info-error">User not found</div>;

  return (
    <div className="user-info-card">
      <img
        src={user.profileImage || "https://via.placeholder.com/80"}
        alt={user.name}
        className="user-avatar"
      />
      <div className="user-details">
        <h3>{user.name}</h3>
        <p>{user.email}</p>
        <p>{user.phone}</p>
      </div>
    </div>
  );
}
