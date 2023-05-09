import React from "react";
import { useEffect, useState } from "react";

const SuccessReview = () => {
  const [formData, setFormData] = useState([]);
const [formNum, setFormNum] = useState("")

let lastFour = formNum.slice(-4)

  useEffect(() => {
    const data = localStorage.getItem("formData");
    const parsedData = JSON.parse(data);
    setFormData(parsedData);
    setFormNum(parsedData.cardNum)
    console.log(parsedData.cardNum)
  }, []);

  return (
    <div className="flex justify-center sm:flex-col">
      <div className="text-sm">
        <p className="mb-4 underline">Delivery Address</p>
        <p>
          {formData.firstName} {formData.lastName}
        </p>
        <p>{formData.shippingAddress}</p>
        <p>
          {formData.shippingCity}, {formData.shippingState}{" "}
          {formData.shippingZip}
        </p>
      </div>
      <br />
      <div className="text-sm mx-16 sm:mx-0">
        <p className="mb-4 underline">Billing Address</p>
        <p>{formData.cardName}</p>
        <p>{formData.billingAddress}</p>
        <p>
          {formData.billingCity}, {formData.billingState} {formData.billingZip}
        </p>
      </div>
      <br />
      <div className="text-sm">
        <p className="underline mb-4">Payment Method</p>
        <p>**** **** **** {lastFour}</p>
      </div>
    </div>
  );
};

export default SuccessReview;
