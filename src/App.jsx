import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Services from "./Pages/Services";
import Contact from "./Pages/Contact";
import ServicesDetails from "./servicesComponents/servicesDetails/ServicesDetails";
import NotFound from "./Pages/notFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/az/" replace />} />
        <Route path="/:lang/" element={<Layout><Home /></Layout>} />
        <Route path="/:lang/about" element={<Layout><About /></Layout>} />
        <Route path="/:lang/services" element={<Layout><Services /></Layout>} />
        <Route path="/:lang/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/:lang/services/:slug" element={<Layout><ServicesDetails /></Layout>} />
        <Route path="*" element={<Layout><NotFound /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
