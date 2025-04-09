import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Beverages from "./pages/Beverages";
import Rice from "./pages/Rice";
import PaymentPage from "./pages/PaymentPage";
import Cart from "./pages/cart"; // ✅ Import Cart Page
import { CartProvider } from "./context/CartContext"; 
import TodayMenu from "./pages/TodaysMenu"
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";



function App() {
  return (
    <CartProvider> 
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/rice" element={<Rice />} />
          <Route path="/beverages" element={<Beverages />} />
          <Route path="/cart" element={<Cart />} /> 
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/today-menu" element={<TodayMenu />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
         
      
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
