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
    const storedData = localStorage.getItem("formData"); // retrieve the JSON string from local storage
    const parsedData = JSON.parse(storedData); // parse the JSON string into a JavaScript object
    const email = parsedData.email; // access the email property of the object
    return email;
  };

  return (
    <div className="">
      <div>
        <h1  className="text-center ship-font text-4xl my-12">THANKS FOR SHOPPING WITH US!</h1>
        <p className="ship-font text-xl text-center">
          We are getting started on your order right now, and you will receive
          an order confirmation email shortly after to <span className="ship-font purple-link-color">{retrieveInfo()}</span>. If the
          email hasn't arrived within two minutes, please check your spam folder
          to see if the email was routed there.
        </p>
      </div>
      <div>
        <h3 className="ship-font text-3xl font-bold">Order #{randomNumber()}</h3>
        <p className="ship-font text-sm">Expected Delivery: <span className="ship-font text-sm font-bold">{addSevenDays()}</span></p>
      </div>
      <Link  className="ship-font text-base font-medium button-class px-6 py-2 rounded-lg" to={`/shop`}>KEEP SHOPPING</Link>
      <div className="bg-white">
        <p className="ship-font text-xl">CONTACT US</p>
        <p className="ship-font purple-link-color">1-800-123-4567</p>
        <p className="ship-font purple-link-color">customerservice@aviato.com</p>

        
      </div>
    </div>
  );
};

export default Success;
