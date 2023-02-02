import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import ProductDetail from "../pages/product_detail/ProductDetail";
import ProductList from "../pages/product_list/ProductList";
import Cart from "../pages/cart/Cart";
import Checkout from "../pages/payment/Checkout";
import Header from "./Header/Header";
import Blog from "../pages/blog/Blog";

const Main = () => {
  return (
    <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<ProductList />} />
          <Route path="/shop/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/blogs" element={<Blog />} />
        </Routes>
    </main>
  );
};

export default Main;
