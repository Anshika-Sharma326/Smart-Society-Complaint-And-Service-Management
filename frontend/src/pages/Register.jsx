import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "",
    profession: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      await api.post("/users", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: formData.role,
        profession: formData.role === "STAFF" ? formData.profession : null,
      });

      alert("Registration successful!");

      navigate("/");
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data);
      } else {
        alert("Server is not running.");
      }
    }
  };

  return (
    <div className="register-container">

      {/* Left Section */}

      <div className="left-panel">

        <div className="overlay">

          <h1>🏢 Smart Society</h1>

          <h2>Create Your Resident Account</h2>

          <p>
            Join the Smart Society Portal and enjoy secure complaint
            management, faster service requests and a better community
            experience.
          </p>

          <div className="features">

            <div className="feature">
              ✅ Secure Registration
            </div>

            <div className="feature">
              🏘 Verified Society Members
            </div>

            <div className="feature">
              ⚡ Fast Complaint Tracking
            </div>

          </div>

        </div>

      </div>

      {/* Right Section */}

      <div className="right-panel">

        <div className="register-card">

          <h2>Create Account</h2>

          <p className="subtitle">
            Fill in your details to join Smart Society
          </p>

          <form onSubmit={handleRegister}>

            <div className="input-group">

              <label>👤 Full Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>

            <div className="input-group">

              <label>📧 Email Address</label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>

            <div className="input-group">

              <label>📱 Phone Number</label>

              <input
                type="text"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />

            </div>

            <div className="input-group">

              <label>🔒 Password</label>

              <input
                type="password"
                name="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
                required
              />

            </div>

            <div className="input-group">

              <label>🔒 Confirm Password</label>

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

            </div>

            <div className="input-group">

              <label>👥 Select Role</label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="">Choose Role</option>
                <option value="RESIDENT">Resident</option>
                <option value="STAFF">Staff</option>
                <option value="ADMIN">Admin</option>
              </select>

            </div>

            {formData.role === "STAFF" && (
              <div className="input-group">

                <label>🛠 Profession</label>

                <select
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Profession</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Cleaning">Cleaning</option>
                  <option value="Security">Security</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Parking">Parking</option>
                  <option value="Others">Others</option>
                </select>

              </div>
            )}

            <button
              type="submit"
              className="register-btn"
            >
              Create Account
            </button>

          </form>

          <div className="login-text">

            Already have an account?

            <Link to="/"> Login</Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;