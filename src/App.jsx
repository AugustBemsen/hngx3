import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Showroom from "./pages/showroom";
import LogIn from "./pages/login";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LogIn />} />

        <Route path="showroom" element={<Showroom />} />
        <Route path="*" element={<LogIn />} />
      </Routes>
    </>
  );
};

export default App;
