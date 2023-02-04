import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Reviews from "../../components/Reviews";
import "./productdetail.css";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);

  const { id } = useParams();

  const URL = `https://capstone-commerce.herokuapp.com/products/${id}`;

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
                          <a className="link purchase-redirect" href={product.shopping}>SHOP NOW</a>

            </div>
            <p>
            </p>
          </div>
        </section>

        <h1>Edit Product</h1>
        <form className="update-form" onSubmit={handleSubmit}>
          Name:<input
            className="edit-box edit-name"
            type="text"
            value={editForm.name}
            name="name"
            placeholder={product.name}
            onChange={handleChange}
          />
          Image: <input
            className="edit-box edit-image"
            type="text"
            value={editForm.image}
            name="image"
            placeholder={product.image}
            onChange={handleChange}
          />
          Description: <input
            className="edit-box edit-description"
            type="text"
            value={editForm.description}
            name="description"
            placeholder={product.description}
            onChange={handleChange}
          />
          Price: <input
            className="edit-box edit-price"
            type="text"
            value={editForm.price}
            name="price"
            placeholder={product.price}
            onChange={handleChange}
          />
          Shopping URL: <input
            className="edit-box edit-shoppingURL"
            type="text"
            value={editForm.shopping}
            name="shopping"
            placeholder={product.shopping}
            onChange={handleChange}
          />
          Category: <input
            className="edit-box edit-name"
            type="text"
            value={editForm.category}
            name="category"
            placeholder={product.category}
            onChange={handleChange}
          />
          <input type="submit" value="Update Product" />
        </form>

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
