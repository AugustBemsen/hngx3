import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LogIn from "./pages/Login";

const App = () => {
  return (
    <Router>
      <ToastContainer />
      {/* <Navbar /> */}

      <Routes>
        <Route path="/" element={<LogIn />} />
        {/* <Route path="showroom" element={<Gallery />} /> */}
        <Route path="*" element={<LogIn />} />
      </Routes>

      {/* <Footer /> */}
    </Router>
  );
};

export default App;
