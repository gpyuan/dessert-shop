// import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
// import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
// import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        {/* <Route path="/cart" element={<Cart />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
