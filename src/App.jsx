import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
// import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import Toast from "./components/Toast";
import Footer from "./components/Footer/Footer";
import Shipping from "./pages/policy/Shipping";
import Refund from "./pages/policy/Refund";
import Privacy from "./pages/policy/Privacy";
import CategoryPage from "./pages/CategoryPage";
import Announcement from "./pages/Announcement";
import MiniCart from "./components/Minicart/MiniCart";
// import "./index.css";

function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <BrowserRouter>
      <Navbar onCartClick={() => setCartOpen(true)} />
      <Toast />

      <Routes>
        <Route path="/shipping" element={<Shipping />}></Route>
        <Route path="/refund" element={<Refund />}></Route>
        <Route path="/privacy" element={<Privacy />}></Route>

        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/products/:category" element={<CategoryPage />}></Route>
        <Route path="/announcement" element={<Announcement />}></Route>
      </Routes>
      <MiniCart open={cartOpen} onClose={() => setCartOpen(false)}></MiniCart>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
