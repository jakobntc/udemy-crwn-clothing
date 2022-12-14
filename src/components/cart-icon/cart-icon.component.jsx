import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import "./cart-icon.styles.scss";


const CartIcon = () => {

  const { totalItems, isCartOpen, setCartOpen } = useContext(CartContext);

  const toggleIsCartOpen = () => setCartOpen(!isCartOpen);

  return (
    <div
      className="cart-icon-container"
      onClick={toggleIsCartOpen}
    >
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{totalItems}</span>
    </div>
  );
}


export default CartIcon