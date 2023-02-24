import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Products from "../Pages/Products";
import SingleProduct from "../Pages/SingleProduct";
import LoginPage from "../Pages/LoginPage";
import CartPage from "../Pages/CartPage";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/product" element={<Products />}></Route>
      <Route path="/product/:id" element={<SingleProduct />}></Route>
      <Route path="/login" element={<LoginPage/>}></Route>
      <Route path= "/cart" element={<CartPage/>}></Route>
    </Routes>
  );
};

export default AllRoutes;
