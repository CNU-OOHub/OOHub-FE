import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { adminCategoryModalVisibleState } from "./atom";
import AdminCategoryModal from "./components/molecules/adminCategoryModal";
import Header from "./components/organisms/header";
import Home from "./components/pages/home";
import LogIn from "./components/pages/logIn";
import SignUp from "./components/pages/signUp";
import Monitoring from "./components/pages/monitoring";

const Router = () => {
  const adminCategoryModalVisible = useRecoilValue(
    adminCategoryModalVisibleState
  );
  return (
    <BrowserRouter>
      <Header />
      {adminCategoryModalVisible && <AdminCategoryModal />}
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/logIn" element={<LogIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/monitoring" element={<Monitoring />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
