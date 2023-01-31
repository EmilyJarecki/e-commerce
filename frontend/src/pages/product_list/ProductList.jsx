import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Category from "../Category";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const coffee = []
  const bowl = []

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
        coffee.push(products[i])
      }
      if (products[i].category == "bowl"){
        bowl.push(products[i])
      }
      // console.log(products[i].category)
      console.log(coffee)
      console.log(bowl)
    }
  }
  
  const loaded = () => {
    return (
      <div>
        <section className="sort-by">
          <h2>Sort By:</h2>
          <h4>Coffee</h4>
          <h4>Bowl</h4>              
        </section>
        {coffee.map((coff)=>{
          return(
            <div>
              <h1>{coff.name}</h1>
            </div>
          )
        })}

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
      {products ? loaded() : loading()}
    </div>
  );
};

export default ProductList;
