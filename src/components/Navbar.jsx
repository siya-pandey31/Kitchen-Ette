import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReorderIcon from "@mui/icons-material/Reorder";
import Logo from "../assets/logo.png";
import "../styles/Navbar.css";

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={Logo} alt="Logo" className="logo" />
      </div>

      <div className={`navbar-right ${openLinks ? "open" : ""}`}>
        <Link to="/">Home</Link>
        <Link to="/beverage">Beverage</Link>

        <div
          className="menu-dropdown"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <Link to="/menu" className="menu-link">Menu</Link>
          {isDropdownOpen && (
            <ul className="dropdown-menu">
              <li><Link to="/menu/breakfast">Breakfast</Link></li>
              <li><Link to="/menu/lunch">Lunch</Link></li>
              <li><Link to="/menu/dinner">Dinner</Link></li>
              <li><Link to="/menu/paratha">Paratha's</Link></li>
              <li><Link to="/menu/thali">Thali</Link></li>
              <li><Link to="/menu/rice">Rice Combo</Link></li>
              <li><Link to="/menu/bowl">Bowl</Link></li>
              <li><Link to="/menu/hot-cold">Hot & Cold</Link></li>
            </ul>
          )}
        </div>

        <Link to="/admin" className="admin-link">Admin</Link>
      </div>

      <button className="toggle-button" onClick={toggleNavbar}>
        <ReorderIcon />
      </button>
    </nav>
  );
}

export default Navbar;
