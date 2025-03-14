import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import AOS from "aos";
import { motion } from "framer-motion";
import "aos/dist/aos.css";
import { FaSearch } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { db } from "../firebaseConfig"; 
import { collection, doc, getDoc } from "firebase/firestore";
import Logo from "../assets/logo.png";
import BannerImage from "../assets/BannerImage.png";
import Dish1 from "../assets/pulao-panner.jpg";
import Dish2 from "../assets/Special-thali.jpg";
import Dish3 from "../assets/Normal-thali.jpg";
import ParathaImg from "../assets/panner-paratha.webp";
import RiceImg from "../assets/pulao-panner.jpg";
import Beverages from "../assets/coffe.webp";
import dal from "../assets/dal.jpg";
import pannerspecial from "../assets/panner-special.jpg";
import TodayMenuImg from "../assets/Normal-thali.jpg"; 

import "../styles/Home.css";

function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
  }, []);

  const [selectedLocation, setSelectedLocation] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [todayMenu, setTodayMenu] = useState([]); 
  const [loading, setLoading] = useState(true);

  const today = new Date().toLocaleString("en-us", { weekday: "long" });

  useEffect(() => {
    const fetchTodayMenu = async () => {
      try {
        const todayMenuRef = doc(collection(db, "TodaysMenu"), today);
        const docSnap = await getDoc(todayMenuRef);
        if (docSnap.exists()) {
          setTodayMenu(docSnap.data().items || []); 
        } else {
          setTodayMenu([]); 
        }
      } catch (error) {
        console.error("Error fetching Today's Menu:", error);
        setTodayMenu([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchTodayMenu();
  }, []);

  const locations = [
    "Phagwara Locality, Phagwara",
    "8th Block",
    "28th Block",
    "26th Block",
    "29th Block",
    "30 Block",
    "32 Block",
  ];

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
    setSearchLocation("");
  };

  const handleSearchChange = (event) => {
    setSearchLocation(event.target.value);
    setSelectedLocation("");
  };

  const scrollCategories = (offset) => {
    document
      .getElementById("categoryScroll")
      .scrollBy({ left: offset, behavior: "smooth" });
  };

  const categories = [
    { name: "Paratha", img: ParathaImg },
    { name: "Rice", img: RiceImg },
    { name: "Beverages", img: Beverages },
    { name: "Dal", img: dal },
    { name: "Panner Special", img: pannerspecial },
    { name: "Today's Menu", img: TodayMenuImg },
  ];

  return (
    <div className="home">
      <Helmet>
        <meta
          name="description"
          content="Kitchen Ette offers wholesome meals, delivered straight to your door."
        />
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
          />
        </motion.div>

        <h1 data-aos="fade-right">
          When Flavours meet passion, Magic happens
        </h1>
        <h3 data-aos="fade-left">Come Join Us For A Magical Experience</h3>

        <div className="search-container">
          <FaLocationDot className="location-icon" />
          <select value={selectedLocation} onChange={handleLocationChange}>
            <option value="">Select location</option>
            {locations.map((loc, index) => (
              <option key={index} value={loc}>
                {loc}
              </option>
            ))}
          </select>

          <div className="divider"></div>

          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search for restaurant, cuisine or a dish"
            value={searchLocation}
            onChange={handleSearchChange}
          />
        </div>

        <Link to={selectedLocation || searchLocation ? "/menu" : "#"}>
          <button
            className="orderButton"
            data-aos="zoom-in"
            disabled={!selectedLocation && !searchLocation}
          >
            Order Now
          </button>
        </Link>
      </div>

     
      <section className="categoriesSection" data-aos="fade-up">
        <h2 className="sectionTitle">What's on your mind?</h2>

        <div className="categoriesContainer">
          <button className="scrollButton left" onClick={() => scrollCategories(-200)}>
            ←
          </button>

          <div className="categoriesList" id="categoryScroll">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={category.name === "Today's Menu" ? "/today-menu" : `/menu?category=${category.name}`}
              >
                <div className="categoryCard">
                  <img src={category.img} alt={category.name} className="categoryImage" />
                  <p>{category.name}</p>
                </div>
              </Link>
            ))}
          </div>

          <button className="scrollButton right" onClick={() => scrollCategories(200)}>
            →
          </button>
        </div>
      </section>

      
      
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

      