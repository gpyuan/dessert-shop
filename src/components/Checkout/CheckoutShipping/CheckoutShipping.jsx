import "./CheckoutShipping.css";
import { AddressData } from "../../../AddressData";
import ContactForm from "../ContactForm";
import { useCheckout } from "../../../context/CheckoutContext";
import { StoreData } from "../../../storeData";

const CheckoutShipping = () => {
  const {
    // 物流相關
    shippingOptions,
    shippingMethod,
    shippingMethodError,
    handleShippingMethodChange,
    handleShippingMethodBlur,

    // 付款相關
    paymentOptions,
    paymentMethod,
    paymentMethodError,
    handlePaymentMethodChange,

    // 收件人資訊
    shippingContact,
    shippingErrors,
    handleShippingChange,
    handleShippingBlur,
    sameAsBilling,
    setSameAsBilling,
    billingData,

    // 地址相關
    address,
    handleAddressChange,
    handleAddressBlur,
    addressErrors,

    // 超商相關
    storeInfo,
    handleStoreChange,
    handleStoreBlur,
    storeInfoErrors,
  } = useCheckout();

  // 宅配地址邏輯
  const cities = Object.keys(AddressData);
  const districts =
    address.city && AddressData[address.city] ? AddressData[address.city] : [];

  // 超商選擇邏輯
  const storeBrands = Object.keys(StoreData || {});

  // 根據品牌取得所有縣市（去重）
  const storeCities =
    storeInfo.brand && StoreData[storeInfo.brand]
      ? [...new Set(StoreData[storeInfo.brand].map((s) => s.city))]
      : [];

  // 根據品牌和縣市取得所有地區（去重）
  const storeDistricts =
    storeInfo.brand && storeInfo.city && StoreData[storeInfo.brand]
      ? [
          ...new Set(
            StoreData[storeInfo.brand]
              .filter((s) => s.city === storeInfo.city)
              .map((s) => s.district)
          ),
        ]
      : [];

  // 根據品牌、縣市、地區篩選門市
  const finalStores =
    storeInfo.brand &&
    storeInfo.city &&
    storeInfo.district &&
    StoreData[storeInfo.brand]
      ? StoreData[storeInfo.brand].filter(
          (s) => s.city === storeInfo.city && s.district === storeInfo.district
        )
      : [];

  return (
    <div className="checkout-shipping">
      {/* 1. 運送方法 */}
      <h3 className="recipient-information-title">運送方式</h3>
      {shippingMethodError && (
        <p className="error-message shipping-error-message">
          {shippingMethodError}
        </p>
      )}
      <div className="shipping-options">
        {shippingOptions.map((option) => (
          <label
            key={option.id}
            className={`shipping-option ${
              shippingMethod === option.id ? "selected" : ""
            } ${shippingMethodError ? "shipping-error" : ""}`}
          >
            <input
              type="radio"
              name="shipping"
              value={option.id}
              checked={shippingMethod === option.id}
              onChange={(e) => handleShippingMethodChange(e.target.value)}
              onBlur={handleShippingMethodBlur}
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

      <br />
      <hr />
      <br />

      {/* 2. 付款方式 */}
      <div className="payment-section">
        <h3 className="recipient-information-title">付款方式</h3>
        {paymentMethodError && (
          <p className="error-message shipping-error-message">
            {paymentMethodError}
          </p>
        )}
        <div className="shipping-options">
          {paymentOptions.map((option) => (
            <label
              key={option.id}
              className={`shipping-option ${
                paymentMethod === option.id ? "selected" : ""
              } ${paymentMethodError ? "shipping-error" : ""}`}
            >
              <input
                type="radio"
                name="payment"
                value={option.id}
                checked={paymentMethod === option.id}
                onChange={(e) => handlePaymentMethodChange(e.target.value)}
              />
              <div className="shipping-info">
                <div className="shipping-name">{option.name}</div>
                <p className="shipping-description">{option.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      <br />
      <hr />

      {/* 3. 收件人資訊 */}
      <div className="recipient-information">
        <div className="recipient-header">
          <h3 className="recipient-information-title">收件人資訊</h3>
          <label className="same-as-billing">
            <input
              type="checkbox"
              checked={sameAsBilling}
              onChange={(e) => setSameAsBilling(e.target.checked)}
            />
            同購買者
          </label>
        </div>

        <ContactForm
          data={sameAsBilling ? billingData : shippingContact}
          errors={sameAsBilling ? {} : shippingErrors}
          onChange={sameAsBilling ? () => {} : handleShippingChange}
          onBlur={sameAsBilling ? () => {} : handleShippingBlur}
          disabled={sameAsBilling}
        />
      </div>

      {/* 4. 宅配地址表單 */}
      {shippingMethod === "home" && (
        <div className="address-form">
          <h3 className="address-form-title">請填寫配送地址</h3>

          {/* 縣市 */}
          <div>
            <label className="form-label">
              01. 縣市 *
              <input
                type="text"
                name="city"
                className={`form-input ${
                  addressErrors.city ? "input-error" : ""
                }`}
                placeholder="請選擇縣市"
                list="homeCityData"
                onBlur={handleAddressBlur}
                value={address.city ?? ""}
                onChange={handleAddressChange}
              />
              {addressErrors.city && (
                <p className="error-message">{addressErrors.city}</p>
              )}
            </label>
            <datalist id="homeCityData">
              {cities.map((city) => (
                <option key={city} value={city} />
              ))}
            </datalist>
          </div>

          {/* 地區 */}
          <div>
            <label className="form-label">
              02. 地區 *
              <input
                type="text"
                name="district"
                className={`form-input ${
                  addressErrors.district ? "input-error" : ""
                }`}
                placeholder="請選擇地區"
                onBlur={handleAddressBlur}
                list="districtsData"
                value={address.district ?? ""}
                onChange={handleAddressChange}
                disabled={!address.city}
              />
              {addressErrors.district && (
                <p className="error-message">{addressErrors.district}</p>
              )}
            </label>
            <datalist id="districtsData">
              {districts.map((district) => (
                <option key={district} value={district} />
              ))}
            </datalist>
          </div>

          {/* 詳細地址 */}
          <label className="form-label">
            03. 詳細地址 *
            <input
              type="text"
              name="street"
              placeholder="請輸入路名、巷弄號、樓層"
              className={`form-input ${
                addressErrors.street ? "input-error" : ""
              }`}
              onBlur={handleAddressBlur}
              value={address.street ?? ""}
              onChange={handleAddressChange}
            />
            {addressErrors.street && (
              <p className="error-message">{addressErrors.street}</p>
            )}
          </label>
        </div>
      )}

      {/* 5. 超商門市表單 */}
      {shippingMethod === "store" && (
        <div className="store-form">
          <h3 className="store-form-title">請選擇超商取貨門市</h3>

          {/* 超商品牌 */}
          <div className="brands shipping-options">
            {storeBrands.map((brand) => (
              <label
                key={brand}
                className={`brand shipping-option ${
                  storeInfo.brand === brand ? "selected" : ""
                } ${storeInfoErrors.brand ? "shipping-error" : ""}`}
              >
                <input
                  type="radio"
                  name="brand"
                  value={brand}
                  checked={storeInfo.brand === brand}
                  onChange={handleStoreChange}
                  onBlur={handleStoreBlur}
                />
                <p className="brand-name">{brand}</p>
              </label>
            ))}
          </div>
          {storeInfoErrors.brand && (
            <p className="error-message">{storeInfoErrors.brand}</p>
          )}

          {/* 縣市選單 */}
          {storeInfo.brand && (
            <div>
              <label className="form-label">
                01. 縣市 *
                <input
                  type="text"
                  name="city"
                  className={`form-input ${
                    storeInfoErrors.city ? "input-error" : ""
                  }`}
                  placeholder="請選擇縣市"
                  list="storeCityData"
                  onBlur={handleStoreBlur}
                  value={storeInfo.city ?? ""}
                  onChange={handleStoreChange}
                />
                {storeInfoErrors.city && (
                  <p className="error-message">{storeInfoErrors.city}</p>
                )}
              </label>
              <datalist id="storeCityData">
                {storeCities.map((city) => (
                  <option key={city} value={city} />
                ))}
              </datalist>
            </div>
          )}

          {/* 地區選單 */}
          {storeInfo.brand && storeInfo.city && (
            <div>
              <label className="form-label">
                02. 地區 *
                <input
                  type="text"
                  name="district"
                  className={`form-input ${
                    storeInfoErrors.district ? "input-error" : ""
                  }`}
                  placeholder="請選擇地區"
                  list="storeDistrictData"
                  onBlur={handleStoreBlur}
                  value={storeInfo.district ?? ""}
                  onChange={handleStoreChange}
                  disabled={!storeInfo.city}
                />
                {storeInfoErrors.district && (
                  <p className="error-message">{storeInfoErrors.district}</p>
                )}
              </label>
              <datalist id="storeDistrictData">
                {storeDistricts.map((district) => (
                  <option key={district} value={district} />
                ))}
              </datalist>
            </div>
          )}

          {/* 門市選單 */}
          {storeInfo.brand && storeInfo.city && storeInfo.district && (
            <div>
              <label className="form-label">
                03. 門市 *
                <input
                  type="text"
                  name="storeId"
                  onBlur={handleStoreBlur}
                  className={`form-input ${
                    storeInfoErrors.storeId ? "input-error" : ""
                  }`}
                  placeholder="請選擇門市"
                  list="storeListData"
                  disabled={!storeInfo.district}
                  value={
                    finalStores.find((s) => s.id === storeInfo.storeId)?.name ??
                    ""
                  }
                  onChange={(e) => {
                    const selectedStore = finalStores.find(
                      (s) => s.name === e.target.value
                    );

                    handleStoreChange({
                      target: {
                        name: "storeId",
                        value: selectedStore ? selectedStore.id : "",
                      },
                    });
                  }}
                />
                {storeInfoErrors.storeId && (
                  <p className="error-message">{storeInfoErrors.storeId}</p>
                )}
              </label>

              <datalist id="storeListData">
                {finalStores.map((store) => (
                  <option key={store.id} value={store.name}>
                    {store.name} - {store.address}
                  </option>
                ))}
              </datalist>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CheckoutShipping;
