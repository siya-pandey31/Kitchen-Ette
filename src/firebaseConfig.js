import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSCyXwJ12M4w3zZQhq9ZhU9jwXbvZBI10",
  authDomain: "kitchen-ette.firebaseapp.com",
  databaseURL: "https://kitchen-ette-default-rtdb.firebaseio.com",
  projectId: "kitchen-ette",
  storageBucket: "kitchen-ette.appspot.com",
  messagingSenderId: "364249574517",
  appId: "1:364249574517:web:2e7f3b80d0e2d969081c3c",
  measurementId: "G-X8W8L1S2NT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// ✅ Optional: Only initialize analytics in the browser
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { db, auth, analytics };
