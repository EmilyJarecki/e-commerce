import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./productlist.css"

const ProductList = () => {
  const [products, setProducts] = useState([]);


  const URL = "http://localhost:4000/products";

  const getProducts = async () => {
    try {
      const res = await fetch(URL);
      const allProducts = await res.json();
      setProducts(allProducts);
    } catch (err) {
      console.log(err);
    }
  };

  const loaded = () => {
    return (
      <div>
        {products?.map((product, index) => {
          return (


            <div key={index} className="product-container">
              <div
                className="product-item"
                style={{ border: "3px solid black" }}
              >
                <img className="product-image" src={product.image} alt={product.name} />
                <div className="product-content">
                  <Link key={product._id} to={`/shop/${product._id}`}>
                    <p>Name: {product.name}</p>
                  </Link>
                  <p style={{ color: "red" }}>Price: ${product.price}</p>
                </div>
              </div>
            </div> 
          );
        })}
      </div>
    );
  };

  const loading = () => (
    <section className="loading">
      <h1>
        Loading...
        <span>
          <img
            className="spinner"
            src="https://freesvg.org/img/1544764567.png"
          />{" "}
        </span>
      </h1>
    </section>
  );


  useEffect(() => {
    getProducts();
  }, []);

  return <div>{products ? loaded() : loading()}</div>;
};

export default ProductList;
