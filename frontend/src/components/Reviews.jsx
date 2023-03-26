import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserToken } from "../utils/authToken";

const Reviews = () => {
  const [review, setReview] = useState([]);
  const [newReview, setNewReview] = useState({
    name: "",
    body: "",
  });
  const { id } = useParams();
  const token = getUserToken();
  const navigate = useNavigate();

  const URL = `https://capstone-commerce.herokuapp.com/products/${id}`;
  const reviewpostURL = `https://capstone-commerce.herokuapp.com/review/${id}`;

  const getReview = async () => {
    try {
      const res = await fetch(URL);
      const product = await res.json();
      setReview(product.reviews);
    } catch (err) {
      console.log(err);
    }
  };

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
      const response = await fetch(reviewpostURL, requestOptions);
      const createdReview = await response.json();
      setReview([...review, createdReview]);
      setNewReview({
        name: "",
        body: "",
      });
      navigate(0);
    } catch (err) {
      console.log(err);
    }
  };

  // REMOVE
  const deletePost = async (id) => {
    let response = await fetch(
      `https://capstone-commerce.herokuapp.com/review/${id}`,
      {
        method: "DELETE",
      }
    );
    if (response.status === 200) {
      setReview(
        review.filter((post) => {
          navigate(0);
          return post.id !== id;
        })
      );
    } else {
      navigate(0);
      return;
    }
  };

  const loaded = () => {
    return (
      <div>
        <div className="ReviewArea">
          {token ? (
            <form className="newReview" onSubmit={handleSubmit}>
              <div className="newReview-w-btn">
                <div className="newReview-wo-btn">
                  <label>
                    <input
                      className="review-add-area"
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
                      className="review-txt-ar"
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
                  <input
                    className="CommentButton"
                    type="submit"
                    value="Reply"
                  />
                </div>
              </div>
            </form>
          ) : (
            <p className="sign-to-post">Please sign in to post a review</p>
          )}
          {review.length === 0 ? (
            <p className="no-reviews">no reviews</p>
          ) : (
            <div>
              {review?.map((reviews, index) => {
                return (
                  <div className="review-list">
                    <div className="review-container" key={reviews._id}>
                      <section className="review-section">
                        <h4 className="reviews-name">{reviews.name}: </h4>
                        <p className="reviews-body">{reviews.body}</p>
                        <div
                          className="delete-div"
                          onClick={() => deletePost(reviews._id)}
                        >
                          <img
                            className="delete-icon"
                            src="https://img.icons8.com/glyph-neue/512/delete-property.png"
                            alt="delete-icon"
                          />
                        </div>
                      </section>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
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
