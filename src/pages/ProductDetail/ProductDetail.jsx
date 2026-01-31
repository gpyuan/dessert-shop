import { useParams } from "react-router-dom";
import products from "../../products";
import ProductGallery from "../../components/ProductDetail/ProductGallery";
import ProductInfo from "../../components/ProductDetail/ProductInfo";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) return <p className="undefined">商品不存在</p>;

  return (
    <div className="product-detail-wrapper">
      <div className="product-detail">
        <ProductGallery
          images={product.images ?? [product.images]}
          name={product.name}
        />
        <ProductInfo product={product} />
      </div>
    </div>
  );
};

export default ProductDetail;
