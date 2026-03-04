import { useEffect, useRef, useState } from "react";
import "./Checkout.css";
import { storeData } from "../../storeData";
import CheckoutCartItem from "../../components/Checkout/CheckoutCartItem/CheckoutCartItem";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../context/CheckoutContext";
import CheckoutShipping from "../../components/Checkout/CheckoutShipping/CheckoutShipping";
import CheckoutBilling from "../../components/Checkout/CheckoutBilling/CheckoutBilling";

const Checkout = () => {
  const { cartItems, resetCartItems } = useCart();
  const navigate = useNavigate();

  // 從 Context 取得狀態與金額
  const {
    submitCheckout,
    billingData,
    billingErrors,
    shippingContact,
    shippingErrors,
    shippingOptions,
    shippingMethod,
    shippingMethodError,
    address,
    addressErrors,
    storeInfo,
    storeInfoErrors,
    paymentMethod,
    paymentMethodError,
    paymentOptions,
    shippingPrice,
    setSubtotal,
    totalAmount,
    resetCheckout,
  } = useCheckout();

  // 錯誤訊息Ref
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const buyerRef = useRef(null);
  const shippingMethodErrorRef = useRef(null);
  const paymentMethodErrorRef = useRef(null);
  const receiverRef = useRef(null);
  const addressRef = useRef(null);
  const storeRef = useRef(null);

  // 計算當前購物車小計
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // 當小計改變時，同步回 Context
  useEffect(() => {
    setSubtotal(subtotal);
  }, [subtotal]);

  if (cartItems.length === 0) {
    return (
      <div className="checkout-container empty-cart-view">
        <p className="empty">購物車目前是空的，快去逛逛吧!</p>
        <button className="back-to-shop-button" onClick={() => navigate("/")}>
          繼續購物
        </button>
      </div>
    );
  }

  const itemCount = cartItems.length;
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const paymentOptionsName =
    paymentOptions.find((opt) => opt.id === paymentMethod)?.name || "未選擇";

  const shippingMethodName =
    shippingOptions.find((opt) => opt.id === shippingMethod)?.name || "未選擇";

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitAttempted(true);

    const isValid = submitCheckout();
    if (!isValid) return;

    // 建立物流資訊快照
    let shippingDetail = {};
    if (shippingMethod === "home") {
      shippingDetail = { ...address };
    } else if (shippingMethod === "store") {
      const brandStores = storeData[storeInfo.brand] || [];
      const selectedStore = brandStores.find((s) => s.id === storeInfo.storeId);

      shippingDetail = {
        ...storeInfo,
        storeName: selectedStore ? selectedStore.name : storeInfo.storeId,
      };
    }

    // 紀錄訂單資訊
    const orderData = {
      orderNumber: `ML-${Date.now()}`,
      billingDataInfo: { ...billingData },
      items: [...cartItems],
      subtotal,
      shippingPrice,
      totalAmount,
      shippingType: shippingMethod,
      shippingMethod: shippingMethodName,
      shippingDetail,
      paymentMethod: paymentOptionsName,
      shippingContactInfo: { ...shippingContact },
    };

    // 導向確認頁並帶資料
    navigate("/checkout/confirm", { state: orderData });

    // 清空購物車與 checkout 狀態
    setTimeout(() => {
      resetCartItems();
      resetCheckout();
    }, 100);
  };

  useEffect(() => {
    if (!submitAttempted) return;

    let firstErrorRef = null;

    if (Object.values(billingErrors).some((err) => err)) {
      firstErrorRef = buyerRef;
    } else if (shippingMethodError) {
      firstErrorRef = shippingMethodErrorRef;
    } else if (paymentMethodError) {
      firstErrorRef = paymentMethodErrorRef;
    } else if (
      shippingErrors &&
      Object.values(shippingErrors).some((err) => err)
    ) {
      firstErrorRef = receiverRef;
    } else if (
      shippingMethod === "home" &&
      Object.values(addressErrors).some((err) => err)
    ) {
      firstErrorRef = addressRef;
    } else if (
      shippingMethod === "store" &&
      Object.values(storeInfoErrors).some((err) => err)
    ) {
      firstErrorRef = storeRef;
    }

    firstErrorRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [
    submitAttempted,
    billingErrors,
    shippingErrors,
    shippingMethodError,
    paymentMethodError,
    addressErrors,
    storeInfo,
    storeInfoErrors,
    shippingMethod,
  ]);

  return (
    <form className="checkout-container" onSubmit={handleSubmit}>
      <div className="checkout-summary">
        <div className="checkout-summary-container">
          <h2 className="summary-title">結帳金額</h2>

          <div className="summary-line">
            <span className="summary-label">商品小計:</span>
            <span className="summary-value">
              NT${subtotal.toLocaleString()}
            </span>
          </div>

          <div className="summary-line">
            <span className="summary-label">運費:</span>
            <span className="summary-value">NT${shippingPrice}</span>
          </div>

          <div className="summary-line total-highlight">
            <span className="summary-label">應付總額:</span>
            <span className="summary-value">
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
            合計有 {itemCount} 項 ({totalQuantity} 件) 商品
          </p>
        </div>
      </section>

      {/* 2. 購買人資訊 */}
      <section ref={buyerRef} className="checkout-section">
        <h2 className="checkout-title">
          <span className="checkout-number">2</span>購買人資訊
        </h2>
        <CheckoutBilling />
      </section>

      {/* 3. 付款運送方式 */}
      <section className="checkout-section">
        <h2 className="checkout-title">
          <span className="checkout-number">3</span>付款運送方式
        </h2>
        <CheckoutShipping
          shippingMethodErrorRef={shippingMethodErrorRef}
          paymentMethodErrorRef={paymentMethodErrorRef}
          addressRef={addressRef}
          storeRef={storeRef}
          receiverRef={receiverRef}
        />
      </section>

      <section className="checkout-section checkout-submit-section">
        <button type="submit" className="checkout-submit-button">
          送出訂單
        </button>
      </section>
    </form>
  );
};

export default Checkout;
