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
  // const getUserId = async () => {
  //   try {
  //     const res = await fetch('http://localhost:4000/auth/idName', {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Mjg1ZTZjZmU3MDQ3OGY4NjRlYWU4OSIsImlhdCI6MTY4MDQ4NjAwMywiZXhwIjoxNjgwNTIyMDAzfQ.Swa-1qv6JD_o_vKw1GZhKbm6ZdB13Tx99BrAV2eRv7w`
  //       },
  //     })        
  //     const userID = await res.json()
  //     // console.log(userID)
  //     setId(userID)
  //   } catch (error) {   
  //     console.error(error)
  //   }
  // }
  function getCurrentUserInfo() {
    const token = localStorage.getItem('token'); // assuming the token is stored in localStorage
    fetch('/idName', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      // Do something with the data, such as updating the UI
      console.log(data);
    })
    .catch(error => console.error(error));
  }

  useEffect(() => {
    getCurrentUserInfo()
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
