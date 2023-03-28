import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import Search from "../Search";

const Header = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    fetch("/auth/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserName(data.name);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="top-header container">
              <Link className="link reg-log header-link" to="/auth">Login/Logout</Link>
      <Link className="link header-link" to={"/shop"}>
        <h4 className="AVIATO ">AVIATO</h4>
      </Link>
      {userName && <p>Welcome, {userName}!</p>}
      <Link className="link product-list-link header-link" to={"/cart"}>
        <h3 className="view-all">Cart</h3>
      </Link>
      

      <div className="top-menu text-right list-inline header-link">
        <Search />
      </div>
    </div>
  );
};

export default Header;
