import React from 'react';
import { useState } from 'react';

const CreateProduct = () => {
    // state to hold formData
    const [newForm, setNewForm] = useState({
        name: "",
        image: "",
        description: "",
        price: 0,
        shopping: "",
        category: ""
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
            <h1>Add a Product</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newForm.name}
                    name="name"
                    placeholder="name"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    value={newForm.image}
                    name="image"
                    placeholder="image URL"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    value={newForm.description}
                    name="description"
                    placeholder="Add description"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    value={newForm.price}
                    name="price"
                    placeholder=""
                    onChange={handleChange}
                />
                <input
                    type="text"
                    value={newForm.shopping}
                    name="shopping"
                    placeholder="Add a link"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    value={newForm.category}
                    name="category"
                    placeholder="Add category"
                    onChange={handleChange}
                />
                <input type="submit" value="Create Product" />
            </form>
        </div>
    );
};

export default CreateProduct;