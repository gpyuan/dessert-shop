import "./CheckoutShipping.css";
import { AddressData } from "../../../AddressData";
import ContactForm from "../ContactForm";
import { useCheckout } from "../../../context/CheckoutContext";
import { StoreData } from "../../../storeData";

const CheckoutShipping = () => {
  const {
    shippingMethod,
    setShippingMethod,
    shippingMethodError,
    handleShippingMethodChange,
    handleShippingMethodBlur,
    shippingContact,
    shippingErrors,
    handleShippingChange,
    handleShippingBlur,
    sameAsBilling,
    setSameAsBilling,
    billingData,
    address,
    setAddress,
    handleAddressBlur,
    addressErrors,
    storeInfo,
    setStoreInfo,
    handleStoreChange,
    handleStoreBlur,
    storeInfoErrors,
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

  // 超商選擇
  const storeBands = Object.keys(StoreData);
  // 提取該品牌下「不重複」的城市
  const storeCities = storeInfo.brand
    ? [...new Set(StoreData[storeInfo.brand].map((s) => s.city))]
    : [];

  // 提取該品牌在該城市下「不重複」的地區
  const storeDistricts =
    storeInfo.brand && storeInfo.city
      ? [
          ...new Set(
            StoreData[storeInfo.brand]
              .filter((s) => s.city === storeInfo.city)
              .map((s) => s.district)
          ),
        ]
      : [];

  // 提取該地區下所有的「門市清單」
  const finalStores =
    storeInfo.brand && storeInfo.city && storeInfo.district
      ? StoreData[storeInfo.brand].filter(
          (s) => s.city === storeInfo.city && s.district === storeInfo.district
        )
      : [];

  return (
    <div className="checkout-shipping">
      {/* 運送方法 */}
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
                className={`form-input ${
                  addressErrors.city ? "input-error" : ""
                }`}
                placeholder="請選擇縣市（例：臺北市）"
                list="homeCityData"
                onBlur={handleAddressBlur}
                value={address.city ?? ""}
                onChange={(e) =>
                  setAddress((prev) => ({
                    ...prev,
                    city: e.target.value,
                    district: "",
                  }))
                }
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
          {/* 地區選單 */}
          <div>
            <label className="form-label">
              02.地區
              <input
                type="text"
                id="district"
                name="district"
                className={`form-input ${
                  addressErrors.district ? "input-error" : ""
                }`}
                placeholder="請選擇地區（例：大安區）"
                onBlur={handleAddressBlur}
                list="districtsData"
                value={address.district ?? ""}
                onChange={(e) =>
                  setAddress((prev) => ({
                    ...prev,
                    district: e.target.value,
                  }))
                }
              />{" "}
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
          {/* 詳細地址輸入 */}
          <label className="form-label">
            03.詳細地址
            <input
              type="text"
              name="street"
              placeholder="請輸入路名、巷弄號、樓層（例：忠孝東路四段100號5樓）"
              className={`form-input ${
                addressErrors.street ? "input-error" : ""
              }`}
              onBlur={handleAddressBlur}
              value={address.street ?? ""}
              onChange={(e) =>
                setAddress((prev) => ({
                  ...prev,
                  street: e.target.value,
                }))
              }
            />
            {addressErrors.street && (
              <p className="error-message">{addressErrors.street}</p>
            )}
          </label>
        </div>
      )}

      {/* 超商門市 */}
      {shippingMethod === "store" && (
        <div className="store-form">
          <h3 className="store-form-title">請選擇超商取貨門市</h3>
          {storeInfoErrors.brand && (
            <span className="error-message  shipping-error-message">
              {storeInfoErrors.brand}
            </span>
          )}
          {/*選擇品牌 */}
          <div className="brands shipping-options">
            {storeBands.map((brand) => (
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
                  className={storeInfoErrors.brand ? "input-error" : ""}
                  onChange={handleStoreChange}
                  onBlur={handleStoreBlur}
                />
                <p className="brand-name">{brand}</p>
              </label>
            ))}
          </div>
          {/* 縣市選單 */}
          <div>
            <label className="form-label">
              01.縣市
              <input
                type="text"
                className={`form-input ${
                  storeInfoErrors.city ? "input-error" : ""
                }`}
                name="city"
                placeholder="請選擇縣市（例：臺北市）"
                list="storeCityData"
                value={storeInfo.city ?? ""}
                // onChange={(e) =>
                //   setStoreInfo((prev) => ({
                //     ...prev,
                //     city: e.target.value,
                //     district: "",
                //     storeId: "",
                //   }))
                // }
                onChange={handleStoreChange}
                onBlur={handleStoreBlur}
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
          <div>
            <label className="form-label">
              02.地區
              <input
                type="text"
                name="district"
                className={`form-input ${
                  storeInfoErrors.district ? "input-error" : ""
                }`}
                placeholder="請選擇地區（例：大安區）"
                list="storeDistData"
                disabled={!storeInfo.city}
                value={storeInfo.district ?? ""}
                // onChange={(e) =>
                //   setStoreInfo((prev) => ({
                //     ...prev,
                //     district: e.target.value,
                //     storeId: "",
                //   }))
                // }
                onChange={handleStoreChange}
                onBlur={handleStoreBlur}
              />
              {storeInfoErrors.district && (
                <p className="error-message">{storeInfoErrors.district}</p>
              )}
            </label>
            <datalist id="storeDistData">
              {storeDistricts.map((d) => (
                <option key={d} value={d} />
              ))}
            </datalist>
          </div>
          {/*門市選單*/}
          <div>
            <label className="form-label">
              03.門市
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
        </div>
      )}
    </div>
  );
};

export default CheckoutShipping;
