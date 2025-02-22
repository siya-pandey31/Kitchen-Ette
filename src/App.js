import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Menu from './pages/Menu'; 
import Beverages from './pages/Beverages'; 


import '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} /> 
          <Route path="/beverages" element={<Beverages />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
