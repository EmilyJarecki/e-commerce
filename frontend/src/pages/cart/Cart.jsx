import { Link } from "react-router-dom"
import React from "react"


const Cart = () => {
  return (
    <div>
        <h5>The cart here will display information.</h5>
        <h3>Item 1</h3>
        <h3>Item 2</h3>
        <Link to="/checkout">
                <h5>Go to Checkout</h5>
        </Link>
    </div>
  )
}

export default Cart