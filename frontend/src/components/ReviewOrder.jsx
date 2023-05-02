import React, { useState } from "react";

const ReviewOrder = () => {
  const [reviewPayOpen, setReviewPayOpen] = useState(false);

  const handleReviewPayClick = () => {
    setReviewPayOpen(!reviewPayOpen);
  };
  return (
    <div className="order-review">
      <h1 onClick={handleReviewPayClick}>Review Order</h1>
      {reviewPayOpen && (
        <div>
            By clicking the “Place Order” button, you confirm you you have read, understand,
and accept our Terms of Sale, Privacy Policy, and Return Policy.
        </div>
      )}
    </div>
  );
};

export default ReviewOrder;
