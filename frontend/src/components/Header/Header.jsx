import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import Search from "../Search";
import { getUserToken, clearUserToken } from "../../utils/authToken";

const Header = () => {
  const [userName, setUserName] = useState("");
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const fetchUserName = async () => {
      const token = getUserToken();
      if (token) {
        const response = await fetch(
          "https://capstone-commerce.herokuapp.com/auth/name",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setUserName(data.name);
        } else {
          console.error(data.message);
        }
      }
    };
    fetchUserName();

    // const data = localStorage.getItem("cart");
    // const parsedData = JSON.parse(data);
    // if (parsedData !== null) {
    //   setCartData(parsedData);
    // }
  }, []);

  const handleLogout = () => {
    // Clear the user name when the user logs out
    setUserName("");
    clearUserToken();
  };

  return (
    <div className="top-header container">
      <Link
        className="link reg-log header-link"
        to="/auth"
        onClick={handleLogout}
      >
        {userName ? "Logout" : "Login/Register"}
      </Link>
      <h4 className="name-place">
        {userName && (
          <>
            <p className="user-name">Hello, {userName}</p>
          </>
        )}
      </h4>
      <>
        {userName ? (
          <>
            <Link
              className="link product-list-link header-link"
              to={"/wishlist"}
            >
              <h3 className="view-all">Wishlist</h3>
            </Link>
          </>
        ) : (
          ""
        )}
      </>
      <Link className="link header-link" to={"/shop"}>
        <h4 className="AVIATO ">AVIATO</h4>
      </Link>
      <Link className="link product-list-link header-link" to={"/cart"}>
        <img
          className="w-[21px]"
          src="https://img.icons8.com/?size=512&id=3686&format=png"
        />
        {/* {cartData.reduce((total, item) => total + item.quantity, 0)} */}
      </Link>
      <div className="top-menu text-right list-inline header-link">
        <Search />
      </div>
    </div>
  );
};

export default Header;
