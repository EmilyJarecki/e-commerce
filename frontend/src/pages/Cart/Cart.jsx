import React from "react";
import "./cart.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartData, setCartData] = useState([]);

  // TAX TOTAL
  const getTax = () => {
    const taxRate = 0.07; // 7% tax rate
    return (getTotal() * taxRate).toFixed(2);
  };

  function getItemTotal(quantity, price) {
    return quantity * price;
  }
  const getTotalWithTax = () => {
    const total = parseFloat(getTotal());
    const tax = parseFloat(getTax());
    const shippingPrice = 4.95;
    return (total + tax + shippingPrice).toFixed(2);
  };
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
    <>
      <h1 className="  text-4xl my-12 text-center sm:text-2xl">
        YOUR BAG({cartData.reduce((total, item) => total + item.quantity, 0)})
      </h1>
      <div className="flex justify-center lg:flex-col lg:flex lg:items-center">
        <div className="sm:w-full">
          {cartData && cartData.length !== 0 ? (
            <div className="">
              <Link className="text-lg" to={"/shop"}>
                <h4 className="   underline text-purple-950">
                  Keep Shopping
                </h4>
              </Link>
              {cartData.map((item) => (
                <div
                  className="border-b-2 border-black w-[500px] flex px-4 my-6 pb-6 sm:w-full"
                  key={item._id}
                >
                  <img
                    className="w-[125px] h-[125px] object-cover"
                    src={item.image}
                  />
                  <div className="w-full flex flex-col justify-between">
                    <div className="pl-6">
                      <div className="flex justify-between">
                        <p className="  text-xl">{item.name}</p>
                        <button className="" onClick={() => Delete(item._id)}>
                          <img
                            className="w-[21px]"
                            src="https://img.icons8.com/?size=512&id=dfNWtyRQczfi&format=png"
                          />
                        </button>
                      </div>

                      <p className="  text-xs">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex justify-between pl-6">
                      <div className="flex bg-neutral-100 rounded-lg leading-8 shadow-inner shadow-grey-50 px-4 pl-6">
                        <button
                          className=""
                          onClick={() => removeFromCart(item._id)}
                        >
                          -
                        </button>
                        <p className="mx-4  ">{item.quantity}</p>
                        <button className="" onClick={() => addOne(item._id)}>
                          +
                        </button>
                      </div>
                      <p className=" ">
                        ${getItemTotal(item.quantity, item.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <h1 className="">No Items in Cart</h1>
              <Link className="" to={"/shop"}>
                <h4>Continue Shopping</h4>
              </Link>
            </>
          )}
        </div>
        <div className="w-96">
          <div className="ml-16 pt-4 pb-8 bg-white rounded-lg leading-8 shadow-inner shadow-grey-50 px-4 lg:ml-0">
            <p className="flex justify-between  ">
              SUBTOTAL <span className=" ">${getTotal()}</span>
            </p>
            <p className="flex   justify-between">
              SHIPPING <span className=" ">$4.95</span>
            </p>
            <p className="flex   justify-between">
              ESTIMATED TAX <span className=" ">${getTax()}</span>
            </p>
            <p className="flex   justify-between">
              TOTAL <span className=" ">${getTotalWithTax()}</span>
            </p>
          </div>

          {cartData && cartData.length !== 0 ? (
            <div className="flex mt-4 mb-16 justify-center lg:ml-0">
              <Link
                className="  text-base font-medium button-class px-6 py-2 rounded-lg"
                to={`/checkout`}
              >
                CHECKOUT
              </Link>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
