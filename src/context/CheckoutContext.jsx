import { createContext, useContext, useEffect, useState } from "react";

const CheckoutContext = createContext();

const shippingPrices = {
  pickup: 0,
  home: 180,
  store: 60,
};

export const CheckoutProvider = ({ children }) => {
  // 狀態定義

  const [billingData, setBillingData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [billingErrors, setBillingErrors] = useState({});
  const [billingTouched, setBillingTouched] = useState({});

  const [shippingMethodTouched, setShippingMethodTouched] = useState(false);

  const [shippingContact, setShippingContact] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [shippingErrors, setShippingErrors] = useState({});
  const [shippingTouched, setShippingTouched] = useState({});
  const [sameAsBilling, setSameAsBilling] = useState(false);

  const [address, setAddress] = useState({
    city: "",
    district: "",
    street: "",
  });
  const [addressErrors, setAddressErrors] = useState({});
  const [addressTouched, setAddressTouched] = useState({});

  const [storeInfo, setStoreInfo] = useState({
    brand: "",
    city: "",
    district: "",
    storeId: "",
  });
  const [storeInfoTouched, setStoreInfoTouched] = useState({});
  const [storeInfoErrors, setStoreInfoErrors] = useState({});

  const [shippingMethod, setShippingMethod] = useState("");
  const [shippingMethodError, setShippingMethodError] = useState("");
  const shippingPrice = shippingPrices[shippingMethod] || 0;
  // 邏輯副作用
  useEffect(() => {
    if (sameAsBilling) {
      setShippingContact({ ...billingData });
      setShippingErrors({});
      setShippingTouched({});
    } else {
      setShippingContact({ name: "", email: "", phone: "" });
    }
  }, [sameAsBilling, billingData]);

  useEffect(() => {
    if (shippingMethod !== "home") {
      setAddress({ city: "", district: "", street: "" });
      setAddressErrors({});
    }
    if (shippingMethod !== "store") {
      setStoreInfo({ brand: "", city: "", district: "", storeId: "" });
      setStoreInfoErrors({});
    }
  }, [shippingMethod]);

  // 驗證工具
  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return !value.trim() ? "請輸入姓名" : "";
      case "email":
        if (!value.trim()) return "請輸入 Email";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Email 格式不正確";
        return "";
      case "phone":
        if (!value.trim()) return "請輸入電話";
        if (!/^09\d{8}$/.test(value)) return "手機號碼格式不正確";
        return "";
      default:
        return "";
    }
  };

  const validateAddressField = (name, value) => {
    if (!value?.toString().trim()) {
      switch (name) {
        case "city":
          return "請選擇縣市";
        case "district":
          return "請選擇區域";
        case "street":
          return "請輸入詳細地址";
        default:
          return "";
      }
    }
    return "";
  };

  const validateStoreField = (name, value) => {
    if (!value?.toString().trim()) {
      if (name === "brand") return "請選擇超商體系";
      if (name === "city") return "請選擇縣市";
      if (name === "district") return "請選擇區域";
      if (name === "storeId") return "請選擇取貨門市";
    }
    return "";
  };

  // Handlers

  // 1. 通用資料變更處理 (Billing/Shipping)
  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingData((prev) => ({ ...prev, [name]: value }));
    if (billingTouched[name]) {
      setBillingErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value),
      }));
    }
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingContact((prev) => ({ ...prev, [name]: value }));
    if (shippingTouched[name]) {
      setShippingErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value),
      }));
    }
  };

  const handleShippingMethodChange = (value) => {
    setShippingMethod(value);

    // 💡 即時驗證：如果已經碰過，一旦選了值，就清空錯誤訊息
    if (shippingMethodTouched || value) {
      if (value) {
        setShippingMethodError(""); // 有選值就清空錯誤
      } else {
        setShippingMethodError("請選擇運送方式");
      }
    }
  };

  // 2. 地址變更處理 (處理連動邏輯)
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
      // 如果改的是縣市，要把地區清空
      ...(name === "city" ? { district: "" } : {}),
    }));

    // 如果已經被碰過，就即時檢查錯誤
    if (addressTouched[name]) {
      setAddressErrors((prev) => ({
        ...prev,
        [name]: validateAddressField(name, value),
        // 如果改的是縣市，也要順便清空區域的錯誤訊息
        ...(name === "city" ? { district: "" } : {}),
      }));
    }
  };

  const handleStoreChange = (e) => {
    const { name, value } = e.target;

    setStoreInfo((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 如果這欄已經被碰過，才即時驗證
    if (storeInfoTouched[name]) {
      setStoreInfoErrors((prev) => ({
        ...prev,
        [name]: validateStoreField(name, value),
      }));
    }
  };

  // 3. Blur 處理
  const handleBillingBlur = (e) => {
    const { name, value } = e.target;
    setBillingTouched((prev) => ({ ...prev, [name]: true }));
    setBillingErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const handleShippingBlur = (e) => {
    const { name, value } = e.target;
    setShippingTouched((prev) => ({ ...prev, [name]: true }));
    setShippingErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const handleShippingMethodBlur = () => {
    setShippingMethodTouched(true); // 標記為已碰觸
    if (!shippingMethod) {
      setShippingMethodError("請選擇運送方式");
    }
  };

  const handleAddressBlur = (e) => {
    const { name, value } = e.target;
    setAddressTouched((prev) => ({ ...prev, [name]: true }));
    setAddressErrors((prev) => ({
      ...prev,
      [name]: validateAddressField(name, value),
    }));
  };

  const handleStoreBlur = (e) => {
    const { name, value } = e.target;

    setStoreInfoTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    setStoreInfoErrors((prev) => ({
      ...prev,
      [name]: validateStoreField(name, value),
    }));
  };

  // 核心驗證
  const validateAddress = () => {
    const newErrors = {
      city: validateAddressField("city", address.city),
      district: validateAddressField("district", address.district),
      street: validateAddressField("street", address.street),
    };
    setAddressErrors(newErrors);
    return Object.values(newErrors).every((err) => err === "");
  };

  const validateStore = () => {
    const fields = ["brand", "city", "district", "storeId"];
    const errors = {};

    fields.forEach((field) => {
      const errorMessage = validateStoreField(field, storeInfo[field]);
      if (errorMessage) {
        errors[field] = errorMessage;
      }
    });

    setStoreInfoErrors(errors);

    setStoreInfoTouched({
      brand: true,
      city: true,
      district: true,
      storeId: true,
    });

    return Object.keys(errors).length === 0;
  };

  const validateAll = () => {
    const billingNewErrors = {
      name: validateField("name", billingData.name),
      email: validateField("email", billingData.email),
      phone: validateField("phone", billingData.phone),
    };
    setBillingErrors(billingNewErrors);
    setBillingTouched({ name: true, email: true, phone: true });
    const billingValid = Object.values(billingNewErrors).every((err) => !err);

    let shippingValid = true;
    if (!sameAsBilling) {
      const shippingNewErrors = {
        name: validateField("name", shippingContact.name),
        email: validateField("email", shippingContact.email),
        phone: validateField("phone", shippingContact.phone),
      };
      setShippingErrors(shippingNewErrors);
      setShippingTouched({ name: true, email: true, phone: true });
      shippingValid = Object.values(shippingNewErrors).every((err) => !err);
    }

    let logisticValid = true;

    // 檢查運送方式
    if (!shippingMethod) {
      setShippingMethodError("請選擇運送方式");
      setShippingMethodTouched(true);
      logisticValid = false;
    }

    if (shippingMethod === "home") {
      logisticValid = validateAddress() && logisticValid;
    } else if (shippingMethod === "store") {
      logisticValid = validateStore() && logisticValid;
    } else if (shippingMethod === "pickup") {
      logisticValid = true && logisticValid;
    } else {
      logisticValid = false;
    }
    return billingValid && shippingValid && logisticValid;
  };

  const submitCheckout = () => {
    return validateAll();
  };

  const resetCheckout = () => {
    setBillingData({ name: "", email: "", phone: "" });
    setShippingContact({ name: "", email: "", phone: "" });
    setBillingErrors({});
    setBillingTouched({});
    setShippingErrors({});
    setShippingTouched({});
    setAddress({ city: "", district: "", street: "" });
    setAddressErrors({});
    setAddressTouched({});
    setStoreInfo({ brand: "", city: "", district: "", storeId: "" });
    setStoreInfoErrors({});
    setShippingMethod("");
    setSameAsBilling(false);
  };

  const value = {
    billingData,
    billingErrors,
    handleBillingChange,
    handleBillingBlur,
    shippingContact,
    shippingErrors,
    handleShippingChange,
    handleShippingBlur,
    sameAsBilling,
    setSameAsBilling,
    address,
    setAddress,
    addressErrors,
    handleAddressChange,
    handleAddressBlur,
    storeInfo,
    storeInfoErrors,
    setStoreInfo,
    handleStoreChange,
    handleStoreBlur,
    storeInfoTouched,
    setStoreInfoErrors,
    shippingMethod,
    setShippingMethod,
    shippingMethodError,
    shippingPrice,
    handleShippingMethodChange,
    validateAll,
    submitCheckout,
    resetCheckout,
  };

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) throw new Error("useCheckout 必須在 CheckoutProvider 內使用！");
  return context;
};
