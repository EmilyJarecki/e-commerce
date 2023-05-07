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
    <div className="flex flex-col">
      <div className="self-center w-1/2">
        <h1 className="text-center ship-font text-4xl my-12">
          THANKS FOR SHOPPING WITH US!
        </h1>

        <p className="ship-font text-xl text-center">
          We are getting started on your order right now, and you will receive
          an order confirmation email shortly after to{" "}
          <span className="ship-font purple-link-color">{retrieveInfo()}</span>.
          If the email hasn't arrived within two minutes, please check your spam
          folder to see if the email was routed there.
        </p>
      </div>

      <div className="h-32 self-center mt-8 ">
        <p className="ship-font text-3xl font-bold text-center">
          Order #{randomNumber()}
        </p>
        <p className="ship-font text-sm bg-white w-96 flex justify-between p-4 rounded mt-4 shadow-inner shadow-grey-50">
          EXPECTED DELIVERY:{" "}
          <span className="ship-font text-sm font-bold">{addSevenDays()}</span>
        </p>
      </div>
      <div className="self-center mt-4 mb-16 border-purple">
        <Link
          className="ship-font text-base font-medium button-class px-6 py-2 rounded-lg"
          to={`/shop`}
        >
          KEEP SHOPPING
        </Link>
      </div>

      <div className="flex flex-col">
        <div className="bg-white w-80 self-center rounded-lg p-6 leading-8 shadow-inner shadow-grey-50">
          <p className="ship-font text-xl text-center rounded leading-10">
            CONTACT US
          </p>
          <p className="ship-font purple-link-color text-center underline">
            1-800-123-4567
          </p>
          <p className="ship-font purple-link-color text-center underline">
            customerservice@aviato.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Success;
