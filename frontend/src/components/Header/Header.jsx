import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div style={{"backgroundColor":"beige"}}>
      <Link to={"/"}>
        <h4>The Store</h4>
      </Link>
      <Link to={"/cart"}>
        <h6>Cart</h6>
      </Link>
      <h6>Search</h6>
    </div>
  );
};

export default Header;
