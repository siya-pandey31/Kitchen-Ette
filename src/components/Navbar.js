import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import ReorderIcon from "@mui/icons-material/Reorder";

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

        <Link to="/contact">Contact</Link>
      </div>

      <button onClick={toggleNavbar}>
        <ReorderIcon />
      </button>
    </div>
  );
}

export default Navbar;
