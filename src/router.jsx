import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/organisms/header";
import LogIn from "./components/pages/logIn";
import SignUp from "./components/pages/signUp";

const Router = () => {
  return (
    <BrowserRouter>
      {/* 로그인, 로그아웃 용 헤더!! */}
      <Header />
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/logIn" element={<LogIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
