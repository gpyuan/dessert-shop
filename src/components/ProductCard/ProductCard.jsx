import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";
import ProductModal from "./ProductModal";
import "./ProductCard.css";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [openModal, setOpenModal] = useState(false);
  const hasFlavors = product.flavors?.length > 0;

  return (
    <div className="product-card">
      {/* 圖片區 */}
      <Link to={`/product/${product.id}`} className="product-card-link">
        <div className="product-image">
          {product.images && <img src={product.images[0]} alt={product.name} />}

          {/* 加入購物車 Hover */}
          <button
            className="hover-add-btn"
            aria-label={`將 ${product.name} 加入購物車`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              if (!hasFlavors) {
                // 沒口味 -> 直接加購物車
                addToCart(product, { flavor: null, quantity: 1 });
                showToast("已加入購物車");
              } else {
                // 有口味 -> 打開 ProductModal
                setOpenModal(true);
              }
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
      {openModal && (
        <ProductModal product={product} onClose={() => setOpenModal(false)} />
      )}
    </div>
  );
};

export default ProductCard;
