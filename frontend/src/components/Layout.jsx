import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({ children }) {

  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        background: "#F5F7FB",
        minHeight: "100vh",
      }}
    >

      <Navbar 
        open={open}
        setOpen={setOpen}
      />

      <Sidebar
        open={open}
        setOpen={setOpen}
      />


      <main
        style={{
          flex: 1,
          marginLeft: open ? "260px" : "0px",
          transition: "0.3s ease",
          padding: "20px",
          marginTop: "72px"
        }}
      >
        {children}
      </main>

    </div>
  );
}

export default Layout;