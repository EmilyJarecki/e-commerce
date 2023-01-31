import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Category from "../Category";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const coffee = []

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
    for (let i=0; i<products.length; i++){
      if (products[i].category == "coffee"){
        coffee.push(products[i].name)
      }
      else{
        console.log("there are none.")
      }console.log(products[i].category)
      console.log(coffee)
    }
  }
  
  const loaded = () => {
    return (
      <div>
        <section className="sort-by">
          <h4>Coffee</h4>
          <h4>Bowl</h4>
        </section>
        {products?.map((product) => {
          return (
            <div>
              {" "}
              <Link key={product.category} to={`/category/${product.category}`}>
                <p>Category: {product.category}</p>
              </Link>
              <img width="50px" src={product.image} alt={product.name} />
              <Link key={product._id} to={`/shop/${product._id}`}>
                <p>Name: {product.name}</p>
              </Link>
              <p style={{ color: "red" }}>Price: ${product.price}</p>
              ///////////////////////////////////////////
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
  select()
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <h2>The page where all the products will be shown.</h2>
      {products ? loaded() : loading()}
    </div>
  );
};

export default ProductList;
