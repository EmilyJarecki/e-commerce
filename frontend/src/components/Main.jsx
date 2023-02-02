import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import ProductDetail from "../pages/product_detail/ProductDetail";
import ProductList from "../pages/product_list/ProductList";
import Header from "./Header/Header";
import Blog from "../pages/blog/Blog";
import BlogDetail from "../pages/blog_detail/BlogDetail";

const Main = () => {
  return (
    <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<ProductList />} />
          <Route path="/shop/:id" element={<ProductDetail />} />
          {/* <Route path="/blogs" element={<Blog />} />
          <Route path="/blogs/:id" element={<BlogDetail />} /> */}

        </Routes>
    </main>
  );
};

export default Main;
