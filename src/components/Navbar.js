import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import ReorderIcon from "@mui/icons-material/Reorder";

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };

  return (
    <div className="navbar">
      <div className="leftside">
        <img src={Logo} alt="Logo" />
      </div>
      <div className={`rightside ${openLinks ? "open" : ""}`}>
        <Link to="/">Home</Link>
        <Link to="/beverage">Beverage</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <button onClick={toggleNavbar}>
        <ReorderIcon />
      </button>
    </div>
  );
}

export default Navbar;
