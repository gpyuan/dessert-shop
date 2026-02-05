import "./checkout.css";
import CheckoutCartItem from "../../components/CheckoutCartItem/CheckoutCartItem";
import { useCart } from "../../context/CartContext"; // 1. 引入 Context

const Checkout = () => {
  const { cartItems } = useCart(); // 2. 取得購物車資料

  return (
    <form className="checkout-container">
      {/* 1. 購物車內容 */}
      <section className="checkout-section">
        <h2 className="checkout-title">
          <span className="checkout-number">1</span>購物車內容
        </h2>
        <div className="checkout-cart-item-title">
          <span>商品明細</span>
          <span></span>
          <span>單價</span>
          <span>數量</span>
          <span>小計</span>
        </div>

        <div className="checkout-cart-list">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <CheckoutCartItem key={item.cartItemId} item={item} />
            ))
          ) : (
            <p className="empty">購物車目前是空的，快去逛逛吧!</p>
          )}
        </div>
      </section>

      {/* 物流選擇 */}
    </form>
  );
};

export default Checkout;
