import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Make sure to import useNavigate
import { CartContext } from "../context/CartContext"; // Make sure this is correctly imported
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Ensure this is correctly imported
import "../styles/Menu.css";

import aaloParathaImg from "../assets/aalo-paratha.jpg";
import pannerParathaImg from "../assets/panner-paratha.webp";
import gobiParathaImg from "../assets/gobi.jpg";
import mixVegParathaImg from "../assets/mix-veg-paratha.jpg";
import butterRotiImg from "../assets/butter-roti.jpg";
import plainParathaImg from "../assets/plain-paratha.jpg";
import lacchaParathaImg from "../assets/Laccha-Paratha.jpg";
import mooliParathaImg from "../assets/mooli-paratha.jpg";
import onionParathaImg from "../assets/onion-paratha.webp";
import dalChawalImg from "../assets/dal-chawal.jpg";
import rajmaChawalImg from "../assets/rajma-chawal-1.jpg";
import paneerRiceImg from "../assets/Paneer-rice.jpg";
import pulaoPannerImg from "../assets/pulao-panner.jpg";

// Hardcoded menu with imported images
const hardcodedMenu = [
  { id: 1, name: "Aloo Paratha", price: 60, category: "Paratha", img: aaloParathaImg },
  { id: 2, name: "Paneer Paratha", price: 60, category: "Paratha", img: pannerParathaImg },
  { id: 3, name: "Gobi Paratha", price: 40, category: "Paratha", img: gobiParathaImg },
  { id: 4, name: "Mix Veg Paratha", price: 50, category: "Paratha", img: mixVegParathaImg },
  { id: 5, name: "Butter Roti", price: 10, category: "Paratha", img: butterRotiImg },
  { id: 6, name: "Plain Paratha", price: 10, category: "Paratha", img: plainParathaImg },
  { id: 7, name: "Laccha Paratha", price: 40, category: "Paratha", img: lacchaParathaImg },
  { id: 8, name: "Mooli Paratha", price: 40, category: "Paratha", img: mooliParathaImg },
  { id: 9, name: "Onion Paratha", price: 40, category: "Paratha", img: onionParathaImg },
  { id: 10, name: "Dal Chawal", price: 70, category: "Rice", img: dalChawalImg },
  { id: 11, name: "Rajma Chawal", price: 70, category: "Rice", img: rajmaChawalImg },
  { id: 12, name: "Paneer Rice", price: 80, category: "Rice", img: paneerRiceImg },
  { id: 13, name: "Paneer Bhurji", price: 50, category: "Rice", img: pulaoPannerImg },
];


const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const Menu = () => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedCategory = searchParams.get("category");

  const [todaysMenu, setTodaysMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  const today = new Date();
  const currentDay = daysOfWeek[today.getDay()];

  const navigate = useNavigate();  // Initialize navigate here

  useEffect(() => {
    const fetchMenuForToday = async () => {
      setLoading(true);
      try {
        const menuRef = doc(db, "TodaysMenu", currentDay);
        const menuSnap = await getDoc(menuRef);

        if (menuSnap.exists()) {
          const menuData = menuSnap.data();
          setTodaysMenu(menuData?.Items || []);
        } else {
          setTodaysMenu([]);
        }
      } catch (error) {
        console.error("Error fetching menu:", error);
        setTodaysMenu([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuForToday();
  }, [currentDay]);

  // Combine hardcoded menu with today's menu
  const combinedMenu = [...hardcodedMenu, ...todaysMenu];

  return (
    <div className="menu-container">
      <h2 className="menu-title">
        {selectedCategory ? `${selectedCategory} Items` : `Menu`}
      </h2>
      <div className="menu-list">
        {loading ? (
          <p>Loading menu...</p>
        ) : combinedMenu.length === 0 ? (
          <p>No menu available for today.</p>
        ) : (
          combinedMenu
            .filter(item => !selectedCategory || item.category === selectedCategory)
            .map((item) => (
              <div key={item.id} className="menu-card">
                <div className="menu-info">
                  <img src={item.img} alt={item.name} className="menu-image" />
                  <h3>{item.name}</h3>
                  <p>Price: ₹{item.price}</p>
                  {cartItems[item.id]?.quantity ? (
                    <div className="quantity-selector">
                      <button className="qty-btn" onClick={() => removeFromCart(item.id)}>-</button>
                      <span>{cartItems[item.id]?.quantity || 0}</span>
                      <button className="qty-btn" onClick={() => addToCart(item)}>+</button>
                    </div>
                  ) : (
                    <button className="menu-add-button" onClick={() => addToCart(item)}>ADD</button>
                  )}
                </div>
              </div>
            ))
        )}
      </div>

      {Object.keys(cartItems).length > 0 && (
        <div className="cart-bar">
          <div className="cart-info">
            <strong>
              {Object.values(cartItems).reduce((acc, item) => acc + (item.quantity || 0), 0)} items in Cart
            </strong>
            <button className="cart-button" onClick={() => navigate("/cart")}>
              VIEW CART 🛒
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;

