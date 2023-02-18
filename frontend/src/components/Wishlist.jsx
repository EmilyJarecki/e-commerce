import React, { useState, useEffect }  from 'react'
import axios from 'axios';

const Wishlist = ({user}) => {
  const [wishlist, setWishlist] = useState([]);
  const [productId, setProductId] = useState('');

  useEffect(() => {
    // Load user's wishlist on mount
    getWishlist();
  }, []);

  const getWishlist = async () => {
    try {
      const response = await axios.get(`/api/wishlist/${user._id}`);
      setWishlist(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToWishlist = async () => {
    try {
      await axios.post('/api/wishlist', { userId: user._id, productId });
      setProductId('');
      getWishlist();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>Wishlist</div>
  )
}

export default Wishlist