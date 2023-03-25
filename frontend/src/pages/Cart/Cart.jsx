import React from "react";
import "./cart.css";
import { useState, useEffect } from "react";

const Cart = () => {
  const [cartData, setCartData] = useState([]);

  const removeFromCart = (itemId) => {
    const updatedCart = cartData.filter((item) => item._id !== itemId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartData(updatedCart);
  };

  // PRICE TOTAL
  const getTotal = () => {
    let total = 0;
    cartData.forEach((product) => {
      total += (product.price*product.quantity);
    });
    return total.toFixed(2);
  };

  useEffect(() => {
    const data = localStorage.getItem("cart");
    const parsedData = JSON.parse(data);
    setCartData(parsedData);
  }, []);

  return (
    <div className="cart-div">
      <div>
        {cartData.length !== 0 ? (
          <div>
            {cartData.map((item) => (
              <div className="cart-status" key={item._id}>
                <div>
                  <button
                    className="wish-button"
                    onClick={() => removeFromCart(item._id)}
                  >
                    <img
                      src="https://img.icons8.com/material-sharp/512/delete-sign.png"
                      className="remove-wish"
                    />
                  </button>
                  <img className="product-image" src={item.image} />
                </div>
                <p>{item.quantity}</p>
                <p className="cart-item-name">{item.name}</p>
                <p className="cart-item-price">{item.price.toFixed(2)}</p>
              </div>
            ))}
            <p>Total: ${getTotal()}</p>
          </div>
        ) : (
          <h1>No Items in Cart</h1>
        )}
      </div>
    </div>
  );
};

export default Cart;
