import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-5 bg-gray-200">
      {user && (
        <h1 className="text-4xl font-bold">
          Welcome, {user.first_name} {user.last_name}!
        </h1>
      )}

      <button
        onClick={handleLogout}
        className="border bg-red-600 p-3 font-medium text-white"
      >
        Log out
      </button>
    </div>
  );
};

export default Home;
