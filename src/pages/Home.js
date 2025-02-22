import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import AOS from "aos";
import { motion } from "framer-motion"; 
import "aos/dist/aos.css";
import BannerImage from "../assets/BannerImage.png";
import Dish1 from "../assets/veg pulao panner.jpg"; 
import Dish2 from "../assets/Special thali.jpg";
import Dish3 from "../assets/Normal thali.jpg";
import "../styles/Home.css";

function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
  }, []);

  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className="home">
      <Helmet>
        <meta name="description" content="Kitchen Ette offers wholesome meals, delivered straight to your door." />
        <meta property="og:title" content="Kitchen Ette" />
        <meta property="og:description" content="A Wholesome Meal Delivered" />
        <meta property="og:image" content={BannerImage} />
        <meta property="og:url" content="https://www.kitchenette.com" />
      </Helmet>

      <div className="headerContainer" data-aos="fade-right">
       
        <motion.div
          className="bannerWrapper"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={BannerImage}
            alt="Kitchen Ette Banner"
            className="bannerImage"
            onLoad={handleImageLoad}
          />
        </motion.div>

        <h1 data-aos="fade-right">When Flavours meet passion, Magic happens</h1>
        <h3 data-aos="fade-left">Come Join Us For A Magical Experience</h3>

        <Link to="/menu">
          <button className="orderButton" data-aos="zoom-in">Order Now</button>
        </Link>
      </div>

      <section className="aboutSection" data-aos="fade-up">
        <h2>About Us</h2>
        <p>
          At <strong>Kitchen Ette</strong>, we believe in serving <strong>delicious, healthy, and comforting meals</strong> 
          that bring people together. Our chefs use <strong>fresh, high-quality ingredients</strong> to create flavors that 
          remind you of home while adding a unique twist.
        </p>
        <p>
          We are committed to <strong>sustainability and locally sourced ingredients</strong>, ensuring that each dish not 
          only tastes amazing but is also good for the environment.
        </p>
      </section>

    
      <section className="specialitySection">
        <h3 className="restaurantName" data-aos="fade-down">India Restaurant</h3>
        <h1 className="mainTitle" data-aos="fade-right">Our Speciality</h1>
        <div className="divider" data-aos="zoom-in"></div>
        <p className="subText" data-aos="fade-up">
          We provide a wide range of cuisines and dishes to choose from so that every foodie in town has their best experience with us.
        </p>

        <div className="imageGrid">
          <div className="imageContainer" data-aos="flip-left">
            <img src={Dish1} alt="Dish 1" className="dishImage"/>
          </div>
          <div className="imageContainer" data-aos="flip-up">
            <img src={Dish2} alt="Dish 2" className="dishImage"/>
          </div>
          <div className="imageContainer" data-aos="flip-right">
            <img src={Dish3} alt="Dish 3" className="dishImage"/>
          </div>
        </div>
      </section>

      <section className="testimonialsSection" data-aos="fade-in">
        <h2>What Our Customers Say</h2>
        <blockquote data-aos="fade-right">
          "Kitchen Ette never disappoints! The food is always fresh, delicious, and beautifully presented. 
          Highly recommend for their signature Paratha's!" – <em>Siya Pandey.</em>
        </blockquote>
        <blockquote data-aos="fade-left">
          "The best place to grab a wholesome meal! Friendly staff, cozy atmosphere, and mouth-watering dishes." 
          – <em>Nawaz Ahmed</em>
        </blockquote>
      </section>

      <footer className="footerContainer" data-aos="fade-up">
        <div className="footerLinks">
          <Link to="/">Home</Link> | 
          <Link to="/menu"> Menu</Link> | 
          <Link to="/contact"> Contact</Link> | 
          <Link to="/privacy"> Privacy Policy</Link>
        </div>
        <p>&copy; 2025 Kitchen Ette | All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default Home;
