import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./MiniCart.css";
import { useCart } from "../../context/CartContext";
import MiniCartItem from "./MiniCartItem";

const MiniCart = ({ open, onClose }) => {
  const { cartItems } = useCart();
  const cartRef = useRef(null);

  //點擊外部關閉
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e) => {
      if (e.target.closest(".cart-toggle-btn")) return;

      if (cartRef.current && !cartRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  return (
    <aside ref={cartRef} className={`mini-cart ${open ? "open" : ""}`}>
      <div className="mini-cart-content">
        {cartItems.length === 0 ? (
          <p className="empty">購物車目前是空的</p>
        ) : (
          cartItems.map((item) => (
            <MiniCartItem key={item.cartItemId} item={item} onClose={onClose} />
          ))
        )}
      </div>
      {cartItems.length > 0 && (
        <Link to="/checkout" className="mini-cart-checkout" onClick={onClose}>
          立刻結帳
        </Link>
      )}
    </aside>
  );
};

export default MiniCart;
