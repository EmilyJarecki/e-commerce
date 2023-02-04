import React from "react";
import { Link } from "react-router-dom";
import "./header.css";
import Search from "../Search";

const Header = () => {
  return (
    <div className="top-header container">
      <Link className="link create-product-link" to={"/add"}>
        <h6 className="add-a-product">Add a product</h6>
      </Link>

      <Link className="link" to={"/"}>
        <h4 className="AVIATO ">AVIATO</h4>
      </Link>
      <div className="top-menu text-right list-inline">
        <Search />
      </div>
    </div>
  );
};

export default Header;
