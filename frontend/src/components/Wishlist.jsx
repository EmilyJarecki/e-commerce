import React from 'react'
//TODO not working
const Wishlist = ({wishlist}) => {
    console.log({wishlist})
  return (
    <div>
      <h1>Wishlist</h1>
      <ul>
        {wishlist.name}
        {/* {wishlist.map(( name ) => (
          <li>{name}</li>
        ))} */}
      </ul>
    </div>
  )
}

export default Wishlist