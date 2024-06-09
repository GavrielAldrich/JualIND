import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import NoPage from "./components/NoPage";
import Store from "./components/Store";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Product from "./components/Product";
import TestSendFile from "./components/TestSendFile";
import "./App.css";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setLogIn] = useState(false);

  return (
    <BrowserRouter>
      <Navbar loading={loading} setLoading={setLoading} isLoggedIn={isLoggedIn} setLogIn={setLogIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setLogIn={setLogIn} />} />
        <Route path="/store/:game" element={<Store />} />
        <Route path="/test" element={<TestSendFile/>} />
        <Route path="*" element={<NoPage />} />
        <Route path="product/:game/:store/:id" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}
