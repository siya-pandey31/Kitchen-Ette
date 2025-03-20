import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import AOS from "aos";
import { motion } from "framer-motion";
import { db } from "../firebaseConfig"; 
import { doc, getDoc } from "firebase/firestore";
import Dish1 from "../assets/pulao-panner.jpg"; 
import Dish2 from "../assets/Special-thali.jpg";
import Dish3 from "../assets/Normal-thali.jpg";
import BannerVideo from "../assets/Kitchen-Ette.mp4";
import ParathaImg from "../assets/panner-paratha.webp";
import RiceImg from "../assets/pulao-panner.jpg";
import Beverages from "../assets/coffe.webp";
import DalImg from "../assets/dal.jpg";
import PannerSpecial from "../assets/panner-special.jpg";
import TodayMenuImg from "../assets/Normal-thali.jpg"; 

import "../styles/Home.css";

function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
  }, []);

  const [todayMenu, setTodayMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const today = new Date().toLocaleString("en-us", { weekday: "long" });

  useEffect(() => {
    const fetchTodayMenu = async () => {
      try {
        const todayMenuRef = doc(db, "TodaysMenu", today);
        const docSnap = await getDoc(todayMenuRef);

        if (docSnap.exists()) {
          setTodayMenu(docSnap.data().items || []);
        } else {
          setTodayMenu([]);
        }
      } catch (error) {
        console.error("Error fetching Today's Menu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodayMenu();
  }, []);

  const categories = [
    { name: "Paratha", img: ParathaImg },
    { name: "Rice", img: RiceImg },
    { name: "Beverages", img: Beverages },
    { name: "Dal", img: DalImg },
    { name: "Panner Special", img: PannerSpecial },
    { name: "Today's Menu", img: TodayMenuImg },
  ];

  return (
    <div className="home">
      <Helmet>
        <title>Kitchen Ette - Home</title>
      </Helmet>

      {/* Hero Section with Video Banner */}
      <div className="headerContainer" data-aos="fade-right">
        <video autoPlay loop muted playsInline className="bannerVideo">
          <source src={BannerVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <h1 data-aos="fade-right">When Flavours Meet Passion, Magic Happens</h1>
        <h3 data-aos="fade-left">Come Join Us For A Magical Experience</h3>

        <Link to="/today-menu">
          <motion.button className="orderButton" data-aos="zoom-in">
            View Today's Menu
          </motion.button>
        </Link>
      </div>

      {/* Categories Section */}
      <section className="categoriesSection" data-aos="fade-up">
        <h2 className="sectionTitle">What's on your mind?</h2>

        <div className="categoriesContainer">
          {categories.map((category, index) => (
            <Link
            key={index}
            to={category.name === "Today's Menu" ? "/today-menu" : '/menu?category=${category.name}`'}
          >
          
              <div className="categoryCard">
                <img src={category.img} alt={category.name} className="categoryImage" loading="lazy" />
                <p>{category.name}</p>
              </div>
            </Link>
          ))}
        </div>
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


      {/* Footer */}
      <footer className="footerContainer" data-aos="fade-up">
        <p>&copy; 2025 Kitchen Ette | All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default Home;