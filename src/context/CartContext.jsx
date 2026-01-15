import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  //購物車內容
  const [cartItems, setCartItems] = useState([]);

  //加入購物車
  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      //若已有商品，則數量+1
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      // 如果是新商品 → 新增
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images?.[0],
          quantity,
        },
      ];
    });
  };

  // 移除商品
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // 清空購物車
  const clearCart = () => {
    setCartItems([]);
  };

  //提供全站使用
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// 自訂Hook
export const useCart = () => {
  return useContext(CartContext);
};
