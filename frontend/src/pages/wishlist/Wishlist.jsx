import React, { useState, useEffect } from "react";
import { getUserToken } from "../../utils/authToken";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const token = getUserToken();

  //TODO get ownerId- there is a get route for it
  const getWishlist = async () => {
    try {
      const res = await fetch(`http://localhost:4000/wishlist`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const allWishes = await res.json();
      setWishlist(allWishes);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <div>
      <h1>Wishlist</h1>
      {wishlist.map((item) => (
        <div key={item._id}>
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
