import { Link } from "react-router-dom";
import navbarLogo from "../../assets/logo.jpg";
import "./MobileMenu.css";

const MobileMenu = ({ open, onClose }) => {
  const stopPropagation = (e) => e.stopPropagation();

  return (
    <div className={`mobile-backdrop ${open ? "show" : ""}`} onClick={onClose}>
      <aside
        className={`mobile-menu ${open ? "show" : ""}`}
        onClick={stopPropagation}
      >
        <Link to="/">
          <img
            src={navbarLogo}
            alt="Moolu Shop Logo"
            className="mobile-logo-img"
          />
        </Link>
        <button className="mobile-close" onClick={onClose}>
          ✕
        </button>
        <nav className="mobile-nav">
          <Link to={`/products/festival`} onClick={onClose}>
            節慶禮盒
          </Link>
          <Link to={`/products/cookies`} onClick={onClose}>
            餅乾專區
          </Link>
          <Link to={`/products/cakes`} onClick={onClose}>
            蛋糕專區
          </Link>
          <Link to="/announcement" onClick={onClose}>
            賣場公告
          </Link>
        </nav>
      </aside>
    </div>
  );
};

export default MobileMenu;
