import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Reviews from "../../components/Reviews";
import "./productdetail.css";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [review, setReview] = useState("");
  const [inputText, setInputText] = useState("");

  const { id } = useParams();

  const URL = `http://localhost:4000/products/${id}`;

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

  const loaded = () => {
    return (
      <div>
        <h4>
          <Link className="link return-to-product-page" to={`/shop`}>
            Return to Product Page
          </Link>
        </h4>
        <section className="detail-card">
          <img className="detail-image" src={product.image} alt={product.name} />
          <div className="detail-description-card">


          <h1 className="detail-name">{product.name}</h1>
          <p className="detail-price">${product.price}</p>
          <h4 className="detail-description">{product.description}</h4>
          <p>
            <a className="link shop-product" href="{product.shopping}">
              SHOP NOW
            </a>
          </p>
          </div>          
        </section>

        <Reviews />
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

  useEffect(() => {
    getDetails();
    // getReviews();
  }, []);

  return product ? loaded() : loading();
};

export default ProductDetail;
