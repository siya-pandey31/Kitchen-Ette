import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "../styles/Footer.css"; // Import CSS file

function Footer() {
  return (
    <footer className="footer">
      <div className="socialMedia">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <InstagramIcon />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <TwitterIcon />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FacebookIcon />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <LinkedInIcon />
        </a>
      </div>
      <p>© 2025 KitchenEtte.com | All Rights Reserved</p>
    </footer>
  );
}

export default Footer;
