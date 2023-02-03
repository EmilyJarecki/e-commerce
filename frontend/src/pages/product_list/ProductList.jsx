import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./productlist.css";

const ProductList = () => {
  const [product, setProducts] = useState([]);

  const URL = "https://capstone-commerce.herokuapp.com/products"

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
      <div className="product-container">
        {product?.map((product, index) => {
          return (
            <div key={index}>
              <div
                className="product-item"
                style={{ border: "3px solid black" }}
              >
                <img
                  className="product-image"
                  src={product.image}
                  alt={product.name}
                />
                <div className="product-content">
                  <Link className="link" key={product._id} to={`/shop/${product._id}`}>
                    <p>{product.name}</p>
                  </Link>
                  <p className="price">${product.price}</p>
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

  return <div>{product ? loaded() : loading()}</div>;
};

export default ProductList;
