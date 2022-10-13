import { createContext, useState, useEffect } from "react";


const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(item => item.id === productToAdd.id);
  if (existingCartItem) {
    return cartItems.map(cartItem => {
      return cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity += 1 }
        : cartItem
    });
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
  isCartOpen: false,
  setCartOpen: () => { },
  cartItems: [],
  addItemToCart: () => { },
  totalItems: 0,
  setTotalItems: () => { },
});


export const CartProvider = ({ children }) => {
  const [isCartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  useEffect(() => {
    const total = cartItems.reduce((total, item) => total += item.quantity, 0);
    setTotalItems(total);
  }, [cartItems]);

  const value = { isCartOpen, setCartOpen, addItemToCart, cartItems, totalItems };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}