import React, { useState, useEffect } from "react";

const CheckoutProducts = () => {
  const [cartData, setCartData] = useState([]);

  // PRICE TOTAL
  const getTotal = () => {
    let total = 0;
    cartData.forEach((product) => {
      total += product.price * product.quantity;
    });
    return total.toFixed(2);
  };

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

  useEffect(() => {
    const data = localStorage.getItem("cart");
    const parsedData = JSON.parse(data);
    if (parsedData !== null) {
      setCartData(parsedData);
    }
  }, []);

  return (
    <div className=" bg-stone-100 rounded h-4/5 lg:w-2/3 lg:mb-12 md:w-full">
      <div className="overflow-y-auto h-96 w-96 pt-8 ship-font lg:w-full">
        {cartData.map((item) => (
          <div className="flex justify-center mx-4 mb-4 " key={item._id}>

            <div className="">
              <img
                className="w-[125px] h-[125px] object-cover"
                src={item.image}
              />
            </div>

            <div className="w-72 ml-4 ship-font">
              <p className="text-xl">{item.name}</p>
              <div className="flex justify-between">
                <p className="text-xs">${item.price.toFixed(2)}</p>
                <p className="justify-self-end">
                  ${getItemTotal(item.quantity, item.price).toFixed(2)}
                </p>
              </div>
              <p className="text-xs">qty: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mx-8 pt-4 pb-8 t-blak mt-4">
        <p className="flex justify-between ">SUBTOTAL <span className="">${getTotal()}</span></p>
        <p className="flex  justify-between">
          SHIPPING <span className="ship-font">$4.95</span>
        </p>
        <p className="flex b-blak justify-between pb-4">
          ESTIMATED TAX <span className="">${getTax()}</span>
        </p>
        <p className="flex justify-between pt-4">
          TOTAL <span className="">${getTotalWithTax()}</span>
        </p>
      </div>
    </div>
  );
};

export default CheckoutProducts;
