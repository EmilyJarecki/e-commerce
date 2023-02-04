import React from 'react';
import { useState } from 'react';
import "./createProduct.css"

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
            console.log("Here is product data:")
            console.log(productData)
            const newProduct = await fetch("https://capstone-commerce.herokuapp.com/products", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productData),
            });
            console.log("Product created! Go check out the products page.")
            //We have a page for this
            //getProducts()
        } catch (err) {
            console.log(err)
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newProduct = await createProduct(newForm)
        setNewForm({ name: "", image: "", description: "", price: 0, shopping: "", category: ""})
    }

    return (
        <div className="CreateProduct">            
        <h1 className="add-product">Add a Product</h1>

        <div className="create-product-container">
            <form className="create-form" onSubmit={handleSubmit}>
                <p className="input-div">Item: <input
                    className="create-input"
                    type="text"
                    value={newForm.name}
                    name="name"
                    placeholder="name"
                    onChange={handleChange}
                    autoComplete="off"
                /></p>
                <p className="input-div">
                Image: <input
                    className="create-input"
                    type="text"
                    value={newForm.image}
                    name="image"
                    placeholder="image URL"
                    onChange={handleChange}
                    autoComplete="off"
                />
                </p>
                <p className="input-div">
                Description: <input
                    className="create-input"
                    type="text"
                    value={newForm.description}
                    name="description"
                    placeholder="Add description"
                    onChange={handleChange}
                    autoComplete="off"
                /></p>
                <p className="input-div">
                Price: <input
                    className="create-input"
                    type="text"
                    value={newForm.price}
                    name="price"
                    placeholder=""
                    onChange={handleChange}
                    autoComplete="off"
                /></p>
                <p className="input-div">
                Store Link: <input
                    className="create-input"
                    type="text"
                    value={newForm.shopping}
                    name="shopping"
                    placeholder="Add a link"
                    onChange={handleChange}
                    autoComplete="off"
                /></p>
                <input className="create-submit" type="submit" value="Add Product" />
            </form>
        </div>
        </div>
    );
};

export default CreateProduct;