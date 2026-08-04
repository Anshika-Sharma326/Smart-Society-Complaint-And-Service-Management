import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import "./Profile.css";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from "@mui/material";

function Profile() {

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [openEdit, setOpenEdit] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);

  const [editData, setEditData] = useState({
    name: "",
    phone: "",
  });

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {

    try {

      const email = localStorage.getItem("userEmail");

      const response = await api.get(
        `/users/profile/${email}`
      );

      setUser(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleClose = () => {

    setOpenEdit(false);

  };

  const handleEditChange = (e) => {

    setEditData({

      ...editData,

      [e.target.name]: e.target.value,

    });

  };

  const handleSave = async () => {

    try {

      const userId =
        localStorage.getItem("userId");

      await api.put(
        `/users/${userId}`,
        {

          name: editData.name,

          phone: editData.phone,

        }
      );

      alert("Profile Updated Successfully");

      loadProfile();

      setOpenEdit(false);

    } catch (error) {

      console.log(error);

      alert("Unable to update profile");

    }

  };

  const handleChangePassword = async () => {

    if (newPassword !== confirmPassword) {

      alert(
        "New Password and Confirm Password do not match"
      );

      return;

    }

    try {

      const userId =
        localStorage.getItem("userId");

      const response = await api.put(

        `/users/change-password/${userId}`,

        {

          oldPassword,

          newPassword,

        }

      );

      alert(response.data);

      setOldPassword("");

      setNewPassword("");

      setConfirmPassword("");

      setOpenPassword(false);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data ||
        "Unable to change password"
      );

    }

  };

  return (

    <Layout>

      <div className="profile-container">

        <div className="profile-card">

          <div className="profile-title">

            <h1>My Profile</h1>

            <p>
              Manage your personal information
            </p>

          </div>

          <div className="profile-header">

            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Profile"
            />

            <h2>{user.name}</h2>

            <span>
              {user.role} • Smart Society
            </span>

          </div>

          <div className="section-title">

            Personal Information

          </div>

          <div className="profile-details">

            <div className="detail">

              <label>
                👤 Full Name
              </label>

              <input
                type="text"
                value={user.name}
                readOnly
              />

            </div>

            <div className="detail">

              <label>
                📧 Email Address
              </label>

              <input
                type="email"
                value={user.email}
                readOnly
              />

            </div>

            <div className="detail">

              <label>
                📱 Phone Number
              </label>

              <input
                type="text"
                value={user.phone}
                readOnly
              />

            </div>

            <div className="detail">

              <label>
                👥 Role
              </label>

              <input
                type="text"
                value={user.role}
                readOnly
              />

            </div>

          </div>
                    {/* ===========================
              Security Section
          =========================== */}

          <div className="security-section">

            <div className="section-title">
              🛡 Security
            </div>

            <div className="security-wrapper">

              {/* Left Card */}

              <div className="password-card">

                <div className="password-icon">
                  🔒
                </div>

                <h3>Password</h3>

                <p>
                  Your password is securely encrypted
                  and cannot be viewed.
                </p>

              </div>

              {/* Divider */}

              <div className="security-divider"></div>

              {/* Right Card */}

              <div className="security-info-card">

                <h3>
                  Keep Your Account Secure
                </h3>

                <p>
                  We strongly recommend using a strong
                  password and updating it regularly
                  to keep your Smart Society account
                  safe and protected.
                </p>

                <button
                  className="password-btn"
                  onClick={() => setOpenPassword(true)}
                >
                  🔒 Change Password
                </button>

              </div>

            </div>

          </div>


          {/* ===========================
                Manage Profile
          =========================== */}

          <div className="manage-card">

            <div className="manage-content">

              <h3>
                Manage Your Profile
              </h3>

              <p>
                Update your personal information,
                phone number and account details to
                keep your profile up to date.
              </p>

            </div>

            <button
              className="edit-btn"
              onClick={() => {

                setEditData({
                  name: user.name,
                  phone: user.phone,
                });

                setOpenEdit(true);

              }}
            >
              ✏ Edit Profile
            </button>

          </div>
                {/* ==========================================
          Edit Profile Dialog
      ========================================== */}

      <Dialog
        open={openEdit}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontSize: "30px",
            fontWeight: "700",
            color: "#0F172A"
          }}
        >
          ✏ Edit Profile
        </DialogTitle>

        <DialogContent>

          <TextField
            fullWidth
            margin="normal"
            label="Full Name"
            name="name"
            value={editData.name}
            onChange={handleEditChange}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Email Address"
            value={user.email}
            InputProps={{
              readOnly: true
            }}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Phone Number"
            name="phone"
            value={editData.phone}
            onChange={handleEditChange}
          />

        </DialogContent>

        <DialogActions
          sx={{
            padding: "20px 24px"
          }}
        >

          <Button
            variant="outlined"
            onClick={handleClose}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSave}
          >
            Save Changes
          </Button>

        </DialogActions>

      </Dialog>


      {/* ==========================================
          Change Password Dialog
      ========================================== */}

      <Dialog
        open={openPassword}
        onClose={() => setOpenPassword(false)}
        fullWidth
        maxWidth="sm"
      >

        <DialogTitle
          sx={{
            textAlign: "center",
            fontSize: "30px",
            fontWeight: "700",
            color: "#0F172A"
          }}
        >
          🔒 Change Password
        </DialogTitle>

        <DialogContent>

          <TextField
            fullWidth
            margin="normal"
            label="Current Password"
            type="password"
            value={oldPassword}
            onChange={(e) =>
              setOldPassword(e.target.value)
            }
          />

          <TextField
            fullWidth
            margin="normal"
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
          />

          <TextField
            fullWidth
            margin="normal"
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
          />

        </DialogContent>

        <DialogActions
          sx={{
            padding: "20px 24px"
          }}
        >

          <Button
            variant="outlined"
            onClick={() =>
              setOpenPassword(false)
            }
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleChangePassword}
          >
            Update Password
          </Button>

        </DialogActions>

      </Dialog>
      </div>
      </div>
          </Layout>
  );
}

export default Profile;