import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import ProductDetail from "../pages/product_detail/ProductDetail";
import ProductList from "../pages/product_list/ProductList";

const Main = () => {
  return (
    <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<ProductList />} />
          <Route path="/shop/:id" element={<ProductDetail />} />

        </Routes>
    </main>
  );
};

export default Main;
