const loadRazorpay = async () => {
  const res = await fetch("/createOrder", { method: "POST" }); // You need a backend route
  const { order } = await res.json();

  const options = {
    key: "IpQpyvOqrKOBwL",
    amount: order.amount,
    currency: "INR",
    name: "Kitchen Ette",
    order_id: order.id,
    handler: async function (response) {
      // Send response.razorpay_payment_id, order_id, and signature to backend
      const verifyRes = await fetch("/verifyPayment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(response),
      });

      const result = await verifyRes.json();
      if (result.status === "success") {
        alert("Payment Verified!");
      } else {
        alert("Payment verification failed!");
      }
    },
    prefill: {
      name: "Customer",
      email: "email@example.com",
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};
