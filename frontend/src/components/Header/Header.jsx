import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import Search from "../Search";
import { getUserToken } from "../../utils/authToken";

const Header = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      const token = getUserToken();
      if (token) {
        const response = await fetch("https://capstone-commerce.herokuapp.com/auth/name", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setUserName(data.name);
        } else {
          console.error(data.message);
        }
      }
    };
    fetchUserName();
  }, []);

  return (
    <div className="top-header container">
      <Link className="link reg-log header-link" to="/auth">
        Login/Logout
      </Link>
      <h1>{userName && <p className="user-name">hello___{userName}</p>}</h1>

      <Link className="link header-link" to={"/shop"}>
        <h4 className="AVIATO ">AVIATO</h4>
      </Link>
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
