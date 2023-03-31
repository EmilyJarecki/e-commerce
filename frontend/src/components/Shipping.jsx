import React from "react";

const Shipping = () => {
  /*
email
shipping name
address
city
zip
state 
country (USA)(select)
*/

  return (
    <div>
        <h1>Shipping</h1>
      <label htmlFor="email">Email: </label>
      <input
        type="email"
        id="email"
        pattern=".+@globex\.com"
        size="30"
        required
      />
      <br />
      <label htmlFor="card-phone">Phone: </label>
      <input type="num" maxLength="9" size="9" required />
      <br />

      <label htmlFor="card-name">Name: </label>
      <input required />
      <br />

      <label htmlFor="address">Address: </label>
      <input type="text" required />
      <br />

      <label htmlFor="city">City: </label>
      <input type="text" required />
      <br />

      <label htmlFor="zip">Zip: </label>
      <input type="num" maxLength="5" size="5" required />
      <br />

      <label htmlFor="state">State: </label>
      <input type="text" maxLength="2" size="2" required />
      <br />

      <label htmlFor="country">Country: </label>
      <input type="text" required />
    </div>
  );
};

export default Shipping;
