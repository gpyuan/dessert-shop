import "./Checkout.css";
import CheckoutCartItem from "../../components/Checkout/CheckoutCartItem/CheckoutCartItem";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../context/CheckoutContext";
import CheckoutShipping from "../../components/Checkout/CheckoutShipping/CheckoutShipping";
import CheckoutBilling from "../../components/Checkout/CheckoutBilling/CheckoutBilling";

const Checkout = () => {
  const { cartItems } = useCart();
  const { submitCheckout, shippingMethodError, shippingPrice } = useCheckout();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="checkout-container empty-cart-view">
        <p className="empty">購物車目前是空的，快去逛逛吧!</p>
        <button className="back-to-shop-button " onClick={() => navigate("/")}>
          繼續購物
        </button>
      </div>
    );
  }

  const itemCount = cartItems.length;
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalAmount = subtotal + shippingPrice;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!submitCheckout()) return;

    navigate("/checkout/confirm");
  };

  return (
    <form className="checkout-container" onSubmit={handleSubmit}>
      <div className="checkout-summary">
        <div className="checkout-summary-container">
          <h2 className="summary-title">結帳金額</h2>

          {/* 商品小計 */}
          <div className="summary-line">
            <span className="summary-label">商品小計:</span>
            <span className="summary-value">
              NT${subtotal.toLocaleString()}
            </span>
          </div>

          {/* 運費 */}
          <div className="summary-line">
            <span className="summary-label">運費:</span>
            <span className="summary-value">NT${shippingPrice}</span>
          </div>

          {/* 應付總額 */}
          <div className="summary-line total-highlight">
            <span className="summary-label">應付總額:</span>
            <span className="summary-value ">
              NT${totalAmount.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* 1. 購物車內容 */}
      <section className="checkout-section">
        <h2 className="checkout-title">
          <span className="checkout-number">1</span>購物車內容
        </h2>

        <div className="cart-grid-layout checkout-cart-item-header">
          <span>商品明細</span>
          <span></span>
          <span>單價</span>
          <span>數量</span>
          <span>小計</span>
        </div>

        <div className="checkout-cart-list">
          {cartItems.map((item) => (
            <CheckoutCartItem key={item.cartItemId} item={item} />
          ))}
        </div>

        <div className="checkout-cart-item-total">
          <p>
            購物車內合計有 {itemCount} 項 ({totalQuantity} 件) 商品
          </p>
        </div>
      </section>

      {/* 2. 購買人資訊 */}
      <section className="checkout-section">
        <h2 className="checkout-title">
          <span className="checkout-number">2</span>購買人資訊
        </h2>

        <CheckoutBilling />
      </section>

      {/* 3. 付款運送方式 */}
      <section className="checkout-section">
        <h2 className="checkout-title">
          <span className="checkout-number">3</span>付款運送方式
          {shippingMethodError && (
            <p className="shipping-error-message error-message">
              {shippingMethodError}
            </p>
          )}
        </h2>

        <CheckoutShipping />
      </section>

      <section className="checkout-section checkout-submit-section">
        <button type="submit" className="checkout-submit-button">
          {" "}
          送出訂單
        </button>
      </section>
    </form>
  );
};

export default Checkout;
