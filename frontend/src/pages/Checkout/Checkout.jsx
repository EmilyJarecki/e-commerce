import React from "react";

import CheckoutProducts from "../../components/CheckoutProducts";
import CheckoutForm from "../../components/CheckoutForm";

const Checkout = () => {

  return (
    <>
      <h1>Checkout</h1>
      <div>
        <CheckoutForm/>
        <CheckoutProducts />
      </div>
    </>
  );
};

export default Checkout;
