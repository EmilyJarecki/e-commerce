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
  const handleUpdateChange = (id) => {
    setEditForm({ ...editForm, [id.target.name]: id.target.value });
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

  // TODO
  // UPDATE
  const updatedReview = async (id) => {
    id.preventDefault();
    try {
      const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      };
      const response = await fetch(
        `https://capstone-commerce.herokuapp.com/review/${id}`,
        options
      );
      const updatedReview = await response.json();
      setReview(updatedReview);
      // REFRESH PAGE
      navigate(0);
    } catch (err) {
      console.log(err);
      navigate(URL);
    }
  };


  // REMOVE
  const deletePost = async (id) => {
    let response = await fetch(`https://capstone-commerce.herokuapp.com/review/${id}`, {
      method: "DELETE",
    });
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
        {review?.map((reviews, index) => {
          return (
            <div className="review-container" key={reviews._id}>
              <section className="review-section">
                <h4 className="reviews-name">{reviews.name}: </h4>
                <p className="reviews-body">{reviews.body}</p>
                <div
                  className="delete-div"
                  onClick={() => deletePost(reviews._id)}
                >
                  DELETE
                </div>
                {/* <form className="update-form" onSubmit={() => updatedReview(reviews._id)}>
                  <label>
                    <input
                      type="text"
                      value={newReview.body}
                      name="body"
                      placeholder="Update Review Body"
                      onChange={() => handleUpdateChange(reviews._id)}
                    />
                  </label>
                  <input
                    className="updateButton"
                    type="submit"
                    value="Update"
                  />
                </form> */}
              </section>
            </div>
          );
        })}
        <form className="newReview"onSubmit={handleSubmit}>
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