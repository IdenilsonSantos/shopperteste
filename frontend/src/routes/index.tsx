import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EstimatePage from "../Pages/estimate";
import RideOptionsPage from "../Pages/rideOptions";
import RideHistory from "../Pages/rideHistory";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EstimatePage />} />
        <Route path="/options" element={<RideOptionsPage />} />
        <Route path="/history" element={<RideHistory />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
