import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";
import "./Login.css";
function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const response = await api.post("/users/login", {
        email,
        password,
      });

      const user = response.data;

console.log(user);

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userId", user.id);   // 
      localStorage.setItem("userName", user.name);
      localStorage.setItem("userRole", user.role);
      localStorage.setItem("userEmail", user.email);

  

      if (user.role === "ADMIN") {
        navigate("/admin");
      } else if (user.role === "STAFF") {
        navigate("/staff");
      } else {
        navigate("/dashboard");
      }

    } catch (error) {

      if (error.response) {
        alert(error.response.data);
      } else {
        alert("Server is not running!");
      }

    }
  };

  return (
  <div className="login-container">

    {/* Left Side */}
    <div className="left-panel">

      <div className="overlay">

        <h1>🏢 Smart Society</h1>

        <h2>Complaint Management Portal</h2>

        <p>
          Building a safer, smarter and better community through
          digital complaint management.
        </p>

        <div className="features">

          <div className="feature">
            ✅ Fast Complaint Resolution
          </div>

          <div className="feature">
            🔒 Secure Resident Access
          </div>

          <div className="feature">
            🏘 Smart Community Services
          </div>

        </div>

      </div>

    </div>

    {/* Right Side */}

    <div className="right-panel">

      <div className="login-card">

        <h2>Welcome Back 👋</h2>

        <p className="subtitle">
          Login to continue to your account
        </p>

        <form onSubmit={handleLogin}>

          <div className="input-group">

            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>

          <div className="input-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>

          <div className="login-options">

           <Link to="/forgot-password">
    Forgot Password?
</Link>
          </div>

          <button type="submit" className="login-btn">

            Login

          </button>

        </form>

        <div className="register-link">

          Don't have an account?

          <Link to="/register"> Register</Link>

        </div>

      </div>

    </div>

  </div>
);
}

export default Login;