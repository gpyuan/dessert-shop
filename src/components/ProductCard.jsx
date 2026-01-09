import { Link } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="product-card-link">
      <div className="product-card">
        <div className="product-image">
          {product.images && <img src={product.images[0]} alt={product.name} />}
        </div>
        <div className="product-card-info">
          <h3>{product.name}</h3>
          <p>NT$ {product.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
