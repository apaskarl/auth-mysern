import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import InputField from "../components/InputField";

const Login = () => {
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: undefined,
    password: undefined,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.id]: undefined,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setErrors({
        username: !formData.username ? "Username is required" : undefined,
        password: !formData.password ? "Password is required" : undefined,
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/login",
        formData,
      );

      if (response.data.success) {
        const { token, data: user } = response.data;
        login({ token, user });
        navigate("/home");
      } else {
        setErrors({
          username:
            response.data.message === "Invalid username"
              ? response.data.message
              : undefined,
          password:
            response.data.message === "Incorrect password"
              ? response.data.message
              : undefined,
        });
      }
    } catch (error) {
      console.error("Error logging in: ", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="space-y-5 border bg-white p-10 shadow-md"
      >
        <h1 className="text-3xl font-bold">Login</h1>

        <InputField
          id="username"
          label="Username"
          placeholder="Enter your username"
          value={formData.username}
          onChange={handleChange}
          error={errors.username}
        />

        <InputField
          id="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />

        <button
          type="submit"
          className="w-full border bg-blue-600 p-3 font-medium text-white"
        >
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;
