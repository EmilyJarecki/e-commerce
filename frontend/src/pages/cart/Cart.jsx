import { Link } from "react-router-dom"
import React, {useState, useEffect} from "react"
import { useParams } from "react-router-dom";


const Cart = (props) => {




  return (
    <div>
        <h5>The cart here will display information.</h5>
        <Link to="/checkout">
                <h5>Go to Checkout</h5>
        </Link>
    </div>
  )


}

export default Cart