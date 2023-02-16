import React from 'react'

const Wishlist = ({wishlist}) => {
  return (
    <div>
      {wishlist.length > 0 ? (
        <ul>
          {wishlist.map((item) => (
            <li>hello</li>
          ))}
        </ul>
      ) : (
        <p>Your wishlist is empty.</p>
      )}
    </div>
  );
}

export default Wishlist