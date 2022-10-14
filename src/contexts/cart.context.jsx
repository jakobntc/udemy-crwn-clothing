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

const removeCartItem = (cartItems, productToRemove) => {
  if (productToRemove.quantity > 1) {
    return cartItems.map(cartItem => {
      return cartItem.id === productToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity -= 1 }
        : cartItem;
    });
  }
  return cartItems.filter(cartItem => cartItem.id !== productToRemove.id);
};

const deleteCartItem = (cartItems, productToDelete) => {
  return cartItems.filter(cartItem => cartItem.id !== productToDelete.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setCartOpen: () => { },
  cartItems: [],
  totalItems: 0,
  setTotalItems: () => { },
  addItemToCart: () => { },
  removeItemFromCart: () => { },
  deleteItemFromCart: () => { },
});


export const CartProvider = ({ children }) => {
  const [isCartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };

  const deleteItemFromCart = (productToDelete) => {
    setCartItems(deleteCartItem(cartItems, productToDelete))
  };

  useEffect(() => {
    const quantity = cartItems.reduce((quantity, item) => quantity += item.quantity, 0);
    const total = cartItems.reduce((total, item) => total += (item.quantity * item.price), 0);

    setTotalItems(quantity);
    setCartTotal(total);
  }, [cartItems]);

  const value = {
    isCartOpen,
    setCartOpen,
    addItemToCart,
    removeItemFromCart,
    deleteItemFromCart,
    cartItems,
    totalItems,
    cartTotal,
  };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}