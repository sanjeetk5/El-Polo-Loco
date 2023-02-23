import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Products from "../Pages/Products";

const AllRoutes = () => {
  return (
    <Routes>
       <Route path="/" element={<Home/>}></Route>  
      <Route path="/product" element={<Products/>}></Route>
    </Routes>
  );
};

export default AllRoutes;
