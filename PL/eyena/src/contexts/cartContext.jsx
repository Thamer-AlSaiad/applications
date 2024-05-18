import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({
    items: [],
    total: 0,
  });

  useEffect(() => {
    const getCart = localStorage.getItem("cart");
    if (getCart) {
      setCart((prev) => ({
        ...prev,
        ...JSON.parse(getCart),
      }));
    } else {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [setCart]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
