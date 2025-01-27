import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../servicesDetails/ServicesTopTitle.css";

function ServicesTopTitle({serviceData}) {
  if (!serviceData) {
    return <div>Yüklənir...</div>; 
  }


  const { title, shortDesc } = serviceData;

  return (
    <div className="services-top-title container">
      <h3>{title || "No Title"}</h3> 
      <p>{shortDesc || "No short description available"}</p>
    </div>
  );
}

export default ServicesTopTitle;
