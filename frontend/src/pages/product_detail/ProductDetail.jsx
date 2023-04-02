import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Reviews from "../../components/Reviews";
import { UserContext } from "../../data";
import { useContext } from "react";
import "./productdetail.css";
import { getUserToken } from "../../utils/authToken";

const ProductDetail = (props) => {
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState([]);

  const token = getUserToken();
  const { id } = useParams();
  const navigate = useNavigate();

  const URL = `https://capstone-commerce.herokuapp.com/products/${id}`;
  
  const addToCart = (product) => {
    const existingItem = cart.find((item) => item._id === product._id);
    if (existingItem) {
      const updatedItem = { ...existingItem, quantity: existingItem.quantity + 1 };
      const updatedCart = cart.map((item) => item._id === product._id ? updatedItem : item);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const newItem = { ...product, quantity: 1 };
      const updatedCart = [...cart, newItem];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };
  // context data
  const { currentUser } = useContext(UserContext);

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
//TODO this isn't working either
  const addToWishlist = async (product) => {
    try {
      const response = await fetch("https://capstone-commerce.herokuapp.com/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE
  const removeProduct = async (e) => {
    try {
      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(URL, options);
      console.log(response);
      navigate("/shop");
    } catch (err) {
      console.log(err);
      navigate(URL);
    }
  };


  useEffect(() => {
    getDetails();
    const data = localStorage.getItem("cart");
    const parsedData = JSON.parse(data);
    if (parsedData !== null) {
      setCart(parsedData);
    }
  }, []);

  const loaded = () => {
    return (
      <div>
        <h4>
          <Link className="link return-to-product-page" to={`/shop`}>
            Return to Product Page
          </Link>
        </h4>
        <section className="detail-card">
          <img
            className="detail-image"
            src={product.image}
            alt={product.name}
          />
          <div className="detail-description-card">
            <h1 className="detail-name">{product.name}</h1>
            <p className="detail-price">${product.price}</p>
            <h4 className="detail-description">{product.description}</h4>
            <div className="p-redirect-div">
              <button
                  className="purchase-redirect"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => addToWishlist(product)}
                >
                  Add to Wishlist
                </button>
            </div>
          </div>
        </section>
        <section className="extra-content">
          <div className="edit-product">
            <div className="reviews-comp">
              <Reviews />
            </div>
          </div>
        </section>
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



  return product ? loaded() : loading();
};

export default ProductDetail;
