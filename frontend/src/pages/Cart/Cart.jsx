import React from 'react'
import ProductList from '../product_list/ProductList'
import { useParams } from 'react-router-dom'


const Cart = (props) => {

  console.log(props.wishlist)
  return (
    <div>
      <h1>This is the cart page</h1>
      {props.wishlist ? 
      <p>{props.wishlist}</p> 
      : 
      <p>No items in cart</p>}
    </div>
  )
}

export default Cart