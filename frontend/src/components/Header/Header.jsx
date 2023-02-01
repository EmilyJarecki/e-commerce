import React from "react";
import { Link } from "react-router-dom";
import "./header.css";


const Header = () => {
  return (
    <div className="top-header container">
      <Link className="link" to={"/"}>
        <h4 className="AVIATO ">AVIATO</h4>
      </Link>
      <div className="top-menu text-right list-inline">
        <Link className="link right-icon-words" to={"/cart"}>
          <p className="right-icon-words">Cart</p>
        </Link>
      </div>
    
    </div>
  );
};

export default Header;
