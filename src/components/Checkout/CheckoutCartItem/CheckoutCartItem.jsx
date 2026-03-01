import { Link } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import "./CheckoutCartItem.css";

const CheckoutCartItem = ({ item }) => {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  // 處理減少數量的邏輯
  const handleDecrease = () => {
    if (item.quantity === 1) {
      const isConfirmed = window.confirm(
        `確定要將 "${item.name}" 從購物車中移除嗎？`
      );
      if (isConfirmed) {
        removeFromCart(item.cartItemId);
      }
    } else {
      decreaseQuantity(item.cartItemId);
    }
  };

  return (
    <div className="cart-grid-layout  checkout-cart-item">
      {/* 商品圖片 */}
      <div className="checkout-cart-item-img">
        <Link to={`/product/${item.productId}`}>
          <img src={item.image} alt={item.name} />
        </Link>
      </div>

      {/* 商品名稱及口味 */}
      <div className="checkout-cart-item-info">
        <h3>{item.name}</h3>
        {item.flavor && (
          <p className="checkout-cart-item-flavor">({item.flavor})</p>
        )}
      </div>
      {/* 商品單價 */}
      <div className="checkout-cart-item-price">
        <p>NT${item.price}</p>
      </div>
      {/* 數量控制 */}
      <div className="checkout-cart-item-quantity">
        <button type="button" onClick={handleDecrease} aria-label="減少數量">
          －
        </button>
        <span className="checkout-cart-item-quantity-number">
          {item.quantity}
        </span>
        <button
          type="button"
          onClick={() => increaseQuantity(item.cartItemId)}
          aria-label="增加數量"
        >
          ＋
        </button>
      </div>
      {/* 小計 */}
      <div className="checkout-cart-item-subtotal">
        NT${item.price * item.quantity}
      </div>
      {/* 刪除 */}
      <div className="checkout-cart-item-remove-btn">
        <button onClick={() => removeFromCart(item.cartItemId)}>✕</button>
      </div>
    </div>
  );
};

export default CheckoutCartItem;
