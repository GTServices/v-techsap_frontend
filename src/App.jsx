import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import Home from './Pages/Home';
import About from './Pages/About';
import Services from './Pages/Services';
import Contact from './Pages/Contact';
import ServicesDetails from './servicesComponents/servicesDetails/ServicesDetails';


function App() {
  return (  
    <Router>
    
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>}/>
        <Route path="/about" element={<Layout><About /></Layout>}/>
        <Route path="/services" element={<Layout><Services /></Layout>}/>
        <Route path="/contact" element={<Layout><Contact /></Layout>}/>
        <Route path="/services/:id" element={<Layout><ServicesDetails /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
