import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Reviews = () => {
  const [review, setReview] = useState([]);
  const [newReview, setNewReview] = useState({
    name: "",
    body: "",
  });
  const { id } = useParams();

  const URL = `http://localhost:4000/products/${id}`;

  const getReview = async () => {
    try {
      const res = await fetch(URL);
      const product = await res.json();
      setReview(product.reviews);
      console.log("The reviews: " + review);
      console.log(product.reviews);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(review);

  const handleChange = (e) => {
    setNewReview({ ...newReview, [e.target.name]: e.target.value });
  };

  // POST
  // const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     const currentState = { ...newComment };
  //     try {
  //       const requestOptions = {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(currentState),
  //       };

  //       const commentURL = `https://backend-twitter2.herokuapp.com/comments/${id}`;
  //       const response = await fetch(commentURL, requestOptions);
  //       const createdComment = await response.json();
  //       setComment([...comment, createdComment]);
  //       setNewComment({
  //         name: "",
  //         body: "",
  //       });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  const loaded = () => {
    return (
      <div>
        {review?.map((reviews) => {
          return (<div>
            <p>{reviews.body}</p>
            </div>
            )
        })}
      </div>
    );
  };

  const loading = () => (
    <div>
      <p>Loading...</p>
    </div>
  );

  // INITIATES UPON MOUNT IF THERE IS A COMMENT
  useEffect(() => {
    getReview();
  }, [review.length]);

  return (
    <div>
      <section>{review ? loaded() : loading()}</section>
    </div>
  );
};

export default Reviews;
