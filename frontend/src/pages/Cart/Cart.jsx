import React from "react";
import "./cart.css";
import { useState, useEffect } from "react";

const Cart = () => {
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("cart");
    const parsedData = JSON.parse(data);
    setCartData(parsedData);
  }, []);

  return (
    <div className="cart-div">
      {" "}
      <h1>Cart Page</h1>
      {cartData.map((item) => (
        <p key={item.id}>{item.name}</p>
      ))}
    </div>
  );
};

export default Cart;
