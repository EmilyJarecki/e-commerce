import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import Search from "../Search";
import { getUserToken, clearUserToken } from "../../utils/authToken";

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

  const handleLogout = () => {
    // Clear the user name when the user logs out
    setUserName("");
    clearUserToken();
  };

  return (
    <div className="top-header container">
        <Link className="link reg-log header-link" to="/auth" onClick={handleLogout}>
        {userName ? "Logout" : "Login"}
      </Link>
      <h4>{userName && <p className="user-name">Hello, {userName}</p>}</h4>

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
