import { useParams } from "react-router-dom";
import products from "../products";
import ProductGallery from "../components/ProductGallery";
import ProductInfo from "../components/ProductInfo";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) return <p>商品不存在</p>;

  return (
    <div className="product-detail">
      <ProductGallery
        images={product.images ?? [product.image]}
        name={product.name}
      />
      <ProductInfo product={product} />
    </div>
  );
};

export default ProductDetail;
