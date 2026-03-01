import ProductDetailContent from "../ProductDetail/ProductDetailContent";
import "./ProductModal.css";
import { useEffect } from "react";

const ProductModal = ({ product, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* 關閉按鈕 */}
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        {/* 商品內容 ProducDetail */}
        <ProductDetailContent product={product} onClose={onClose} />
      </div>
    </div>
  );
};

export default ProductModal;
