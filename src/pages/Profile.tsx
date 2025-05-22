import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p>Welcome, {user?.name}</p>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mt-4"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
