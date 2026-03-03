import "./CheckoutConfirm.css";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CheckoutConfirm = () => {
  const navigate = useNavigate();
  const { state: orderData } = useLocation();

  // 若無訂單資料則導回首頁
  useEffect(() => {
    if (!orderData) {
      navigate("/");
    }
  }, [orderData, navigate]);

  // 如果沒有資料，不渲染任何內容
  if (!orderData) {
    return <div className="loading">正在導向...</div>;
  }
  if (!orderData.billingDataInfo) {
    return <div className="error">訂單資料格式錯誤</div>;
  }

  return (
    <div className="confirm-container">
      <div className="confirm-card">
        {/* 成功圖示 */}
        <div className="success-icon">✅</div>

        {/* 標題 */}
        <h1>感謝您的購買，{orderData.billingDataInfo.name}！</h1>
        <p className="order-number">
          您的訂單編號為：<strong>#{orderData.orderNumber}</strong>
        </p>

        {/* 訂單摘要 */}
        <div className="order-summary-box">
          <h2>訂單摘要</h2>

          {/* 購買人資訊 */}
          <section className="info-section">
            <h3>購買人資訊</h3>
            <p>姓名：{orderData.billingDataInfo.name}</p>
            <p>Email：{orderData.billingDataInfo.email}</p>
            <p>電話：{orderData.billingDataInfo.phone}</p>
          </section>

          {/* 收件人資訊 */}
          <section className="info-section">
            <h3>收件人資訊</h3>
            <>
              <p>姓名：{orderData.shippingContactInfo.name}</p>
              <p>Email：{orderData.shippingContactInfo.email}</p>
              <p>電話：{orderData.shippingContactInfo.phone}</p>
            </>
          </section>

          {/* 運送資訊 */}
          <section className="info-section">
            <h3>運送資訊</h3>
            <p>運送方式：{orderData.shippingMethod}</p>
            <p>運費：NT${orderData.shippingPrice}</p>

            {/* 宅配地址 */}
            {orderData.shippingType === "home" && (
              <p>
                配送地址：{orderData.shippingDetail.city}{" "}
                {orderData.shippingDetail.district}{" "}
                {orderData.shippingDetail.street}
              </p>
            )}

            {/* 超商資訊 */}
            {orderData.shippingType === "store" && (
              <>
                <p>超商：{orderData.shippingDetail.brand}</p>
                <p>門市：{orderData.shippingDetail.storeName}</p>
              </>
            )}
          </section>

          {/* 付款資訊 */}
          <section className="info-section">
            <h3>付款方式</h3>
            <p>{orderData.paymentMethod}</p>
          </section>

          {/* 購買商品 */}
          <section className="info-section">
            <h3>購買商品</h3>
            <div className="order-items">
              {orderData.items.map((item) => (
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
              <span>NT${orderData.subtotal}</span>
            </div>
            <div className="total-row">
              <span>運費</span>
              <span>NT${orderData.shippingPrice}</span>
            </div>
            <div className="total-row grand-total">
              <span>總計</span>
              <span>NT${orderData.totalAmount}</span>
            </div>
          </section>
        </div>

        {/* 操作按鈕 */}
        <div className="action-buttons">
          <button
            className="btn-home"
            onClick={() => {
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
