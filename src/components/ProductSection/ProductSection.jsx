import { Link } from "react-router-dom";
import "./ProductSection.css";
import ProductCard from "../ProductCard/ProductCard";

const ProductSection = ({ title, products = [], linkTo }) => {
  const previewProducts = products.slice(0, 3);

  return (
    <section className="product-section">
      <h2 className="section-title">{title}</h2>

      <div className="product-list">
        {previewProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length > 3 && (
        <div className="view-more">
          <Link to={linkTo} className="view-more-btn">
            查看更多
          </Link>
        </div>
      )}
    </section>
  );
};

export default ProductSection;
