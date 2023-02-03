import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Reviews = () => {
  const [review, setReview] = useState([]);
  const [editForm, setEditForm] = useState([]);
  const [newReview, setNewReview] = useState({
    name: "",
    body: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const URL = `http://localhost:4000/products/${id}`;
  const reviewURL = `http://localhost:4000/review/product/${id}`;

  const getReview = async () => {
    try {
      const res = await fetch(URL);
      const product = await res.json();
      setReview(product.reviews);
      console.log(product.reviews)
    } catch (err) {
      console.log(err);
    }
  };
  console.log(review);

  const handleChange = (e) => {
    setNewReview({ ...newReview, [e.target.name]: e.target.value });
  };
  // const handleUpdateChange = (e) => {
  //   setEditForm({ ...editForm, [e.target.name]: e.target.value });
  // };

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
  // UPDATE
  const updatedReview = async (e) => {
    e.preventDefault();
    try {
      const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      };
      const response = await fetch(reviewURL, options);
      const updatedReview = await response.json();
      setReview(updatedReview);

      // REFRESH PAGE
      navigate(0);
    } catch (err) {
      console.log(err);
      navigate(URL);
    }
  };
  const loaded = () => {
    return (
      <div>
        {review?.map((reviews, index) => {
          return (
            <div key={index}>
              <p>
                {reviews.name} says: {reviews.body}
              </p>
              {/* <form className="updateForm" onSubmit={updatedReview}>
                <label>
                  <textarea
                    autoComplete="off"
                    type="text"
                    value={newReview.body}
                    name="body"
                    placeholder="Update Review"
                    onChange={handleUpdateChange}
                  />
                </label>
                <input className="updateButton" type="submit" value="Update" />
              </form> */}
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
        {/* <form className="updateForm" onSubmit={updatedReview}>
          <label>
            <textarea
              autoComplete="off"
              type="text"
              value={newReview.body}
              name="body"
              placeholder="Update Review"
              onChange={handleChange}
            />
          </label>
          <input className="updateButton" type="submit" value="Update" />
        </form> */}
      </div>
    );
  };

  const loading = () => (
    <div>
      <p>No Reviews</p>
    </div>
  );

  // INITIATES UPON MOUNT IF THERE IS A COMMENT
  useEffect(() => {
    getReview();
  }, []);

  return (
    <div>
      <section>{review ? loaded() : loading()}</section>
    </div>
  );
};

export default Reviews;