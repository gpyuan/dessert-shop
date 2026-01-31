import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./MiniCart.css";
import { useCart } from "../../context/CartContext";
import MiniCartItem from "./MiniCartItem";

const MiniCart = ({ open, onClose }) => {
  const { cartItems } = useCart();
  const cartRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);

  //控制進/退場
  useEffect(() => {
    if (open) {
      setVisible(true);
      setTimeout(() => {
        setAnimate(true);
      }, 10);
    } else {
      setAnimate(false);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [open]);

  //點擊外部關閉
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  if (!visible) return null;

  return (
    <>
      <aside ref={cartRef} className={`mini-cart ${animate ? "open" : ""}`}>
        <div className="mini-cart-content">
          {cartItems.length === 0 ? (
            <p className="empty">購物車目前是空的</p>
          ) : (
            cartItems.map((item) => (
              <MiniCartItem
                key={item.cartItemId}
                item={item}
                onClose={onClose}
              />
            ))
          )}
        </div>
        <Link to="/checkout" className="mini-cart-checkout">
          立刻結帳
        </Link>
      </aside>
    </>
  );
};

export default MiniCart;
