import { createContext, useContext, useState } from "react";

//建立
const ToastContext = createContext();

//提供
export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = (message, duration = 2000) => {
    setToast({ message });

    setTimeout(() => {
      setToast(null);
    }, duration);
  };
  return (
    <ToastContext.Provider value={{ toast, showToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast 必須在 ToastProvider 內部使用");
  }
  return context;
};
