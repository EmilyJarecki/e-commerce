import React, {useState} from "react";
import Payment from "../../components/Payment";
import Shipping from "../../components/Shipping";
import { Link } from "react-router-dom";

const Checkout = () => {
    const [paymentSuccess, setPaymentSuccess] = useState(false);


  function clearLocalStorage() {
    localStorage.removeItem("cart");
  }

  function handlePayClick() {
    const inputs = document.querySelectorAll("input[required]");

    // Check if all required input fields are filled
    const allFieldsFilled = Array.from(inputs).every(
      (input) => input.value !== ""
    );

    if (allFieldsFilled) {
      clearLocalStorage();
      setPaymentSuccess(true);
    } else {
      alert("Please fill out all required fields.");
    }
  }


  return (
    <div>
      <Link className="link" to={"/cart"}>
        <h4>Go Back to Cart</h4>
      </Link>
      <Shipping />
      <Payment />
      <button onClick={handlePayClick}>Complete Purchase</button>
      {paymentSuccess && <p>Payment successful!</p>}

    </div>
  );
};

export default Checkout;
