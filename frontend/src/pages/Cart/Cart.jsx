import React from "react";
import "./cart.css";
const Cart = ({ wishlist }) => {
  return (
    <div className="cart-div">
      <h1 className="cart-title"><span className="cart-name">Cart</span></h1>

      <div className="cart-status">{wishlist ? <p>{wishlist}</p> : <p>No items in cart</p>}</div>
    </div>
  );
};

export default Cart;
