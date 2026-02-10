import "./checkout.css";
import CheckoutCartItem from "../../components/Checkout/CheckoutCartItem/CheckoutCartItem";
import { useCart } from "../../context/CartContext";
import { useEffect, useState } from "react";
import CheckoutShipping from "../../components/Checkout/CheckoutShipping/CheckoutShipping";
import CheckoutBilling from "../../components/Checkout/CheckoutBilling/CheckoutBilling";

const Checkout = () => {
  // CheckoutCartItem
  const { cartItems } = useCart();
  const itemCount = cartItems.length;
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // CheckoutBilling
  const [billingData, setBillingData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // CheckoutShipping
  const [shippingMethod, setShippingMethod] = useState("");
  const [address, setAdress] = useState({
    city: "",
    district: "",
    street: "",
  });

  // function
  const handleBillingChange = (e) => {
    const { name, value } = e.target;

    setBillingData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form className="checkout-container">
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
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <CheckoutCartItem key={item.cartItemId} item={item} />
            ))
          ) : (
            <p className="empty">購物車目前是空的，快去逛逛吧!</p>
          )}
        </div>

        <div className="checkout-cart-item-total">
          <p>
            購物車內合計有{itemCount}項({totalQuantity}件)商品
          </p>
        </div>
      </section>

      {/* 3. 購買人資訊 */}
      <section className="checkout-section">
        <h2 className="checkout-title">
          <span className="checkout-number">2</span>購買人資訊
        </h2>
        <CheckoutBilling
          billingData={billingData}
          onChange={handleBillingChange}
        />
      </section>

      {/* 3. 付款運送方式 */}
      <section className="checkout-section">
        <h2 className="checkout-title">
          <span className="checkout-number">3</span>付款運送方式
        </h2>
        <CheckoutShipping
          shippingMethod={shippingMethod}
          setShippingMethod={setShippingMethod}
          address={address}
          setAdress={setAdress}
        />
      </section>

      {/* 3. 購買者資訊 */}
    </form>
  );
};

export default Checkout;
