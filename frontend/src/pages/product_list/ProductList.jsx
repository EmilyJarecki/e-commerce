import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Category from "../../components/Category";
import "./productlist.css"

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const coffee = [];
  const bowl = [];

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

  const select = () => {
    for (let i = 0; i < products.length; i++) {
      if (products[i].category == "coffee") {
        coffee.push(products[i]);
      }
      if (products[i].category == "bowl") {
        bowl.push(products[i]);
      }
      // console.log(products[i].category)
      console.log(coffee);
      console.log(bowl);
    }
  };

  const loaded = () => {
    return (
      <div>
        <section className="sort-by">
          <h2>View by Category:</h2>
          <h4>Coffee</h4>
          {coffee.map((coff) => {
            return (
              <div>
                <h5>----{coff.name}</h5>
              </div>
            );
          })}
          <h4>Bowl</h4>
          {bowl.map((bowl) => {
            return (
              <div>
                <h5>----{bowl.name}</h5>
              </div>
            );
          })}
        </section>

        {products?.map((product) => {
          return (


            <div className="product-container">
              <div
                className="product-item"
                style={{ border: "3px solid black" }}
              >
                <img width="100px" src={product.image} alt={product.name} />
                <Link to={`/category/${product.category}`}>
                  Category: {product.category}
                </Link>
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

  select();

  useEffect(() => {
    getProducts();
  }, []);

  return <div>{products ? loaded() : loading()}</div>;
};

export default ProductList;
