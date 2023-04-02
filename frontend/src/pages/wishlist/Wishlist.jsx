import React, { useState, useEffect } from "react";
import { getUserToken } from "../../utils/authToken";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);


  const URL = "http://localhost:4000/wishlist";
  const token = getUserToken();

  const getWishlist = async () => {
    try {
      const res = await fetch(URL, {
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
  
  const deleteWish = async (id) => {
    try {
      const res = await axios.delete(`${URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      getWishlist();
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
          <button onClick={() => deleteWish(item._id)}>Remove from Wishlist</button>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
