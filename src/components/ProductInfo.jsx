import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

const ProductInfo = ({ product }) => {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const increase = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="product-info">
      <h1 className="product-title">{product.name}</h1>
      <p className="product-description" style={{ whiteSpace: "pre-line" }}>
        {product.description}
      </p>
      <p className="product-price">NT${product.price}</p>

      {/* 數量選擇 */}
      <div className="quantity-control">
        <button onClick={decrease}>－</button>
        <span>{quantity}</span>
        <button onClick={increase}>＋</button>
      </div>

      {/* 加入購物車 */}
      <button
        className="add-to-cart"
        onClick={() => {
          addToCart(product, quantity);
          showToast(`已加入購物車*${quantity}`);
        }}
      >
        加入購物車
      </button>
    </div>
  );
};

export default ProductInfo;
