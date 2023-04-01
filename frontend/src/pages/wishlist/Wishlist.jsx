import React, {useState, useEffect} from "react";
import { getUserToken } from "../../utils/authToken";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  const URL = "http://localhost:4000/wishlist";

  const getWishlist = async () => {
    try {
      const res = await fetch(URL);
      const allWishes = await res.json();
      setWishlist(allWishes);
    } catch (err) {
      console.log(err);
    }
  };

  
  useEffect(() => {
    getWishlist()
  }, []);

  return (
    <div>
      <h1>Wishlist</h1>
      {wishlist.map((item) => (
        <div key={item._id}>{item.name}</div>
      ))}
    </div>
  );




  
};

export default Wishlist;
