import React, { useState, useEffect } from 'react';
import ServicesHomeCard from '../homeComponents/services-home/ServicesHomeCard';
import ContactUs from '../components/ContactUs/ConstactUs';
import ServicesTitle from '../servicesComponents/ServicesTitle';
import Pagination from '../components/Pagination/Pagination';

function Services() {
  const colors = [
    "var(--Pale_Blue)",
    "var(--Soft_Gray)",
    "var(--Dusty_Green)",
    "var(--Mist_Green)",
    "var(--Soft_Lilac)",
    "var(--Creamy_Almond)",
  ];

  const [services, setServices] = useState([]); 
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    fetch("../../../db.json")
      .then((response) => response.json())
      .then((data) => {
        setServices(data["ser-home"]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        setLoading(false); 
      });

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className='ser container'>
      <ServicesTitle />
      {loading ? (
        <p>Yüklənir...</p> 
      ) : (
        <ServicesHomeCard services={services} colors={colors} isMobile={isMobile} />
      )}
      <Pagination />
      <ContactUs />
    </div>
  );
}

export default Services;
