import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Cart = (props) => {
  const [products, setProducts] = useState([]);


  const URL = "http://localhost:4000/cart/63d9bfdac7a5ef4263ae20f2";

  const getCart = async () => {
    try {
      const res = await fetch(URL);
      const item = await res.json();

      setProducts(item);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(()=>{
    getCart()
  }, [])
  useEffect(()=>{
    console.log(products.products)
  })

  const loaded = () => {
    return (
      <div>
        <Link to="/checkout">
          <h5>Go to Checkout</h5>
        </Link>
        <Link to={`/shop`}>
          <p>Back to Shopping</p>
        </Link>
        {products.products?.map((product, index)=>{
          return (
            <p key={index}>{product.name}</p>
          )
        })}
      </div>
    );
  };

  const loading = () => {
    <h1>There are no items in cart.</h1>;
  };


  return (
    <div>
      <section>{products ? loaded() : loading()}</section>
    </div>
  );


};

export default Cart;
