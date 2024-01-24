import React from "react";
import Login from "../Credentials/Login";
import { Route, Routes } from "react-router-dom";
import Register from "../Credentials/Register";

const PublicRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default PublicRoute;
