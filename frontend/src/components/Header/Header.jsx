import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import Search from "../Search";
import { getUserToken } from "../../utils/authToken";

const Header = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    const token = getUserToken();
    if (token) {
      fetch('/auth/name', {
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      })
      .then(response => response.json())
      .then(data => {
        setName(data.name);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
    }
  }, []);

  return (
    <div className="top-header container">
              <Link className="link reg-log header-link" to="/auth">Login/Logout</Link>
      <Link className="link header-link" to={"/shop"}>
        <h4 className="AVIATO ">AVIATO</h4>
      </Link>
      <Link className="link product-list-link header-link" to={"/cart"}>
        <h3 className="view-all">Cart</h3>
      </Link>
      {name && <p>Welcome, {name}!</p>}
      <div className="top-menu text-right list-inline header-link">
        <Search />
      </div>
    </div>
  );
};

export default Header;
