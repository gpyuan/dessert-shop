import { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Navbar from "./components//Navbar/Navbar";
import Toast from "./components/Toast/Toast";
import Footer from "./components/Footer/Footer";
import Shipping from "./pages/policy/Shipping";
import Refund from "./pages/policy/Refund";
import Privacy from "./pages/policy/Privacy";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import Announcement from "./pages/Announcement/Announcement";
import MiniCart from "./components/Minicart/MiniCart";
import Checkout from "./pages/Checkout/Checkout";
import CheckoutConfirm from "./pages/CheckoutConfirm/CheckoutConfirm";
import "./index.css";

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const handleToggleCart = () => {
    setCartOpen((prev) => !prev);
  };
  return (
    <Router>
      <Navbar onToggleCart={handleToggleCart} />
      <Toast />

      <Routes>
        <Route path="/shipping" element={<Shipping />}></Route>
        <Route path="/refund" element={<Refund />}></Route>
        <Route path="/privacy" element={<Privacy />}></Route>

        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/products/:category" element={<CategoryPage />}></Route>
        <Route path="/announcement" element={<Announcement />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/checkout/confirm" element={<CheckoutConfirm />}></Route>
      </Routes>

      <MiniCart open={cartOpen} onClose={() => setCartOpen(false)}></MiniCart>
      <Footer />
    </Router>
  );
}

export default App;
