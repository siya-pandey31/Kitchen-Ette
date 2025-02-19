import React, { useState } from 'react';
import { Link } from "react-router-dom";
import BannerImage from '../assets/BannerImage.png';
import "../styles/Home.css"; // Import CSS for styling

function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className="home">
      <head>
        <meta name="description" content="Kitchen Ette offers wholesome meals, delivered straight to your door." />
        <meta property="og:title" content="Kitchen Ette" />
        <meta property="og:description" content="A Wholesome Meal Delivered" />
        <meta property="og:image" content={BannerImage} />
        <meta property="og:url" content="https://www.kitchenette.com" />
      </head>

      <div className="headerContainer">
        {!isLoaded && <div className="loading-placeholder">Loading...</div>}
        
        <img
          src={BannerImage}
          alt="Kitchen Ette Banner"
          className="bannerImage"
          onLoad={handleImageLoad}
        />
        
        <h1>Kitchen Ette</h1>
        <p>A Wholesome Meal </p>
        <h1>When Falvours meet passion, Magic happens </h1>
        <h3>Come Join Us For A Magical Experience</h3>
        
        <Link to="/menu">
          <button className="orderButton">Order Now</button>
        </Link>
      </div>

      <section className="aboutSection">
        <h2>About Us</h2>
        <p>
          At Kitchen Ette, we offer a variety of fresh, healthy meals prepared with love. 
          Whether you're craving a hearty dish or something light, we have something for everyone.
        </p>
      </section>

      <footer className="footerContainer">
        <p>&copy; 2025 Kitchen Ette | All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default Home;
