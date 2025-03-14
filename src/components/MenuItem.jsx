import React, { useState } from "react";
import "../styles/MenuItem.css"; // Ensure this file exists

function MenuItem({ image, name, price, description, addToCart }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div 
      className={`flip-card ${flipped ? "flipped" : ""}`} 
      onClick={() => setFlipped(!flipped)}
    >
      <div className="flip-card-inner">
        {/* Front Side */}
        <div className="flip-card-front">
          <img src={image} alt={name} />
          <h3>{name}</h3>
          <p>₹{price}</p>
        </div>

        {/* Back Side */}
        <div className="flip-card-back">
          <p>{description}</p>
          <button onClick={addToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default MenuItem;
