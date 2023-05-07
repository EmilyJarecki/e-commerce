import React from "react";

import CheckoutProducts from "../../components/CheckoutProducts";
import CheckoutForm from "../../components/CheckoutForm";

const Checkout = () => {
  return (
    <>
      <h1 className="text-center ship-font text-4xl my-12">CHECKOUT</h1>
      <div className="flex justify-center lg:flex-col-reverse">
        <CheckoutForm />
        <CheckoutProducts />
      </div>
    </>
  );
};

export default Checkout;
