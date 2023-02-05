import React from "react";
import { useState } from "react";
import "./createProduct.css";

const CreateProduct = () => {
  // state to hold formData
  const [newForm, setNewForm] = useState({
    name: "",
    image: "",
    description: "",
    price: 0,
    shopping: "",
  });

  // handleChange function for form
  const handleChange = (e) => {
    setNewForm({ ...newForm, [e.target.name]: e.target.value });
  };

  const createProduct = async (productData) => {
    try {
      console.log("Here is product data:");
      console.log(productData);
      const newProduct = await fetch(
        "https://capstone-commerce.herokuapp.com/products",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );
      console.log("Product created! Go check out the products page.");
      //We have a page for this
      //getProducts()
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = await createProduct(newForm);
    setNewForm({
      name: "",
      image: "",
      description: "",
      price: 0,
      shopping: "",
      category: "",
    });
  };

  return (
    <div className="CreateProduct">
        <div className="create-body">
      <h1 className="add-product">Add a Product</h1>

      <div className="create-product-container">
        <form className="create-form-div" onSubmit={handleSubmit}>
          <div className="create-form">
            <div className="add-titles">
              <h3 className="add-pprty">Item</h3>
              <h3 className="add-proprty">Image</h3>
              <h3 className="add-prrty prrty-desc">Description</h3>
              <h3 className="add-prrty">Price</h3>
              <h3 className="add-prrty">Store Link</h3>
            </div>
            <div className="input-divs-cont">
              <p className="input-div">
                <input
                  className="create-input"
                  type="text"
                  value={newForm.name}
                  name="name"
                  placeholder="Product Name"
                  onChange={handleChange}
                  autoComplete="off"
                />
              </p>
              <p className="input-div">
                <input
                  className="create-input img-input"
                  type="text"
                  value={newForm.image}
                  name="image"
                  placeholder="Image Link"
                  onChange={handleChange}
                  autoComplete="off"
                />
              </p>
              <p className="input-div desc-textarea">
                <textarea
                  className="create-input desc-textarea desc-box"
                  type="text"
                  value={newForm.description}
                  name="description"
                  placeholder="Description"
                  onChange={handleChange}
                  autoComplete="off"
                />
              </p>
              <p className="input-div price-input">
                <input
                  className="create-input"
                  type="text"
                  value={newForm.price}
                  name="price"
                  placeholder="price"
                  onChange={handleChange}
                  autoComplete="off"
                />
              </p>
              <p className="input-div">
                <input
                  className="create-input"
                  type="text"
                  value={newForm.shopping}
                  name="shopping"
                  placeholder="Shop Link"
                  onChange={handleChange}
                  autoComplete="off"
                />
              </p>
            </div>
          </div>
          <div className="add-btn">
          <input className="create-submit" type="submit" value="Add Product" />
          </div>
        </form>
      </div>
      </div>
    </div>
  );
};

export default CreateProduct;
