import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Navbar.css";
import navbarLogo from "../assets/logo.jpg";

const Navbar = () => {
  const { cartItems } = useCart();

  // 計算購物車商品總數量
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar">
      {/* 右上角功能區 */}
      <div className="navigation-action">
        <Link to="/cart" className="navigation-icon">
          <i className="fa-solid fa-cart-shopping"></i>
          {/* 購物車數字 */}
          <span className="cart-count">{totalQuantity}</span>
        </Link>
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
      {/* logo */}
      <div className="navigation-logo">
        <Link to="/">
          <img src={navbarLogo} alt="Moolu Shop Logo" className="logo-img" />
        </Link>
      </div>
      {/* 主選單 */}
      <div>
        <ul className="navigation-menu">
          <li>
            <Link to="/gift">節慶送禮</Link>
          </li>
          <li>
            <Link to="/gift">餅乾專區</Link>
          </li>
          <li>
            <Link to="/cookies">蛋糕專區</Link>
          </li>
          <li>
            {" "}
            <Link to="/announcement">賣場公告</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
