import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // 初始化購物車狀態，從localStorage讀取
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem("cartItems");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.log("購物車讀取失敗:", error);
      return [];
    }
  });

  // cartItem 改變時，同步修改localStorage
  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch (error) {
      console.log("購物車儲存失敗:", error);
    }
  }, [cartItems]);

  // 加入購物車
  const addToCart = (product, { quantity = 1, flavor = null }) => {
    console.log("addToCart flavor:", flavor);

    setCartItems((prev) => {
      const cartItemId = flavor ? `${product.id}-${flavor}` : product.id;

      const existing = prev.find((item) => item.cartItemId === cartItemId);

      // 如果商品存在，則數量+1
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      // 新增商品
      return [
        ...prev,
        {
          cartItemId,
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.images?.[0],
          flavor,
          quantity,
        },
      ];
    });
  };

  // 移除商品
  const removeFromCart = (cartItemId) => {
    setCartItems((prev) =>
      prev.filter((item) => item.cartItemId !== cartItemId)
    );
  };

  // 計算總金額

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
