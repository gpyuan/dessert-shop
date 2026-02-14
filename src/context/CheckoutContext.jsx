import { createContext, useContext, useEffect, useState } from "react";

const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  // 購買人資訊
  const [billingData, setBillingData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [billingErrors, setBillingErrors] = useState({});
  const [billingTouched, setBillingTouched] = useState({});

  // 收件者資訊
  const [shippingContact, setShippingContact] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [shippingErrors, setShippingErrors] = useState({});
  const [shippingTouched, setShippingTouched] = useState({});

  const [sameAsBilling, setSameAsBilling] = useState(false);

  // 地址
  const [address, setAddress] = useState({
    city: "",
    district: "",
    street: "",
  });

  const [addressErrors, setAddressErrors] = useState({});

  // 運送方式
  const [shippingMethod, setShippingMethod] = useState("");

  // 同購買者邏輯
  useEffect(() => {
    if (sameAsBilling) {
      setShippingContact({ ...billingData });
      setShippingErrors({});
      setShippingTouched({});
    } else {
      setShippingContact({
        name: "",
        email: "",
        phone: "",
      });
    }
  }, [sameAsBilling, billingData]);

  // 驗證函數
  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value.trim()) return "請輸入姓名";
        return "";
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

  const validateAddress = () => {
    const errors = {};

    if (!address.city) {
      errors.city = "請選擇縣市";
    }

    if (!address.district) {
      errors.district = "請選擇區域";
    }

    setAddressErrors(errors);

    return Object.keys(errors).length === 0;
  };

  // Billing handlers
  const handleBillingChange = (e) => {
    const { name, value } = e.target;

    setBillingData((prev) => ({ ...prev, [name]: value }));

    if (billingTouched[name]) {
      const error = validateField(name, value);
      setBillingErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBillingBlur = (e) => {
    const { name, value } = e.target;

    setBillingTouched((prev) => ({ ...prev, [name]: true }));

    const error = validateField(name, value);
    setBillingErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Shipping handlers
  const handleShippingChange = (e) => {
    const { name, value } = e.target;

    setShippingContact((prev) => ({ ...prev, [name]: value }));

    if (shippingTouched[name]) {
      const error = validateField(name, value);
      setShippingErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleShippingBlur = (e) => {
    const { name, value } = e.target;

    setShippingTouched((prev) => ({ ...prev, [name]: true }));

    const error = validateField(name, value);
    setShippingErrors((prev) => ({ ...prev, [name]: error }));
  };

  // 全部驗證(送出前)
  const validateAll = () => {
    // Billing
    const billingNewErrors = {
      name: validateField("name", billingData.name),
      email: validateField("email", billingData.email),
      phone: validateField("phone", billingData.phone),
    };

    setBillingErrors(billingNewErrors);
    setBillingTouched({
      name: true,
      email: true,
      phone: true,
    });

    const billingValid = Object.values(billingNewErrors).every((err) => !err);

    // Shipping（如果沒勾同購買者才驗）
    let shippingValid = true;

    if (!sameAsBilling) {
      const shippingNewErrors = {
        name: validateField("name", shippingContact.name),
        email: validateField("email", shippingContact.email),
        phone: validateField("phone", shippingContact.phone),
      };

      setShippingErrors(shippingNewErrors);
      setShippingTouched({
        name: true,
        email: true,
        phone: true,
      });

      shippingValid = Object.values(shippingNewErrors).every((err) => !err);
    }

    // 地址（只有宅配才驗）
    let addressValid = true;

    if (shippingMethod === "home") {
      addressValid = validateAddress();
    }

    return billingValid && shippingValid && addressValid;
  };

  // 非宅配時清空地址
  useEffect(() => {
    if (shippingMethod !== "home") {
      setAddress({
        city: "",
        district: "",
        street: "",
      });
      setAddressErrors({});
    }
  }, [shippingMethod]);

  // 重置表單（訂單完成後）
  const resetCheckout = () => {
    setBillingData({ name: "", email: "", phone: "" });
    setShippingContact({ name: "", email: "", phone: "" });

    setBillingErrors({});
    setBillingTouched({});

    setShippingErrors({});
    setShippingTouched({});

    setAddress({
      city: "",
      district: "",
      street: "",
    });

    setAddressErrors({});

    setShippingMethod("");
    setSameAsBilling(false);
  };

  const value = {
    // Billing
    billingData,
    billingErrors,
    handleBillingChange,
    handleBillingBlur,

    // Shipping
    shippingContact,
    shippingErrors,
    handleShippingChange,
    handleShippingBlur,
    sameAsBilling,
    setSameAsBilling,

    // Address
    address,
    setAddress,
    addressErrors,

    // Shipping method
    shippingMethod,
    setShippingMethod,

    // Validation
    validateAll,

    // Reset
    resetCheckout,
  };

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};

// 自訂 Hook
export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout 必須在 CheckoutProvider 內使用！");
  }
  return context;
};
