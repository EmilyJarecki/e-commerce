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
  const reviewURL = "http://localhost:4000/review";

  const getReview = async () => {
    try {
      const res = await fetch(URL);
      const product = await res.json();
      setReview(product.reviews);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(review);

  const handleChange = (e) => {
    setNewReview({ ...newReview, [e.target.name]: e.target.value });
  };

  // POST
  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentState = { ...newReview };
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentState),
      };
      // TODO this needs to be the URL which gets the

      const reviewURL = `http://localhost:4000/review/${id}`;

      const response = await fetch(reviewURL, requestOptions);
      const createdReview = await response.json();
      setReview([...review, createdReview]);
      setNewReview({
        name: "",
        body: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const loaded = () => {
    return (
      <div>
        {review?.map((reviews, index) => {
          return (
            <div key={index}>
              <p>{reviews.body}</p>
            </div>
          );
        })}
        <form onSubmit={handleSubmit} height={300}>
          <div>
            <label>
              <input
                autoComplete="off"
                type="text"
                name="name"
                placeholder="Name"
                value={newReview.name}
                onChange={handleChange}
              />
            </label>
            <label>
              <textarea
                autoComplete="off"
                type="text"
                value={newReview.body}
                name="body"
                placeholder="Create Review"
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="commentButtonDiv">
            <input className="CommentButton" type="submit" value="Reply" />
          </div>
        </form>
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
