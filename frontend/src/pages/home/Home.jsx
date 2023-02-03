import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="home-container">
        <Link className="link shop-now " to={"/shop"}>
          VIEW NOW
        </Link>
        <br></br>
      </div>
    </div>
  );
};

export default Home;
