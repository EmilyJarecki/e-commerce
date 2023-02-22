import {createContext} from 'react'
import { useState } from 'react';

const UserContext = createContext()

export {UserContext }

const UserProvider = (props) => {
    const [wishlist, setWishlist] = useState([]);
  
    const updateWishlist = (newWishlist) => {
      setWishlist(newWishlist);
    };
  
    return (
      <UserContext.Provider value={{ wishlist, updateWishlist }}>
        {props.children}
      </UserContext.Provider>
    );
  };
  
  export default UserProvider;