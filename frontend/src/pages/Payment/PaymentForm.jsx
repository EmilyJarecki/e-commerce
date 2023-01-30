import React, { useState } from "react";
// CardElement: A flexible single-line input that collects all necessary card details.
import { CardElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
// communicates with data from the backend
import axios from "axios";


const PaymentForm = () => {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    e.preventDefault();

    // Use stripe.createPaymentMethod to convert payment information collected by elements into a PaymentMethod object that you safely pass to your server to use in an API call.
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card", 
      // TODO split this one-liner into 3 lines- number, date, cvc
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:4000/payment", {
          // static data for now
          amount: 1000,
          id,
        });
        if (response.data.success) {
          console.log("successful payment");
          setSuccess(true);
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <>
      {!success ? 
        <form onSubmit={handleSubmit}>
          <fieldset>
            <div>
              <CardElement />
            </div>
          </fieldset>
          <button className="btn btn-main">Submit Payment</button>
        </form>
       : 
        <div>
          <h2>
            Payment Successful!
          </h2>
        </div>
      }
    </>
  );
};

export default PaymentForm;
