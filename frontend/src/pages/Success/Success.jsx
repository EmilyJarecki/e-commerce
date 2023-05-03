import React from "react";
import { Link } from "react-router-dom";
const Success = () => {
  const randomNumber = () => {
    const randomNumber = Math.floor(Math.random() * 900000000) + 100000000;
    return randomNumber;
  };
  const addSevenDays = () => {
    let date = new Date();
    // Add five days to current date
    date.setDate(date.getDate() + 7);
    return date.toLocaleDateString();
  };

  const retrieveInfo = () => {
    const storedData = localStorage.getItem("formValues"); // retrieve the JSON string from local storage
    const parsedData = JSON.parse(storedData); // parse the JSON string into a JavaScript object
    const email = parsedData.email; // access the email property of the object
    return email;
  };

  return (
    <>
      <div>
        <h1>THANKS FOR SHOPPING WITH US!</h1>
        <p>
          We are getting started on your order right now, and you will receive
          an order confirmation email shortly after to {retrieveInfo()}. If the
          email hasn't arrived within two minutes, please check your spam folder
          to see if the email was routed there.
        </p>
      </div>
      <div>
        <h3>Order #{randomNumber()}</h3>
        <p>Expected Delivery: {addSevenDays()}</p>
      </div>
      <Link to={`/shop`}>Keep Shopping</Link>
      <div>
        <h4>CONTACT US</h4>
        <p>1-800-123-4567</p>
        <p>customerservice@aviato.com</p>

        
      </div>
    </>
  );
};

export default Success;
