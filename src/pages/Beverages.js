import React, { useState } from "react";
import "../styles/Beverages.css";
import { BeveragesList } from "../helpers/BeveragesList"; 
import BeveragesItem from "../components/BeveragesItem"; 

function Beverages() {
  const [showMore, setShowMore] = useState(false);
  const [cart, setCart] = useState({});

  
  const visibleItems = showMore ? BeveragesList : BeveragesList.slice(0, 4);

  
  const addToCart = (item) => {
    setCart((prevCart) => ({
      ...prevCart,
      [item.name]: prevCart[item.name]
        ? { ...prevCart[item.name], quantity: prevCart[item.name].quantity + 1 }
        : { ...item, quantity: 1 },
    }));
  };


  const increaseQuantity = (name) => {
    setCart((prevCart) => ({
      ...prevCart,
      [name]: { ...prevCart[name], quantity: prevCart[name].quantity + 1 },
    }));
  };

  
  const decreaseQuantity = (name) => {
    setCart((prevCart) => {
      if (prevCart[name].quantity === 1) {
        const newCart = { ...prevCart };
        delete newCart[name];
        return newCart;
      }
      return {
        ...prevCart,
        [name]: { ...prevCart[name], quantity: prevCart[name].quantity - 1 },
      };
    });
  };

  return (
    <div className="Beverages">
      <h1 className="BeveragesTitle">Hot & Cold</h1>

      
      <div className="BeveragesList">
        {visibleItems.map((beverageItem, key) => (
          <BeveragesItem 
            key={key}
            image={beverageItem.image}
            name={beverageItem.name} 
            price={beverageItem.price}
            description={beverageItem.description}
            addToCart={() => addToCart(beverageItem)}
          />
        ))}
      </div>

      
      {BeveragesList.length > 4 && (
        <button className="toggleButton" onClick={() => setShowMore(!showMore)}>
          {showMore ? "Show Less" : "Show More"}
        </button>
      )}

      
      <div className="cart">
        <h2>Cart</h2>
        {Object.keys(cart).length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <ul>
            {Object.values(cart).map((item, index) => (
              <li key={index}>
                {item.name} - ${item.price} x {item.quantity}
                <button className="cartButton" onClick={() => increaseQuantity(item.name)}>+</button>
                <button className="cartButton" onClick={() => decreaseQuantity(item.name)}>-</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Beverages;
