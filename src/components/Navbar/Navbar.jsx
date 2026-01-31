import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useEffect, useState } from "react";
import { useRef } from "react";
import "./Navbar.css";
import navbarLogo from "../../assets/logo.jpg";

const Navbar = ({ onCartClick }) => {
  const { cartItems } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const scrolledRef = useRef(scrolled);

  // 動態監聽滾動以切換導覽列外觀
  useEffect(() => {
    scrolledRef.current = scrolled;
  }, [scrolled]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;

          if (scrollY > 100 && !scrolledRef.current) {
            setScrolled(true);
          } else if (scrollY < 50 && scrolledRef.current) {
            setScrolled(false);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 計算購物車商品總數量
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
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
        {/* logo */}
        <div className="navigation-logo">
          <Link to="/">
            <img src={navbarLogo} alt="Moolu Shop Logo" className="logo-img" />
          </Link>
        </div>
        {/* 主選單 */}
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
              {" "}
              <Link to="/announcement">賣場公告</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
