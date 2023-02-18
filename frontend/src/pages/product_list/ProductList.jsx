import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Wishlist from "../../components/Wishlist";
import "./productlist.css";
import { UserContext } from "../../data";
import { useContext } from "react";
import { getUserToken } from "../../utils/authToken";

const ProductList = (props) => {
  const [product, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const token = getUserToken();
  // context data
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const categories = Array.from(new Set(product.map((p) => p.category)));

  const filteredProducts = selectedCategory
    ? product.filter((p) => p.category === selectedCategory)
    : product;

  const addToWishlist = (product) => {
    const updatedWishlist = [...wishlist, product]
    setWishlist(updatedWishlist)
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist))
  };

const removeFromWishlist = (id) => {
  const updatedWishlist = wishlist.filter((wish) => wish._id !== id)
  setWishlist(updatedWishlist)
  localStorage.setItem('wishlist', JSON.stringify(updatedWishlist))

}
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
        <ul>
          <div className="product-container">
            {filteredProducts.map((product, index) => {
              return (
                <div key={index}>
                  {token ? (
                    <button
                      className="wish-button"
                      onClick={() => addToWishlist(product)}
                    >
                      Add to Cart
                    </button>
                  ) : null}
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
        </ul>
        <div className="product-container">
          <div className="wishlist">
            {" "}
            <h1>Cart</h1>
            {wishlist?.map((wish, index) => {
              return (
                <div key={index}>
                  <div>
                    {" "}
                    <button
                      className="wish-button"
                        onClick={() => removeFromWishlist(wish._id)}
                    >
                      <img
                        src="https://img.icons8.com/material-sharp/512/delete-sign.png"
                        className="remove-wish"
                      />
                    </button>
                    {wish.name} - ${wish.price}
                  </div>
                </div>
              );
            })}
          </div>
          {/* <p>Total: {getTotal()}</p> */}
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
    getProducts()
    const storedWishlistItems = JSON.parse(localStorage.getItem('wishlist'))
    if (storedWishlistItems){
      setWishlist(storedWishlistItems)
    }
  }, []);

  return <div>{product ? loaded() : loading()}</div>;
};

export default ProductList;
