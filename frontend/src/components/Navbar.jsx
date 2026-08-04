import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MenuIcon from "@mui/icons-material/Menu";

function Navbar({open, setOpen}) {

  const navigate = useNavigate();

  const userName = localStorage.getItem("userName") || "User";


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


        <NotificationsOutlinedIcon
          className="nav-icon"
          onClick={()=>navigate("/notifications")}
        />


        <SettingsOutlinedIcon
          className="nav-icon"
          onClick={()=>navigate("/profile")}
        />


        <div className="user-info">

          👤 {userName}

        </div>


      </div>


    </nav>

  );
}

export default Navbar;