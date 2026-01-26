import { Link } from "react-router-dom";
import "./Footer.css";
import footerLogo from "../../assets/logo.jpg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-contain">
        {/* logo */}
        <div className="footer-logo">
          <Link to="/">
            <img src={footerLogo} alt="Moolu Shop Logo" />
          </Link>
        </div>

        {/* 關於我們 */}
        <div>
          <h5>關於我們</h5>
          <hr />
          <ul>
            <li>
              <i className="fa-solid fa-phone"></i>
              <span>(07)7775558</span>
            </li>
            <li>
              <i className="fa-solid fa-envelope"></i>
              <span>moolu_studio@gmail.com</span>
            </li>
            <li>
              <i className="fa-solid fa-clock"></i>
              <span>9:00~21:00</span>
            </li>
          </ul>
        </div>

        {/* 客戶服務 */}
        <div>
          <h5>客戶服務</h5>
          <hr />
          <ul>
            <li>
              <Link to="/shipping">宅配須知</Link>
            </li>
            <li>
              <Link to="/refund">退換貨政策</Link>
            </li>
            <li>
              <Link to="/privacy">隱私權政策</Link>
            </li>
          </ul>
        </div>

        {/* 社群媒體 */}
        <div>
          <h5>關注我們</h5>
          <hr />
          <a
            href="https://www.instagram.com/moolu_studio/"
            target="_blank"
            rel="noopener noreferrer"
            className="navigation-icon"
          >
            <i className="fa-brands fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
