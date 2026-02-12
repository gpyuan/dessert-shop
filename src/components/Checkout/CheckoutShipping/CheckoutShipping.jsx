import "./CheckoutShipping.css";
import { CityData } from "../../../CityData";
import ContactForm from "../ContactForm";

const CheckoutShipping = ({
  shippingMethod,
  setShippingMethod,
  shippingContact,
  handleShippingContactChange,
  sameAsBilling,
  setSameAsBilling,
  adress,
  setAddress,
  errors,
  handleBlur,
}) => {
  // 物流選項
  const shippingOptions = [
    {
      id: "pickup",
      name: "門市自取",
      price: 0,
      description: "製作完成後可至門市取貨",
    },
    {
      id: "home",
      name: "宅配到府",
      price: 180,
      description: "3-5 個工作天送達",
    },
    {
      id: "store",
      name: "超商取貨",
      price: 60,
      description: "3-5 個工作天送達門市",
    },
  ];

  return (
    <div className="checkout-shipping">
      {/* 收件人資訊 */}

      {/* 運送方法 */}
      {shippingOptions.map((option) => (
        <label
          key={option.id}
          className={`shipping-option ${
            shippingMethod === option.id ? "selected" : ""
          }`}
        >
          <input
            type="radio"
            name="shipping"
            value={option.id}
            checked={shippingMethod === option.id}
            onChange={(e) => setShippingMethod(e.target.value)}
          />
          <div className="shipping-info">
            <div className="shipping-name">{option.name}</div>
            <p className="shipping-description">{option.description}</p>
          </div>
          <span className="shipping-price">
            {option.price === 0 ? "免運費" : `NT$${option.price}`}
          </span>
        </label>
      ))}

      {/* 同購買者勾選 */}
      <label className="same-as-billing">
        <input
          type="checkbox"
          checked={sameAsBilling}
          onChange={(e) => setSameAsBilling(e.target.checked)}
        />
        同購買者勾選
      </label>

      {/* 收件者資訊表單 */}
      <ContactForm
        data={shippingContact}
        errors={errors}
        onChange={handleShippingContactChange}
        onBlur={handleBlur}
      />

      {/* 宅配地址 + 收件人資訊 */}
      {shippingMethod === "home" && (
        <div className="adress-form">
          <h3 className="adress-form-title">請填寫配送資訊</h3>

          <form>
            <input
              type="text"
              id="city"
              placeholder="請選擇要運送的城市"
              list="cityData"
              required
            ></input>
            <datalist id="cityData">
              {CityData.map((cityName) => (
                <option key={cityName} value={cityName} />
              ))}
            </datalist>
          </form>
        </div>
      )}
    </div>
  );
};

export default CheckoutShipping;
