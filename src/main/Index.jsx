import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";

import Home from "./Home/Home";
import Categories from "./Categories/Categories";
import Order from "./Orders/Order";
import Products from "./Products/Products";
import Header from "../components/Header";import ProductDetail from "./Products/more/Product_detail";
import Recomended from "./Recomended/Recomended";
import Banners from "./Banners/Banners";


export default function Index() {
  return (
    <div className="grid grid-rows-[auto_1fr] grid-cols-[250px_1fr] h-screen ">
      <Header />
      <Sidebar />
      <div className="main overflow-y-scroll">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/products">
            <Route index element={<Products />} />
            <Route path="product_detail/:id" element={<ProductDetail />} />
          </Route>

          <Route path="/recomended" element={<Recomended />} />
          <Route path="/banners" element={<Banners />} />
        </Routes>
      </div>
    </div>
  );
}
