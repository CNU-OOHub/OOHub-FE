import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/organisms/header";
import SignIn from "./components/pages/signIn";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
