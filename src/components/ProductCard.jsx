import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      {/* 圖片區 */}
      <Link to={`/product/${product.id}`} className="product-card-link">
        <div className="product-image">
          {product.images && <img src={product.images[0]} alt={product.name} />}

          {/* 加入購物車 Hover */}
          <button
            className="hover-add-btn"
            onClick={(e) => {
              e.preventDefault();
              addToCart(product, 1);
            }}
          >
            加入購物車
          </button>
        </div>

        {/* 商品文字資訊 */}
        <div className="product-card-info">
          <h3>{product.name}</h3>
          <p>NT$ {product.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
