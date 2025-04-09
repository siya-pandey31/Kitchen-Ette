import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersRef = collection(db, "Orders");
        const snapshot = await getDocs(ordersRef);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(data);
      } catch (error) {
        console.error("❌ Firebase error:", error.message);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>All Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <strong>{order.customerName}</strong> ordered: {order.item} <br />
            Status: {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
