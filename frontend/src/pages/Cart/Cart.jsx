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
      <h1>Cart </h1>
      <div className="cart-status">
        {cartData.length !== 0 ? (
          <div>
            {cartData.map((item) => (
              <div>
                <p key={item.id}>{item.name}</p>
                <p>{item.price}</p>
              </div>
            ))}
          </div>
        ) : (
          <h1>No Items in Cart</h1>
        )}
      </div>
    </div>
  );
};

export default Cart;
