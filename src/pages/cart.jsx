import React from "react";
import "../styles/cart.css";

const Cart = ({ cartItems = [] }) => {
  if (!Array.isArray(cartItems)) {
    cartItems = [];
  }

  const itemTotal = cartItems.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 1),
    0
  );
  const deliveryFee = 12;
  const platformFee = 2;
  const gstCharges = 18;
  const totalPayable = itemTotal + deliveryFee + platformFee + gstCharges;

  
  const handlePayment = () => {
    const options = {
      key: "rzp_test_YourTestKeyHere", // Use your Razorpay Test Key
      amount: totalPayable * 100, // Convert to paise (smallest currency unit)
      currency: "INR",
      name: "Kitchen Ette",
      description: "Order Payment",
      image: "/logo192.png", // Change to your logo if needed
      handler: function (response) {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="bill-container">
      <h3>Bill Details</h3>
      <div className="bill-item">
        <span>Item Total</span>
        <span>₹{itemTotal}</span>
      </div>
      <div className="bill-item">
        <span>Delivery Fee | 0.4 kms</span>
        <span>₹{deliveryFee}</span>
      </div>
      <div className="bill-item tip">
        <span>Delivery Tip</span>
        <span className="add-tip">Add tip</span>
      </div>
      <div className="bill-item">
        <span>Platform fee</span>
        <span>
          <s style={{ color: "#888" }}>₹10.00</s> ₹{platformFee}
        </span>
      </div>
      <div className="bill-item">
        <span>GST and Restaurant Charges</span>
        <span>₹{gstCharges}</span>
      </div>
      <hr />
      <div className="bill-total">
        <strong>TO PAY</strong>
        <strong>₹{totalPayable}</strong>
      </div>

      {/* Pay Now Button */}
      <button className="pay-btn" onClick={handlePayment}>
        Pay Now
      </button>
    </div>
  );
};

export default Cart;
