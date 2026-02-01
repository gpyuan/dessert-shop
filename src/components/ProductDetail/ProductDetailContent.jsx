import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import "./ProductDetailContent.css";

const ProductDetailContent = ({ product, onClose }) => {
  return (
    <div className="product-detail-content">
      <ProductGallery images={product.images} />
      <ProductInfo product={product} onClose={onClose} />
    </div>
  );
};

export default ProductDetailContent;
