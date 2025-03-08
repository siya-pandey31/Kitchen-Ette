import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Import Firestore database
import "../styles/Explore.css";

function Explore() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "categories"));
        const categoryList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCategories(categoryList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <p>Loading categories...</p>;
  }

  return (
    <div className="explore-container">
      <h2>Explore Our Menu</h2>
      <div className="category-grid">
        {categories.map(category => (
          <div key={category.id} className="category-card">
            <img src={category.imageUrl} alt={category.name} className="category-image" />
            <h3>{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Explore;
