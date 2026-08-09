import "./Navbar.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import Badge from "@mui/material/Badge";
import api from "../services/api";

function Navbar({ open, setOpen }) {

  const navigate = useNavigate();

  const [notificationCount, setNotificationCount] = useState(0);

  const userName = localStorage.getItem("userName") || "User";

  // Load notification count
  const loadNotificationCount = async () => {
    try {
      const response = await api.get("/notifications");

      // Currently every notification in the database
      // is treated as unread.
      setNotificationCount(response.data.length);

    } catch (error) {
      console.error("Error loading notifications:", error);
    }
  };

  useEffect(() => {

    loadNotificationCount();

    // Check for new notifications every 3 seconds
    const interval = setInterval(() => {
      loadNotificationCount();
    }, 3000);

    return () => clearInterval(interval);

  }, []);

  return (

    <nav className="navbar">

      <MenuIcon
        className="menu-btn"
        onClick={() => setOpen(!open)}
      />

      <div className="navbar-left">

        <h2>
          Smart Society Portal
        </h2>

      </div>

      <div className="navbar-right">

        <Badge
          badgeContent={notificationCount}
          color="error"
          max={99}
          showZero={false}
          overlap="circular"
        >

          <NotificationsOutlinedIcon
            className="nav-icon"
            onClick={() => navigate("/notifications")}
          />

        </Badge>

        <SettingsOutlinedIcon
          className="nav-icon"
          onClick={() => navigate("/profile")}
        />

        <div className="user-info">
          👤 {userName}
        </div>

      </div>

    </nav>

  );
}

export default Navbar;