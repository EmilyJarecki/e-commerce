import React, { useState, useEffect } from "react";
import { getUserToken } from "../../utils/authToken";
import { useNavigate } from "react-router-dom";


const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [id, setId] = useState("")
  const token = getUserToken();


  //TODO get ownerId- there is a get route for it
  const getWishlist = async () => {
    try {
      const res = await fetch(`http://localhost:4000/wishlist/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });        
      console.log(token)
      const allWishes = await res.json();
      setWishlist(allWishes);
    } catch (err) {
      console.log(err);
    }
  };

  //TODO this was literally working
  const getUserId = async () => {
    try {
      const res = await fetch('http://localhost:4000/auth/identity', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      })        
      const userID = await res.json()
      console.log(userID)
      setId(userID)
    } catch (error) {   
      console.error(error)
    }
  }


  useEffect(() => {
    getUserId()
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
