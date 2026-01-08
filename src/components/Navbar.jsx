import { Link } from "react-router-dom";
import "./Navbar.css";
import navbarLogo from "../assets/logo.jpg";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navigation-action">
        <Link to="/cart" className="navigation-icon">
          <i className="fa-solid fa-cart-shopping"></i>
          <span className="cart-count">0</span>
        </Link>

        <a
          href="https://www.instagram.com/moolu_studio/"
          target="_blank"
          rel="noopener noreferrer"
          className="navigation-icon"
        >
          <i className="fa-brands fa-instagram"></i>
        </a>
      </div>
      <div className="navigation-logo">
        <Link to="/">
          <img src={navbarLogo} alt="Moolu Shop Logo" className="logo-img" />
        </Link>
      </div>

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
