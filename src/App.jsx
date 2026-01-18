// import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
// import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import Toast from "./components/Toast";
import Footer from "./components/Footer";
import Shipping from "./pages/policy/Shipping";
import Refund from "./pages/policy/Refund";
import Privacy from "./pages/policy/Privacy";
import CategoryPage from "./pages/CategoryPage";
import Announcement from "./pages/Announcement";
// import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Toast />
      <Routes>
        <Route path="/shipping" element={<Shipping />}></Route>
        <Route path="/refund" element={<Refund />}></Route>
        <Route path="/privacy" element={<Privacy />}></Route>

        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/products/:category" element={<CategoryPage />}></Route>
        <Route path="/announcement" element={<Announcement />}></Route>
        {/* <Route path="/cart" element={<Cart />} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
