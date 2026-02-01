import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";
import FlavorSelector from "../FlavorSelector/FlavorSelector";
import "./ProductDetailContent.css";

const ProductInfo = ({ product }) => {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedFlavor, setSelectedFlavor] = useState(
    product.flavors?.[0] ?? null
  );

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

      {/* 口味選擇 */}
      <FlavorSelector
        flavors={product.flavors}
        value={selectedFlavor}
        onChange={setSelectedFlavor}
      />

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
          addToCart(product, { flavor: selectedFlavor, quantity });
          showToast(`已加入購物車*${quantity}`);
        }}
      >
        加入購物車
      </button>
    </div>
  );
};

export default ProductInfo;
