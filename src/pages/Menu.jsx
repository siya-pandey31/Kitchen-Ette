import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import "../styles/Menu.css"; 

import aaloParathaImg from "../assets/aalo-paratha.jpg";
import pannerParathaImg from "../assets/panner-paratha.webp";
import gobiParathaImg from "../assets/gobi.jpg";
import mixVegParathaImg from "../assets/mix-veg-paratha.jpg";
import butterRotiImg from "../assets/butter-roti.jpg";
import mooliParatha from "../assets/mooli-paratha.jpg"
import onionParatha from "../assets/onion-paratha.webp";
import plainParatha from "../assets/pulao-panner.jpg";
import lacchaParatha from "../assets/Laccha-Paratha.jpg"
import Briyani from "../assets/Paneer-rice.jpg"
import Pulao from "../assets/pulao-panner.jpg";
import Rajma from "../assets/rajma-chawal-1.jpg";
import DalChawal from "../assets/dal-chawal.jpg";
import ColdCoffe from "../assets/cold-coffee.jpg";
import Lassi from "../assets/sweet-lasi.jpeg";
import Chai from "../assets/Masala-Chai.jpg"


const hardcodedMenu = [
  { id: 1, name: "Aloo Paratha", price: 60, category: "Paratha", img: aaloParathaImg, rating: 4.5, stock: true },
  { id: 2, name: "Paneer Paratha", price: 60, category: "Paratha", img: pannerParathaImg, rating: 4.3, stock: true },
  { id: 3, name: "Gobi Paratha", price: 40, category: "Paratha", img: gobiParathaImg, rating: 4.2, stock: true },
  { id: 4, name: "Mix Veg Paratha", price: 50, category: "Paratha", img: mixVegParathaImg, rating: 4.0, stock: true },
  { id: 5, name: "Mooli Paratha", price: 50, category: "Paratha", img: mooliParatha, rating: 4.0, stock: true },
  { id: 6, name: "Butter roti", price: 10, category: "Paratha", img: butterRotiImg, rating: 4.0, stock: true },
  { id: 7, name: "Onion Paratha", price: 50, category: "Paratha", img: onionParatha, rating: 4.0, stock: true },
  { id: 8, name: "Plain Paratha", price: 30, category: "Paratha", img: plainParatha, rating: 4.0, stock: true },
  { id: 9, name: "Laccha Paratha", price: 50, category: "Paratha", img: lacchaParatha, rating: 4.0, stock: true },
  { id: 10, name: "Biryani", price: 50, category: "rice", img: Briyani, rating: 4.0, stock: true },
  { id:11, name:"Pulao Panner", price: 70, category:"rice", img:Pulao, rating: 4.5, stock:true},
  { id:12, name:"Rajma Chawal", price: 60, category:"rice", img:Rajma, rating: 4.5, stock:true},
  { id:13, name:"Dal Chawal", price: 60, category:"rice", img:DalChawal, rating: 4.5, stock:true},
  { id:11, name:"Cold Coffee", price: 30, category:"Beverages", img:ColdCoffe, rating: 4.5, stock:true},
  { id:11, name:"Sweet Lassi", price: 30, category:"Beverages", img:Lassi, rating: 4.5, stock:true},
  { id:11, name:"Chai", price: 60, category:"Beverages", img:Chai, rating: 4.5, stock:true},

];

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const Menu = () => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  
  const selectedCategory = searchParams.get("category") || "";
  const searchQuery = searchParams.get("search") || "";

  const [todaysMenu, setTodaysMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  const today = new Date();
  const currentDay = daysOfWeek[today.getDay()];

  useEffect(() => {
    console.log("Selected Category from URL:", selectedCategory);

    const fetchMenuForToday = async () => {
      setLoading(true);
      try {
        const menuRef = doc(db, "TodaysMenu", currentDay);
        const menuSnap = await getDoc(menuRef);

        if (menuSnap.exists()) {
          const firebaseMenu = menuSnap.data()?.Items || [];

          const formattedMenu = firebaseMenu.map((item, index) => ({
            id: item.Id || index + 100, 
            name: item.Name || "Unknown Item",
            price: item.price || 0,
            category: item.category ? item.category.toLowerCase() : "custom",
            img: item.img || butterRotiImg,
            rating: item.rating || 4.0,
            stock: item.stock !== undefined ? item.stock : true,
          }));

          console.log("Fetched Firebase Menu:", formattedMenu);
          setTodaysMenu(formattedMenu);
        } else {
          console.log("No Firebase menu found for today.");
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

  // Merge Firebase and Hardcoded Menu
  const combinedMenu = [...hardcodedMenu, ...todaysMenu];
  console.log("Combined Menu Before Filtering:", combinedMenu);

  // Filtering logic
  const filteredMenu = combinedMenu.filter((item) => {
    const itemCategory = item.category.toLowerCase();
    const selectedCategoryLower = selectedCategory.toLowerCase();

    console.log(`Checking item: ${item.name}, Category: ${itemCategory}`);

    // Ensure all Paratha items are included when "paratha" is selected
    if (selectedCategoryLower === "Paratha") {
      return itemCategory.includes("Paratha");
    }

    const matchesCategory = !selectedCategory || itemCategory === selectedCategoryLower;
    const matchesSearch = !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  console.log("Filtered Menu:", filteredMenu);

  return (
    <div className="menu-container">
      <h2 className="menu-title">
        {selectedCategory ? `${selectedCategory} Items` : `Menu`}
      </h2>
      <div className="menu-list">
        {loading ? (
          <p>Loading menu...</p>
        ) : filteredMenu.length === 0 ? (
          <p>No menu available for today.</p>
        ) : (
          filteredMenu.map((item) => (
            <div key={item.id} className="menu-card">
              <div className="menu-info">
                <img src={item.img} alt={item.name} className="menu-image" />
                <h3>{item.name}</h3>
                <p>Price: ₹{item.price}</p>
                <p>⭐ {item.rating.toFixed(1)} / 5</p>

                {item.stock ? (
                  <>
                    {cartItems[item.id]?.quantity ? (
                      <div className="quantity-selector">
                        <button className="qty-btn" onClick={() => removeFromCart(item.id)}>-</button>
                        <span className="quantity-display">{cartItems[item.id]?.quantity || 0}</span>
                        <button className="qty-btn" onClick={() => addToCart(item)}>+</button>
                      </div>
                    ) : (
                      <button className="add-to-cart-btn" onClick={() => addToCart(item)}>
                        🛒 Add to Cart
                      </button>
                    )}
                  </>
                ) : (
                  <p className="out-of-stock">Out of Stock</p>
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
