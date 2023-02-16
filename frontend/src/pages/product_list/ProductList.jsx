import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Wishlist from "../../components/Wishlist";
import "./productlist.css";

const ProductList = () => {
  const [product, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (product) => {
    setWishlist([...wishlist, product]);
    console.log(wishlist)
  }


  const URL = "https://capstone-commerce.herokuapp.com/products";

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
      <div className="product-list">
        <div>
          <div className="product-container">
            {product?.map((product, index) => {
              return (
                <div key={index}>                
                <button onClick={() => addToWishlist(product)}>Add to Wishlist</button>
                  {" "}
                  <Link
                    className="link"
                    key={product._id}
                    to={`/shop/${product._id}`}
                  >
                    <div className="product-item">
                      <img
                        className="product-image"
                        src={product.image}
                        alt={product.name}
                      />
                      <div className="product-content">
                        <p className="list-prod-name">{product.name}</p>

                        <p className="list-prod-price">${product.price}</p>
                      </div>
                    </div>{" "}
                  </Link>
 
                </div>
              );
            })}
            <div>
              {wishlist?.map((wish, index) => {
                return(
                  <div key={index}>
                    {wish.name}
                  </div>
                )
              })}
            </div>
          </div>
          {/* <div>
            {wishlist?.map((wish, index) => {
              return(
                <div key={index}>
                  {wish}
                </div>
              )
            })}
          </div> */}
        </div>
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
