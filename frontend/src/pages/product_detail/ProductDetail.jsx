import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Reviews from "../../components/Reviews";


const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [review, setReview] = useState([])
  const [inputText, setInputText] = useState("");
  
  const { id } = useParams();

  const URL = `http://localhost:4000/products/${id}`;
  const reviewsURL = `http://localhost:4000/review/${id}`

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
  const getReviews = async() =>{
    try {
      const res = await fetch(URL);
      const foundReview = await res.json();
      // console.log(foundProduct._id)
      setReview(foundReview);
      console.log("helo")
      console.log(review)
    } catch (err) {
      console.log(err);
    }
  };
  


  // console.log(product._id)
  const loaded = () => {
    return (
      <div>
        <h4>
          <Link to={`/shop`}>
            <p>Return to Product Page</p>
          </Link>
        </h4>
        <img width="50px" src={product.image} alt={product.name} />
        <p>{product.name}</p>
        <p>${product.price}</p>
        <p>{product.description}</p>
        {/* <p>{review}</p> */}
  
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
    getReviews()
  }, []);

  return product ? loaded() : loading();
};

export default ProductDetail;
