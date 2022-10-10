import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/organisms/header";
import SignUp from "./components/pages/signUp";

const Router = () => {
  return (
    <BrowserRouter>
      {/* 로그인, 로그아웃 용 헤더!! */}
      <Header />
      <Routes>
        <Route path="/" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
