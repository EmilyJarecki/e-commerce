import React from "react";

import CheckoutProducts from "../../components/CheckoutProducts";
import CheckoutForm from "../../components/CheckoutForm";

const Checkout = () => {
  return (
    <>
      <h1 className="text-center   text-4xl my-12 sm:text-2xl">CHECKOUT</h1>
      <div className="flex justify-center lg:flex-col-reverse lg:flex lg:items-center">
        <CheckoutForm className="" />
        <CheckoutProducts className="" />
      </div>
    </>
  );
};

export default Checkout;
