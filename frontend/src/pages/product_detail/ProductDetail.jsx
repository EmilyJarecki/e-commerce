import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ProductDetail = ({ handleClick }) => {
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const { id } = useParams();

  const URL = `http://localhost:4000/products/${id}`;

  // GET ALL INFORMATION ABOUT SINGLE PRODUCT
  const getDetails = async () => {
    try {
      const response = await fetch(URL);
      const foundProduct = await response.json();
      // console.log(foundProduct._id)

      setProduct(foundProduct);
    } catch (err) {
      console.log(err);
    }
  };
// add to cart function 


  // console.log(product._id)
  const loaded = () => {
    return (
      <div>
        <h4>
          <Link to={`/shop`}>
            <p>Return to Product Page</p>
          </Link>
        </h4>
        <button>Add to Cart</button>
        <Link to={`/cart`}>
            <p>View Cart</p>
          </Link>
        <img width="50px" src={product.image} alt={product.name} />
        <p>{product.name}</p>
        <p>${product.price}</p>
        <p>Category: {product.category}</p>
        <p>{product.description}</p>
        <p>Product ID: {product._id}</p>
        {/* TODO: add to cart */}
        {/* <button onClick={()=> handleClick(product)}>Add to Cart</button> */}
      </div>
    );
  };

  const loading = () => {
    return (
      <section className="loading">
        <h1>
          Loading...
          <span>
            <img
              className="spinner"
              src="https://freesvg.org/img/1544764567.png"
            />
          </span>
        </h1>
      </section>
    );
  };
  useEffect(() => {
    getDetails();
  }, []);

  return product ? loaded() : loading();
};

export default ProductDetail;
