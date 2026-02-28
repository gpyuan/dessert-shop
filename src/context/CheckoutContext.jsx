import { createContext, useContext, useEffect, useState } from "react";

const CheckoutContext = createContext();

// 靜態選項定義
const shippingOptions = [
  {
    id: "pickup",
    name: "門市自取",
    price: 0,
    description: "製作完成後可至門市取貨",
  },
  { id: "home", name: "宅配到府", price: 180, description: "3-5 個工作天送達" },
  {
    id: "store",
    name: "超商取貨",
    price: 60,
    description: "3-5 個工作天送達門市",
  },
];

const paymentOptions = [
  { id: "cash", name: "現金 / 貨到付款", description: "取貨時再行支付" },
  {
    id: "credit_card",
    name: "信用卡線上支付",
    description: "支援 Visa, Master, JCB",
  },
];

export const CheckoutProvider = ({ children }) => {
  // 狀態定義
  const [billingData, setBillingData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [billingErrors, setBillingErrors] = useState({});
  const [billingTouched, setBillingTouched] = useState({});

  const [shippingContact, setShippingContact] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [shippingErrors, setShippingErrors] = useState({});
  const [shippingTouched, setShippingTouched] = useState({});
  const [sameAsBilling, setSameAsBilling] = useState(false);

  const [shippingMethod, setShippingMethod] = useState("");
  const [shippingMethodError, setShippingMethodError] = useState("");
  const [shippingMethodTouched, setShippingMethodTouched] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentMethodError, setPaymentMethodError] = useState("");
  const [paymentMethodTouched, setPaymentMethodTouched] = useState(false);

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
  const [storeInfoErrors, setStoreInfoErrors] = useState({});
  const [storeInfoTouched, setStoreInfoTouched] = useState({});

  // 金額計算
  const [subtotal, setSubtotal] = useState(0);
  const selectedShipping = shippingOptions.find(
    (opt) => opt.id === shippingMethod
  );
  const shippingPrice = selectedShipping ? selectedShipping.price : 0;
  const totalAmount = subtotal + shippingPrice;

  // 副作用
  useEffect(() => {
    if (sameAsBilling) {
      setShippingContact({ ...billingData });
      setShippingErrors({});
      setShippingTouched({});
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
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? "Email 格式不正確"
          : "";
      case "phone":
        if (!value.trim()) return "請輸入電話";
        return !/^09\d{8}$/.test(value) ? "手機號碼格式不正確" : "";
      default:
        return "";
    }
  };

  const validateAddressField = (name, value) => {
    if (!value?.toString().trim()) {
      if (name === "city") return "請選擇縣市";
      if (name === "district") return "請選擇區域";
      if (name === "street") return "請輸入詳細地址";
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
  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingData((prev) => ({ ...prev, [name]: value }));
    if (billingTouched[name])
      setBillingErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value),
      }));
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingContact((prev) => ({ ...prev, [name]: value }));
    if (shippingTouched[name])
      setShippingErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value),
      }));
  };

  const handleShippingMethodChange = (val) => {
    setShippingMethod(val);
    setShippingMethodError(val ? "" : "請選擇運送方式");
  };

  const handlePaymentMethodChange = (val) => {
    setPaymentMethod(val);
    setPaymentMethodError(val ? "" : "請選擇付款方式");
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "city" ? { district: "" } : {}),
    }));
    if (addressTouched[name]) {
      setAddressErrors((prev) => ({
        ...prev,
        [name]: validateAddressField(name, value),
      }));
    }
  };

  const handleStoreChange = (e) => {
    const { name, value } = e.target;
    setStoreInfo((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "brand" && { city: "", district: "", storeId: "" }),
      ...(name === "city" && { district: "", storeId: "" }),
      ...(name === "district" && { storeId: "" }),
    }));
    if (storeInfoTouched[name]) {
      setStoreInfoErrors((prev) => ({
        ...prev,
        [name]: validateStoreField(name, value),
      }));
    }
  };

  // 核心驗證
  const validateAddress = () => {
    const newErrors = {
      city: validateAddressField("city", address.city),
      district: validateAddressField("district", address.district),
      street: validateAddressField("street", address.street),
    };
    setAddressErrors(newErrors);
    setAddressTouched({ city: true, district: true, street: true });
    return Object.values(newErrors).every((err) => err === "");
  };

  const validateStore = () => {
    const fields = ["brand", "city", "district", "storeId"];
    const errors = {};
    fields.forEach((field) => {
      const errorMessage = validateStoreField(field, storeInfo[field]);
      if (errorMessage) errors[field] = errorMessage;
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
    // 購買人驗證
    const bErrors = {
      name: validateField("name", billingData.name),
      email: validateField("email", billingData.email),
      phone: validateField("phone", billingData.phone),
    };
    setBillingErrors(bErrors);
    setBillingTouched({ name: true, email: true, phone: true });
    const billingValid = Object.values(bErrors).every((err) => !err);

    // 收件人驗證
    let shippingValid = true;
    if (!sameAsBilling) {
      const sErrors = {
        name: validateField("name", shippingContact.name),
        email: validateField("email", shippingContact.email),
        phone: validateField("phone", shippingContact.phone),
      };
      setShippingErrors(sErrors);
      setShippingTouched({ name: true, email: true, phone: true });
      shippingValid = Object.values(sErrors).every((err) => !err);
    }

    // 物流驗證
    let logisticValid = true;
    if (!shippingMethod) {
      setShippingMethodError("請選擇運送方式");
      setShippingMethodTouched(true);
      logisticValid = false;
    } else if (shippingMethod === "home") {
      logisticValid = validateAddress();
    } else if (shippingMethod === "store") {
      logisticValid = validateStore();
    }

    // 付款驗證
    let paymentValid = true;
    if (!paymentMethod) {
      setPaymentMethodError("請選擇付款方式");
      setPaymentMethodTouched(true);
      paymentValid = false;
    }

    return billingValid && shippingValid && logisticValid && paymentValid;
  };

  const resetCheckout = () => {
    setBillingData({ name: "", email: "", phone: "" });
    setBillingErrors({});
    setBillingTouched({});
    setShippingContact({ name: "", email: "", phone: "" });
    setShippingErrors({});
    setShippingTouched({});
    setAddress({ city: "", district: "", street: "" });
    setAddressErrors({});
    setAddressTouched({});
    setStoreInfo({ brand: "", city: "", district: "", storeId: "" });
    setStoreInfoErrors({});
    setStoreInfoTouched({});
    setShippingMethod("");
    setPaymentMethod("");
    setShippingMethodError("");
    setPaymentMethodError("");
    setSubtotal(0);
    setSameAsBilling(false);
  };

  // 輸出 Value
  const value = {
    shippingOptions,
    paymentOptions,
    billingData,
    billingErrors,
    handleBillingChange,
    handleBillingBlur: (e) =>
      setBillingTouched((prev) => ({ ...prev, [e.target.name]: true })),
    shippingContact,
    shippingErrors,
    handleShippingChange,
    handleShippingBlur: (e) =>
      setShippingTouched((prev) => ({ ...prev, [e.target.name]: true })),
    sameAsBilling,
    setSameAsBilling,
    address,
    addressErrors,
    handleAddressChange,
    handleAddressBlur: (e) =>
      setAddressTouched((prev) => ({ ...prev, [e.target.name]: true })),
    storeInfo,
    storeInfoErrors,
    handleStoreChange,
    handleStoreBlur: (e) =>
      setStoreInfoTouched((prev) => ({ ...prev, [e.target.name]: true })),
    shippingMethod,
    setShippingMethod,
    shippingMethodError,
    handleShippingMethodChange,
    paymentMethod,
    setPaymentMethod,
    paymentMethodError,
    handlePaymentMethodChange,
    shippingPrice,
    subtotal,
    setSubtotal,
    totalAmount,
    submitCheckout: validateAll,
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
