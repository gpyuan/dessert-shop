import "./CheckoutConfirm.css";
import { useEffect, useMemo } from "react";
import { useCheckout } from "../../context/CheckoutContext";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const CheckoutConfirm = () => {
  const {
    billingData,
    shippingContact,
    shippingMethod,
    paymentMethod,
    address,
    storeInfo,
    shippingOptions,
    paymentOptions,
    shippingPrice,
    totalAmount,
    subtotal,
    sameAsBilling,
    resetCheckout,
  } = useCheckout();

  const { cartItems } = useCart();
  const navigate = useNavigate();

  // 訂單編號
  const orderNumber = useMemo(() => `ML-${Date.now()}`, []);

  // 取得運送方式名稱
  const shippingMethodName =
    shippingOptions.find((opt) => opt.id === shippingMethod)?.name || "未選擇";

  // 取得付款方式名稱
  const paymentMethodName =
    paymentOptions.find((opt) => opt.id === paymentMethod)?.name || "未選擇";

  // 若無訂單資料則導回首頁
  useEffect(() => {
    if (!billingData.name || cartItems.length === 0) {
      navigate("/");
    }
  }, [billingData.name, cartItems.length, navigate]);

  // 如果沒有資料，不渲染任何內容
  if (!billingData.name) {
    return null;
  }

  return (
    <div className="confirm-container">
      <div className="confirm-card">
        {/* 成功圖示 */}
        <div className="success-icon">✅</div>

        {/* 標題 */}
        <h1>感謝您的購買，{billingData.name}！</h1>
        <p className="order-number">
          您的訂單編號為：<strong>#{orderNumber}</strong>
        </p>

        {/* 訂單摘要 */}
        <div className="order-summary-box">
          <h2>訂單摘要</h2>

          {/* 購買人資訊 */}
          <section className="info-section">
            <h3>購買人資訊</h3>
            <p>姓名：{billingData.name}</p>
            <p>Email：{billingData.email}</p>
            <p>電話：{billingData.phone}</p>
          </section>

          {/* 收件人資訊 */}
          <section className="info-section">
            <h3>收件人資訊</h3>
            {sameAsBilling ? (
              <p>同購買人</p>
            ) : (
              <>
                <p>姓名：{shippingContact.name}</p>
                <p>Email：{shippingContact.email}</p>
                <p>電話：{shippingContact.phone}</p>
              </>
            )}
          </section>

          {/* 運送資訊 */}
          <section className="info-section">
            <h3>運送資訊</h3>
            <p>運送方式：{shippingMethodName}</p>
            <p>運費：NT${shippingPrice}</p>

            {/* 宅配地址 */}
            {shippingMethod === "home" && address.city && (
              <p>
                配送地址：{address.city} {address.district} {address.street}
              </p>
            )}

            {/* 超商資訊 */}
            {shippingMethod === "store" && storeInfo.brand && (
              <>
                <p>超商：{storeInfo.brand}</p>
                <p>
                  門市：{storeInfo.city} {storeInfo.district}
                </p>
                <p>門市代碼：{storeInfo.storeId}</p>
              </>
            )}
          </section>

          {/* 付款資訊 */}
          <section className="info-section">
            <h3>付款方式</h3>
            <p>{paymentMethodName}</p>
          </section>

          {/* 購買商品 */}
          <section className="info-section">
            <h3>購買商品</h3>
            <div className="order-items">
              {cartItems.map((item) => (
                <div key={item.cartItemId} className="order-item">
                  <span className="item-name">
                    {item.name}
                    {item.flavor && ` (${item.flavor})`}
                  </span>
                  <span className="item-quantity">x{item.quantity}</span>
                  <span className="item-price">
                    NT${item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* 金額統計 */}
          <section className="info-section total-section">
            <div className="total-row">
              <span>商品小計</span>
              <span>NT${subtotal}</span>
            </div>
            <div className="total-row">
              <span>運費</span>
              <span>NT${shippingPrice}</span>
            </div>
            <div className="total-row grand-total">
              <span>總計</span>
              <span>NT${totalAmount}</span>
            </div>
          </section>
        </div>

        {/* 操作按鈕 */}
        <div className="action-buttons">
          <button
            className="btn-home"
            onClick={() => {
              resetCheckout();
              navigate("/");
            }}
          >
            回到首頁
          </button>
          <button className="btn-print" onClick={() => window.print()}>
            列印訂單明細
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutConfirm;
