import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../servicesDetails/ServicesTopTitle.css";

function ServicesTopTitle() {
  const [serviceData, setServiceData] = useState(null);
  const BASE_URL = useSelector((state) => state.tech.BASE_URL); 
  const selectedLanguage = useSelector((state) => state.tech.language);

  useEffect(() => {

    fetch(`${BASE_URL}/service/1?lang=${selectedLanguage}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Service Data:", data);
        setServiceData(data); 
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [BASE_URL, selectedLanguage]); 

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
