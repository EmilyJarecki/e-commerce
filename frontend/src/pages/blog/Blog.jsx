import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Blog = () => {
  const [blog, setBlog] = useState([]);
  const [newForm, setNewForm] = useState({
    name: "",
    title: "",
    image: "",
  });

  const BASE_URL = "http://localhost:4000/blogs";

  const getBlog = async () => {
    try {
      const res = await fetch(BASE_URL);
      console.log(res);
      const allBlogs = await res.json();
      setBlog(allBlogs);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setNewForm({ ...newForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    // PREVENT DEFAULT
    e.preventDefault();

    // CAPTURE LOCAL STATE
    const currentState = { ...newForm };
    try {
      // FETCH TO BE, SENDING DATA
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentState),
      };

      // SEND DATA TO API
      const response = await fetch(BASE_URL, requestOptions);

      // PARSE DATA FROM RESPONSE INTO JS
      const createdBlog = await response.json();

      // UPDATE LOCAL STATE
      setBlog([...blog, createdBlog]);

      // RESET newForm STATE SO FORM EMPTIES OUT
      setNewForm({
        name: "",
        title: "",
        image: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  // RETURNS CREATE A TWEET AND MAPS OVER ALL TWEETS
  const loaded = () => {
    return (
      <div className="home">
        <section className="FormBlock">
          <form className="form" onSubmit={handleSubmit}>
            <label>
              <input
                autoComplete="off"
                type="text"
                name="name"
                placeholder="Name"
                value={newForm.name}
                onChange={handleChange}
              />
            </label>
            <label>
              <textarea
                onChange={handleChange}
                autoComplete="off"
                type="text"
                value={newForm.title}
                name="title"
                placeholder="What's happening?"
                maxLength="300"
              />
            </label>
            <div className="buttonDiv">
              <input type="submit" value="Create Blog" />
            </div>
          </form>
        </section>
        <section className="blogList">
          {blog?.map((article) => {
            return (
              <Link key={article._id} to={`/blogs/${article._id}`}>
                <div className="blog-card">
                  <div className="blog">
                    <h1>{article.name}</h1>
                  </div>
                  <h3>{article.title}</h3>
                  <img
                    className="tweetImage"
                    src={article.image}
                    alt=""
                    width={200}
                  />
                </div>
              </Link>
            );
          })}
        </section>
      </div>
    );
  };

  // LOADING
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

  // INITIATES UPON MOUNT
  useEffect(() => {
    getBlog();
  }, []);

  return (
    <section className="tweet-list">{blog ? loaded() : loading()}</section>
  );
};
export default Blog;
