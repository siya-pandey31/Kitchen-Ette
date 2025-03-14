import React from 'react';

const PaymentPage = () => {
  const loadRazorpay = () => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      const options = {
        key: 'YOUR_RAZORPAY_KEY', // ✅ Replace with your Razorpay Key
        amount: 50000, // ₹500 (in paise)
        currency: 'INR',
        name: 'Kitchen Ette',
        description: 'Order Payment',
        image: '/logo.png', // ✅ Update with your logo path
        handler: function (response) {
          alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#3399cc',
        },
      };
      const payment = new window.Razorpay(options);
      payment.open();
    };
    document.body.appendChild(script);
  };

  return (
    <div className="payment-container">
      <h2>Complete Your Payment</h2>
      <button className="pay-button" onClick={loadRazorpay}>Proceed to Pay</button>
    </div>
  );
};

export default PaymentPage;
