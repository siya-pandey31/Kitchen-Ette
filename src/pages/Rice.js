import React, { useState } from "react";
import { RiceLists } from "../helpers/RiceLists";
import MenuItem from "../components/MenuItem";
import "../styles/Menu.css";

function Rice() {
  const [showMore, setShowMore] = useState(false);
  const [cart, setCart] = useState({});

  const visibleItems = showMore ? RiceLists : RiceLists.slice(0, 4);

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
    <div className="menu">
      <h1 className="menuTitle">Rice Combo</h1>
      <div className="menuList">
        {visibleItems.map((menuItem, key) => (
          <MenuItem
            key={key}
            image={menuItem.image}
            name={menuItem.name}
            price={menuItem.price}
            description={menuItem.description}
            addToCart={() => addToCart(menuItem)}
          />
        ))}
      </div>

      {RiceLists.length > 4 && (
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
                {item.name} - ₹{item.price} x {item.quantity}
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

export default Rice;
