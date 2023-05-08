import React from "react";
import { useEffect, useState } from "react";

const SuccessReview = () => {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("formData");
    const parsedData = JSON.parse(data);
    setFormData(parsedData);
  }, []);

  return (
    <div className="flex justify-center">
      <div>
        <p>Delivery Address</p>
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
      <div>
        <p>Billing Address</p>
        <p>{formData.cardName}</p>
        <p>{formData.billingAddress}</p>
        <p>
          {formData.billingCity}, {formData.billingState} {formData.billingZip}
        </p>
      </div>
      <br />
      <div>
        <p>Payment Method</p>
        <p>*** **** **** {formData.cardNum.slice(-4)}</p>
      </div>
    </div>
  );
};

export default SuccessReview;
