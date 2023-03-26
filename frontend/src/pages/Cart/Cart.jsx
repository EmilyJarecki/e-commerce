import React from "react";
import "./cart.css";
import { useState, useEffect } from "react";

const Cart = () => {
  const [cartData, setCartData] = useState([]);

  const removeFromCart = (itemId) => {
    let updatedCart = [...cartData];
    let itemIndex = updatedCart.findIndex((item) => item._id === itemId);
    if (itemIndex !== -1) {
      updatedCart[itemIndex].quantity -= 1;
      if (updatedCart[itemIndex].quantity === 0) {
        updatedCart.splice(itemIndex, 1);
      }
    }
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartData(updatedCart);
  };

  const addOne = (itemId) => {
    let updatedCart = [...cartData];
    let itemIndex = updatedCart.findIndex((item) => item._id === itemId);
    if (itemIndex !== -1) {
      updatedCart[itemIndex].quantity += 1;
    }
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartData(updatedCart);
  };

  const Delete = (itemId) => {
    let updatedCart = [...cartData];
    let itemIndex = updatedCart.findIndex((item) => item._id === itemId);
    if (itemIndex !== -1) {
      updatedCart.splice(itemIndex, 1);
    }
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartData(updatedCart);
  };

  // PRICE TOTAL
  const getTotal = () => {
    let total = 0;
    cartData.forEach((product) => {
      total += product.price * product.quantity;
    });
    return total.toFixed(2);
  };

  useEffect(() => {
    const data = localStorage.getItem("cart");
    const parsedData = JSON.parse(data);
    if (parsedData !== null) {
      setCartData(parsedData);
    }
  }, []);

  return (
    <div className="cart-div">
      <div className="cart-map">
        {cartData && cartData.length !== 0 ? (
          <div className="item-strip">
            {cartData.map((item) => (
              <div className="cart-status" key={item._id}>  
              <div className="cart-btn-sec">              
                <button
                  className="delete-comp"
                  onClick={() => Delete(item._id)}
                >
                  X
                </button>
                <img className="cart-product-image" src={item.image} />
                </div>              

                <p className="cart-item-name">{item.name}</p>
                <div className="quantity-sec">
                  <p className="cart-quant-int">{item.quantity}</p>
                  <div className="two-cart-buttons">
                    <button
                      className="one-more"
                      onClick={() => addOne(item._id)}
                    >
                      +
                    </button>
                    <button
                      className="one-less"
                      onClick={() => removeFromCart(item._id)}
                    >
                      -
                    </button>
                  </div>
                </div>
                <p className="cart-item-price">${item.price.toFixed(2)}</p>

              </div>
            ))}
          </div>
        ) : (
          <h1 className="no-items">No Items in Cart</h1>
        )}
        <p className="cart-total">Total: ${getTotal()}</p>
      </div>
    </div>
  );
};

export default Cart;
