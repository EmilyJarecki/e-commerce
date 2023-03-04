import React from 'react'
import ProductList from '../product_list/ProductList'
import { useParams } from 'react-router-dom'

const Cart = ({wishlist}) => {

  // console.log(props.wishlist)
  return (
    <div>
      <h1>Cart</h1>
      {wishlist ? 
      <p>{wishlist}</p> 
      : 
      <p>No items in cart</p>}
      {/* {<ProductList />} */}
    </div>
  )
}

export default Cart