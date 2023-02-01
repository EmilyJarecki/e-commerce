import React from "react";
import { Link } from "react-router-dom";
import "./home.css";
const Home = () => {
  return (
    <div className="home">
      <div className="home-container">
        <Link className="link shop-now " to={"/shop"}>
          SHOP NOW
        </Link>
        <br></br>
        {/* <Link className="link" to={"/category/coffee"}>
          Coffee
        </Link> */}
      </div>
    </div>
  );
};

export default Home;
