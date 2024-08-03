import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const MarketingRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/marketing" element={<h1>Marketing</h1>} />
      </Routes>
    </Router>
  );
};

export default MarketingRoutes;
