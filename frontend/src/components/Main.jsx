import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import ProductDetail from "../pages/product_detail/ProductDetail";
import ProductList from "../pages/product_list/ProductList";
import CreateProduct from "../pages/CreateProduct/CreateProduct";
import Auth from "../pages/Auth";
import Wishlist from "./Wishlist";

const Main = (props) => {
  return (
    <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<CreateProduct />} />
          <Route path="/shop" element={<ProductList />} />
          <Route path="/shop/:id" element={<ProductDetail />} />
          <Route path="/auth" element={<Auth />}/>
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
    </main>
  );
};

export default Main;