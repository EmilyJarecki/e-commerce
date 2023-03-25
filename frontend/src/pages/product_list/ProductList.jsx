import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./productlist.css";
import { getUserToken } from "../../utils/authToken";
import Cart from "../Cart/Cart";
import { Routes, Route } from "react-router-dom";

const ProductList = (props) => {
  const [product, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const token = getUserToken();

  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const categories = Array.from(new Set(product.map((p) => p.category)));

  const filteredProducts = selectedCategory
    ? product.filter((p) => p.category === selectedCategory)
    : product;

  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
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
        <div className="ulList">
          <ul>
            {categories.map((category) => (
              <li key={category}>
                <a
                  className="link view-by"
                  href="#"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </a>
              </li>
            ))}
            <li>
              <a className="link view-by" href="" onClick={() => navigate()}>
                View All
              </a>
            </li>
          </ul>{" "}
        </div>
        <div className="product-container">
          {filteredProducts.map((product, index) => {
            return (
              <div key={index}>
                <button
                  className="wish-button"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>

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

                      <p className="list-prod-price">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>{" "}
                </Link>
              </div>
            );
          })}
        </div>
        <div className="product">
          {token ? (
            <div className="wishlist">
              <h1>Cart</h1>
              {cart?.map((cart, index) => {
                return (
                  <div key={index}>
                    <div>
                      {cart.name} - ${cart.price.toFixed(2)}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}
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
    const storedCartItems = JSON.parse(localStorage.getItem("cart"));
    if (storedCartItems) {
      setCart(storedCartItems);
    }
  }, []);

  return <div>{product ? loaded() : loading()}</div>;
};

export default ProductList;
