import { Link } from "react-router-dom";
import "./MiniCart.css";
import { useCart } from "../../context/CartContext";

const MiniCartItem = ({ item }) => {
  const { removeFromCart } = useCart();
  return (
    <div className="mini-cart-item">
      <div className="item-image">
        <Link to={`/product/${item.id}`}>
          <img src={item.image} alt={item.name} />
        </Link>
      </div>
      <div className="item-info">
        <span className="item-name">{item.name}</span>
        <p className="item-quantity">
          {item.quantity}x<span className="item-price">NT${item.price}</span>
        </p>
      </div>

      <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
        ✕
      </button>
    </div>
  );
};

export default MiniCartItem;
