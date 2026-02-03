import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./Navbar.css";
import navbarLogo from "../../assets/logo.jpg";
import MobileMenu from "./MobileMenu";

const Navbar = ({ onCartClick }) => {
  const { cartItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  // 計算購物車商品總數量
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* 右上角功能區 */}
        <div className="navigation-action">
          <button className="navigation-icon" onClick={onCartClick}>
            <i className="fa-solid fa-cart-shopping"></i>
            {/* 購物車數字 */}
            <span className="cart-count">{totalQuantity}</span>
          </button>
          {/*社群媒體 */}
          <a
            href="https://www.instagram.com/moolu_studio/"
            target="_blank"
            rel="noopener noreferrer"
            className="navigation-icon"
          >
            <i className="fa-brands fa-instagram"></i>
          </a>
        </div>
        {/* 手機主選單 */}
        <button className="menu-btn" onClick={() => setMenuOpen(true)}>
          <i className="fa-solid fa-bars"></i>
        </button>
        {/* logo */}
        <div className="navigation-logo">
          <Link to="/">
            <img src={navbarLogo} alt="Moolu Shop Logo" className="logo-img" />
          </Link>
        </div>
        {/* 桌機主選單 */}
        <nav>
          <ul className="navigation-menu">
            <li>
              <Link to={`/products/festival`}>節慶禮盒</Link>
            </li>
            <li>
              <Link to={`/products/cookies`}>餅乾專區</Link>
            </li>
            <li>
              <Link to={`/products/cakes`}>蛋糕專區</Link>
            </li>
            <li>
              <Link to="/announcement">賣場公告</Link>
            </li>
          </ul>
        </nav>
        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      </div>
    </header>
  );
};

export default Navbar;
