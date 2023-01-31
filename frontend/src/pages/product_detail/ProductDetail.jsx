import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = (props) => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  const URL = `http://localhost:4000/products/${id}`;

  const getDetails = async () => {
    try {
      const response = await fetch(URL);
      const foundProduct = await response.json();
      setProduct(foundProduct);
    } catch (err) {
      console.log(err);
    }
  };
  const loaded = () => {
    return (
      <div>
        <h4>
          You click on the product and you are redirected to this page which
          will show the product name, price, image, and description of item.
          There will also be a button to add to cart.
        </h4>
        <p>Add to Cart button which isn't working rn.</p>
        <img width="50px" src={product.image} alt={product.name} />
        <p>{product.name}</p>
        <p>${product.price}</p>
        <p>{product.description}</p>
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
  }, []);

  return product ? loaded() : loading();
};

export default ProductDetail;
