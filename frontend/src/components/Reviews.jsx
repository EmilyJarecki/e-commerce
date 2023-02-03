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
  const deleteReviewURL = `http://localhost:4000/review/${id}`

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
  const handleUpdateChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
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

  // TODO
  // UPDATE
  const updatedReview = async (e) => {
    e.preventDefault();
    try {
      const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      };
      const response = await fetch(deleteReviewURL, options);
      const updatedReview = await response.json();
      setReview(updatedReview);
      // REFRESH PAGE
      navigate(0);
    } catch (err) {
      console.log(err);
      navigate(URL);
    }
  }

  // TODO
  // REMOVE
  const removeReview = async (index) => {
    try {
      const options = {
        method: "DELETE",
      };
      const response = await fetch(`http://localhost:4000/review/${index}`, options);
      const deletedReview = await response.json()
      console.log(response)
      console.log("I'm hitting the delete route.")
      // navigate("/")
    } catch (err) {
      console.log(err);
      navigate(URL);
    }
  };


  const loaded = () => {
    return (
      <div >
        {review?.map((reviews, index) => {
          return (
            <div style={{border: "1px solid red"}} key={index}>
              <p>
                {reviews.name} says: {reviews.body} with an id of {reviews._id}
              </p>
              <img
                    className="delete"
                    src="https://img.icons8.com/ios/512/delete-sign.png"
                    alt="delete"
                    onClick={()=>removeReview(index)}
                    style={{width: "50px"}}
                  />
              <form className="UPDATE" onSubmit={updatedReview}>
                <label>
                  <input
                    type="text"
                    value={newReview.body}
                    name="body"
                    placeholder="Update Review"
                    onChange={handleUpdateChange}
                  />
                </label>
                <input className="updateButton" type="submit" value="Update" />
              </form>
            </div>
          );
        })}
        <form onSubmit={handleSubmit}>
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