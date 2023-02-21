import React from 'react'
import ProductList from '../product_list/ProductList'

const Cart = (props) => {
  console.log(props.wishlist)
  return (
    <div>
      <h1>hello</h1>
      <h2>{props.wishlist.map((item)=>(
        <div>{item.price}</div>
      ))}</h2>
    </div>
  )
}

export default Cart