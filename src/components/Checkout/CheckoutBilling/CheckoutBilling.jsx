import "./CheckoutBilling.css";

const CheckoutBilling = ({ billingData, onChange }) => {
  return (
    <section className="checkout-billing">
      <label className="billing-label">
        01.姓名
        <input
          type="text"
          name="name"
          className="billing-input"
          placeholder="購買者姓名"
          value={billingData.name}
          onChange={onChange}
        />
      </label>

      <label className="billing-label">
        02.電子郵件{" "}
        <input
          type="email"
          name="email"
          className="billing-input"
          placeholder="123@gmail.com"
          value={billingData.email}
          onChange={onChange}
        />
      </label>

      <label className="billing-label">
        03.電話號碼
        <input
          type="tel"
          name="phone"
          inputMode="numeric"
          pattern="[0-9]*"
          className="billing-input"
          placeholder="0912345678"
          value={billingData.phone}
          onChange={onChange}
        />
      </label>
    </section>
  );
};

export default CheckoutBilling;
