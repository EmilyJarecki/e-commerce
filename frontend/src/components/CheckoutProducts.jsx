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
  const getTotalWithTax= () => {
    const total = parseFloat(getTotal())
    const tax = parseFloat(getTax())
    return (total + tax).toFixed(2)
  }

  useEffect(() => {
    const data = localStorage.getItem("cart");
    const parsedData = JSON.parse(data);
    if (parsedData !== null) {
      setCartData(parsedData);
    }
  }, []);

  return (
    <div className="">
      {cartData.map((item) => (
        <div className="" key={item._id}>
          <div className="">
            <img className="cart-product-image" src={item.image} />
          </div>

          <p className="">
            {item.name}- Qty. {item.quantity}
          </p>
          <p className="">Individual Item Cost: ${item.price.toFixed(2)}</p>
          <p className="">
            Individual Cost x qty= $
            {getItemTotal(item.quantity, item.price).toFixed(2)}
          </p>
        </div>
      ))}
      <div>-----------------------------------------------------</div>
      <p className="">Total of Items: ${getTotal()}</p>
      <p>Tax: ${getTax()}</p>
      <p>Total to Pay: ${getTotalWithTax()}</p>
    </div>
  );
};

export default CheckoutProducts;
