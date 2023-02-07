import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Reviews from "../../components/Reviews";
import { UserContext } from "../../data";
import { useContext } from "react";
import "./productdetail.css";
import { getUserToken } from "../../utils/authToken";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const token = getUserToken();
  const { id } = useParams();
  const navigate = useNavigate();

  const URL = `https://capstone-commerce.herokuapp.com/products/${id}`;

  // context data
  const {currentUser} = useContext(UserContext)

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
  // console.log(product.shopping)
  // ------------------------------------- UPDATE -------------------------------------

  const [editForm, setEditForm] = useState({
    name: "",
    image: "",
    description: "",
    price: 0,
    shopping: "",
    category: "",
  });

  // handleChange function for form
  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const editProduct = async (productData) => {
    try {
      console.log("Here is product data:");
      console.log(productData);
      const editedProduct = await fetch(URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });
      console.log("Product UPDATED!");
      getDetails();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const editedProduct = await editProduct(editForm);
    setEditForm({
      name: "",
      image: "",
      description: "",
      price: 0,
      shopping: "",
      category: "",
    });
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

  // ------------------------------------- UPDATE -------------------------------------

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
              <a className="link purchase-redirect" href={product.shopping}>
                SHOP NOW
              </a>
            </div>
            {token && currentUser?._id === product.owner._id ? (
              <p className="delete" onClick={removeProduct}>
                Delete
              </p>
            ) : null}
            <p></p>
          </div>
        </section>
        <section className="extra-content">
          <div className="edit-product">
            <div className="reviews-comp">
              <Reviews />
            </div>
            <h1 className="edit-title">Edit Product</h1>
            <div className="update-container">
            {token && currentUser?._id === product.owner._id ? (
              <form className="update-form" onSubmit={handleSubmit}>
                <div className="update-property">
                  Name:
                  <input
                    className="edit-box edit-name"
                    type="text"
                    value={editForm.name}
                    name="name"
                    placeholder={product.name}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>
                <div className="update-property">
                  Image:{" "}
                  <input
                    className="edit-box edit-image"
                    type="text"
                    value={editForm.image}
                    name="image"
                    placeholder={product.image}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>
                <div className="update-property">
                  Description:{" "}
                  <input
                    className="edit-box edit-description"
                    type="text"
                    value={editForm.description}
                    name="description"
                    placeholder={product.description}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>
                <div className="update-property">
                  Price:{" "}
                  <input
                    className="edit-box edit-price"
                    type="text"
                    value={editForm.price}
                    name="price"
                    placeholder={product.price}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>
                <div className="update-property">
                  Shopping URL:{" "}
                  <input
                    className="edit-box edit-shoppingURL"
                    type="text"
                    value={editForm.shopping}
                    name="shopping"
                    placeholder={product.shopping}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>
                <div className="update-property">
                  Category:{" "}
                  <input
                    className="edit-box edit-name"
                    type="text"
                    value={editForm.category}
                    name="category"
                    placeholder={product.category}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>
                <div className="update-div">
                  <input
                    className="update-btn"
                    type="submit"
                    value="Update Product"
                  />
                </div>
              </form>) : null}
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

  useEffect(() => {
    getDetails();
    // getReviews();
  }, []);

  return product ? loaded() : loading();
};

export default ProductDetail;
