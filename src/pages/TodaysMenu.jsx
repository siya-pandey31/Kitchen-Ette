import { db } from "../firebaseConfig"; 
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const TodaysMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentDay = new Date().toLocaleDateString("en-US", { weekday: "long" });

  useEffect(() => {
    const fetchMenuForToday = async () => {
      try {
        console.log("Fetching menu for:", currentDay);

        // Reference the document in Firestore
        const menuRef = doc(db, "TodaysMenu", currentDay);
        const menuSnap = await getDoc(menuRef);

        if (menuSnap.exists()) {
          console.log("Firestore data:", menuSnap.data()); // Debugging
          const data = menuSnap.data();

          // Ensure 'Items' exists and is an array
          if (data.Items && Array.isArray(data.Items)) {
            setMenuItems(data.Items);
          } else {
            console.warn(`No 'Items' array found for ${currentDay}`);
            setMenuItems([]);
          }
        } else {
          console.warn(`No menu available for ${currentDay}`);
          setMenuItems([]);
        }
      } catch (error) {
        console.error("Error fetching TodaysMenu:", error);
      }
      setLoading(false);
    };

    fetchMenuForToday();
  }, [currentDay]);

  return (
    <div>
      <h2>{currentDay}'s Menu</h2>
      {loading ? (
        <p>Loading...</p>
      ) : menuItems.length === 0 ? (
        <p>No menu available for today.</p>
      ) : (
        <ul>
        {menuItems.map((item, index) => (
          <li key={index}>
            {item.Name || "Unknown Dish"} - ₹{item.Price || "N/A"}
          </li>
        ))}
      </ul>
      
      )}
    </div>
  );
};

export default TodaysMenu;
