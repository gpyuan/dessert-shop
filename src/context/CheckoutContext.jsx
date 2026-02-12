import { createContext, useContext, useEffect, useState } from "react";

const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  // 購買人資訊
  const [billingData, setBillingData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // 運送資訊
  const [shippingMethod, setShippingMethod] = useState("");
  const [sameAsBilling, setSameAsBilling] = useState(false);

  const [shippingContact, setShippingContact] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [address, setAddress] = useState({
    city: "",
    district: "",
    street: "",
  });

  // 勾選同購買者資訊時帶入
  useEffect(() => {
    if (sameAsBilling) {
      setShippingContact({
        name: billingData.name,
        email: billingData.email,
        phone: billingData.phone,
      });
    }
  }, [sameAsBilling, billingData]);

  const handleShippingContactChange = (e) => {
    const { name, value } = e.target;
    setShippingContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 訂單資訊（送出後儲存）
  const [orderInfo, setOrderInfo] = useState(null);

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

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateAll = () => {
    const nameError = validateField("name", billingData.name);
    const emailError = validateField("email", billingData.email);
    const phoneError = validateField("phone", billingData.phone);

    const newErrors = { name: nameError, email: emailError, phone: phoneError };
    setErrors(newErrors);
    setTouched({ name: true, email: true, phone: true });

    return !nameError && !emailError && !phoneError;
  };

  // 重置表單（訂單完成後）
  const resetCheckout = () => {
    setBillingData({ name: "", email: "", phone: "" });
    setShippingMethod("");
    setAddress({ city: "", district: "", street: "" });
    setErrors({});
    setTouched({});
  };

  const value = {
    // ===== 購買人 =====
    billingData,
    handleBillingChange,
    handleBlur,
    errors,

    // ===== 收件人 =====
    shippingContact,
    handleShippingContactChange,
    sameAsBilling,
    setSameAsBilling,

    // ===== 運送 =====
    shippingMethod,
    setShippingMethod,
    address,
    setAddress,

    // ===== 訂單 =====
    orderInfo,
    setOrderInfo,

    // ===== 其他 =====
    validateAll,
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
