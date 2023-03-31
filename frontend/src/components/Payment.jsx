import React from "react";

const Payment = () => {
  return (
    <div>
      <h1>Payment</h1>
      <form className="payment">
        <label htmlFor="card-name">Cardholder's Name: </label>
        <input required />

        <p>
          <label htmlFor="card-num">Card Number: </label>
          <input required type="num" maxLength="4" size="4" /> -
          <input required type="num" maxLength="4" size="4" /> -
          <input required type="num" maxLength="4" size="4" /> -
          <input required type="num" maxLength="4" size="4" />
        </p>
        <label htmlFor="exp">Expiration Date:</label>
        <select name="month" id="month">
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
        <select name="year" id="year">
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
          <option value="2028">2028</option>
          <option value="2029">2029</option>
        </select>
        <br />
        <label htmlFor="card-cvv">CVV: </label>
        <input required type="num" maxLength="4" size="4" />
        <br />
      </form>
    </div>
  );
};

export default Payment;

