import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const totalAmount = Object.values(cartItems).reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {Object.values(cartItems).length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <>
          {Object.values(cartItems).map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} width="50" />
              <h4>{item.name}</h4>
              <p>₹{item.price}</p>
              <div className="quantity-controls">
                <button onClick={() => removeFromCart(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => addToCart(item)}>+</button>
              </div>
            </div>
          ))}
          <h3>Total: ₹{totalAmount}</h3>
          <button onClick={() => navigate("/payment")}>Proceed to Pay</button>
        </>
      )}
    </div>
  );
};

export default CartPage;
