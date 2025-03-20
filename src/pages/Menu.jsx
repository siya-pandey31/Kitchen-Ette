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


const hardcodedMenu = [
  { id: 1, name: "Aloo Paratha", price: 60, category: "Paratha", img: aaloParathaImg, rating: 4.5, stock: true },
  { id: 2, name: "Paneer Paratha", price: 60, category: "Paratha", img: pannerParathaImg, rating: 4.3, stock: true },
  { id: 3, name: "Gobi Paratha", price: 40, category: "Paratha", img: gobiParathaImg, rating: 4.2, stock: true },
  { id: 4, name: "Mix Veg Paratha", price: 50, category: "Paratha", img: mixVegParathaImg, rating: 4.0, stock: true },
];

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const Menu = () => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const selectedCategory = searchParams.get("category");
  const searchQuery = searchParams.get("search");

  const [todaysMenu, setTodaysMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  const today = new Date();
  const currentDay = daysOfWeek[today.getDay()];

  useEffect(() => {
    const fetchMenuForToday = async () => {
      setLoading(true);
      try {
        const menuRef = doc(db, "TodaysMenu", currentDay);
        const menuSnap = await getDoc(menuRef);

        if (menuSnap.exists()) {
          const firebaseMenu = menuSnap.data()?.Items || [];
          
         
          const formattedMenu = firebaseMenu.map((item, index) => ({
            id: item.Id || index + 1,
            name: item.Name || "Unknown Item",
            price: item.price || 0,
            category: "Custom", 
            img: butterRotiImg, 
            rating: 4.0, 
            stock: true, 
          }));

          setTodaysMenu(formattedMenu);
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

  // Merge Firebase and Hardcoded Menu
  const combinedMenu = [...hardcodedMenu, ...todaysMenu];

  // Filter Menu Based on Category & Search
  const filteredMenu = combinedMenu.filter((item) => {
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    const matchesSearch = !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
