import "./CheckoutShipping.css";
import { AddressData } from "../../../AddressData";
import ContactForm from "../ContactForm";
import { useCheckout } from "../../../context/CheckoutContext";
import { useState } from "react";

const CheckoutShipping = () => {
  const {
    shippingMethod,
    setShippingMethod,
    shippingContact,
    shippingErrors,
    handleShippingChange,
    handleShippingBlur,
    sameAsBilling,
    setSameAsBilling,
    billingData,
    address,
    setAddress,
    addressErrors,
  } = useCheckout();

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

  // 宅配地址選擇
  const cities = Object.keys(AddressData);
  const districts = address.city ? AddressData[address.city] : [];

  return (
    <div className="checkout-shipping">
      {/* 運送方法 */}
      <div className="shipping-options">
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
      </div>

      {/* 收件人資訊 */}
      <div className="recipient-information">
        <div className="recipient-header">
          <h3 className="recipient-information-title">收件人資訊</h3>
          {/* 同購買者勾選 */}
          <label className="same-as-billing">
            <input
              type="checkbox"
              checked={sameAsBilling}
              onChange={(e) => setSameAsBilling(e.target.checked)}
            />
            同購買者勾選
          </label>
        </div>

        {/* 收件者資訊表單 */}
        <ContactForm
          data={sameAsBilling ? billingData : shippingContact}
          errors={sameAsBilling ? {} : shippingErrors}
          onChange={sameAsBilling ? () => {} : handleShippingChange}
          onBlur={sameAsBilling ? () => {} : handleShippingBlur}
          disabled={sameAsBilling}
        />
      </div>

      {/* 宅配地址 */}
      {shippingMethod === "home" && (
        <div className="address-form">
          <h3 className="address-form-title">請填寫配送地址</h3>

          {/* 縣市選單 */}
          <div>
            <label className="form-label">
              01.縣市
              <input
                type="text"
                id="city"
                name="city"
                className="form-input"
                placeholder="請選擇縣市（例：臺北市）"
                list="cityData"
                value={address.city ?? ""}
                onChange={(e) =>
                  setAddress((prev) => ({
                    ...prev,
                    city: e.target.value,
                    district: "",
                  }))
                }
              />
            </label>
            <datalist id="cityData">
              {cities.map((city) => (
                <option key={city} value={city} />
              ))}
            </datalist>
            {addressErrors.city && (
              <p className="error">{addressErrors.city}</p>
            )}
          </div>
          {/* 地區選單 */}
          <div>
            <label className="form-label">
              02.地區
              <input
                type="text"
                id="district"
                name="district"
                className="form-input"
                placeholder="請選擇地區（例：大安區）"
                list="districtsData"
                value={address.district ?? ""}
                onChange={(e) =>
                  setAddress((prev) => ({
                    ...prev,
                    district: e.target.value,
                  }))
                }
              />
            </label>
            <datalist id="districtsData">
              {districts.map((district) => (
                <option key={district} value={district} />
              ))}
            </datalist>
            {addressErrors.district && (
              <p className="error">{addressErrors.district}</p>
            )}
          </div>
          {/* 詳細地址輸入 */}
          <label className="form-label">
            03.詳細地址
            <input
              type="text"
              placeholder="請輸入路名、巷弄號、樓層（例：忠孝東路四段100號5樓）"
              className="form-input"
              value={address.street ?? ""}
              onChange={(e) =>
                setAddress((prev) => ({
                  ...prev,
                  street: e.target.value,
                }))
              }
            />
          </label>
          {addressErrors.street && (
            <p className="error">{addressErrors.street}</p>
          )}
        </div>
      )}

      {/* 超商門市選擇 */}
      {shippingMethod === "store" && (
        <div className="store-form">
          <h3 className="store-form-title">請選擇超商取貨門市</h3>
          {/* 7-11和全家的btn */}
          {/* 顯示對應分店? 僅提供分店輸入? */}
        </div>
      )}
    </div>
  );
};

export default CheckoutShipping;
