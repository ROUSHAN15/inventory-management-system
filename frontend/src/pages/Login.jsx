import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Correct API URL (backend runs on 5000)
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });

    //   console.log(response.data)
      if (response.data.success) {
        const { user, token } = response.data;

        // Save in context
        login(user, token);

        // Redirect based on role
        if (user.role === "admin") {
          navigate("/admin-dashboard");
        } else if (user.role === "customer") {
          navigate("/customer-dashboard");
        } else {
          navigate("/login");
        }
      } else {
        setError(response.data.error || "Invalid email or password");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Login failed");
      } else {
        setError("Server error. Try again later");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        flex flex-col items-center justify-center h-screen
        bg-gradient-to-br from-orange-400 via-orange-300 to-yellow-100
        px-4
      "
    >
      <h2 className="text-4xl font-extrabold text-white drop-shadow-lg mb-6">
        Inventory Management System
      </h2>

      <div
        className="
          bg-white/80 backdrop-blur-xl shadow-2xl rounded-xl
          p-8 w-full max-w-sm border border-white/30
        "
      >
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Login
        </h2>

        {error && (
          <p className="text-red-600 mb-3 text-center font-medium">{error}</p>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              className="
                w-full px-4 py-2 rounded-lg border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-orange-400
                transition
              "
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="
                w-full px-4 py-2 rounded-lg border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-orange-400
                transition
              "
              required
            />
          </div>

          <button
            type="submit"
            className="
              w-full py-2 bg-orange-500 hover:bg-orange-600
              text-white text-lg font-semibold rounded-lg
              shadow-md transition-transform transform hover:scale-[1.03]
            "
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
