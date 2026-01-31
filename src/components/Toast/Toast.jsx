import "./Toast.css";
import { useToast } from "../../context/ToastContext";
import { useState, useEffect } from "react";

const Toast = () => {
  const { toast } = useToast();
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (!toast) return;

    setHide(false);

    const timer = setTimeout(() => {
      setHide(true);
    }, 1600);

    return () => clearTimeout(timer);
  }, [toast]);

  if (!toast) return null;

  return <div className={`toast ${hide ? "hide" : ""}`}>{toast.message}</div>;
};

export default Toast;
