import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Wishlist from "../../components/Wishlist";
import "./productlist.css";

const ProductList = (props) => {
  const [product, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (product) => {
    setWishlist((prevWishItems) => [...wishlist, product]);
  };
  const removeFromCart = (wish) => {
    setWishlist((prevWishItems) =>
      prevWishItems.filter((wishlist) => wishlist.id !== wish.id)
    );
  };


  const getTotal = () => {
    let total = 0;
    wishlist.forEach((product) => {
      total += product.price;
    });
    return total.toFixed(2);
  };

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
                  <button onClick={() => addToWishlist(product)}>
                    Add to Wishlist
                  </button>{" "}
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
                return (
                  <div key={index}>
                    <div>
                      {wish.name} - ${wish.price}
                    </div>
                    <button onClick={() => removeFromCart(wish)}>remove from cart</button>
                  </div>
                );
              })}
            </div>
            <p>Total: {getTotal()}</p>
          </div>
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
