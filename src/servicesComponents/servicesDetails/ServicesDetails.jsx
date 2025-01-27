import React, { useEffect, useState, useCallback } from 'react';
import ContactUs from '../../components/ContactUs/ConstactUs';
import CostumerCard from '../../homeComponents/costumers-home/CostumerCard';
import './ServicesDetails.css';
import ServicesHero from './ServicesHero';
import ServicesHomeHead from '../../homeComponents/services-home/ServicesHomeHead';
import ServicesTopTitle from './ServicesTopTitle';
import ServicesHomeCard from '../../homeComponents/services-home/ServicesHomeCard';
import ServicesDetailsInfo from './ServicesDetailsInfo';
import { useSelector } from 'react-redux';

function ServicesDetails() {
  const [services, setServices] = useState([]);
  const [customersTitle, setCustomersTitle] = useState(""); 
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const colors = [
    "var(--Pale_Blue)",
    "var(--Soft_Gray)",
    "var(--Dusty_Green)",
    "var(--Mist_Green)",
    "var(--Soft_Lilac)",
    "var(--Creamy_Almond)",
  ];

  const selectedLanguage = useSelector((state) => state.tech.language);
  const BASE_URL = useSelector((state) => state.tech.BASE_URL);

  const handleResize = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
  
    fetch(`${BASE_URL}/service/2?lang=${selectedLanguage}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data["ser-home"])) {
          setServices(data["ser-home"]);
        }
        if (data && data.customersTitle) {
          setCustomersTitle(data.customersTitle); 
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [BASE_URL, selectedLanguage, handleResize]); 

  const getCardCount = () => {
    if (windowWidth < 375) return 3;
    if (windowWidth <= 768) return 4;
    return 3;
  };

  return (
    <div className="services-details">
      <ServicesHomeHead />
      <ServicesTopTitle />
      <ServicesHero />
      <ServicesDetailsInfo />

      <div className="services-hero-detail">
        <h3>{customersTitle || "IT xidmətindən istifadə edən müştərilərimiz"}</h3> 
        <h4>Müştərilərimizlə Birlikdə Böyüyürük!</h4>
      </div>
      <div className="costumer-for-detail">
        <CostumerCard maxCards={5} />
      </div>

      <div className="services-detail-cards container">
        <h3 className="gradient-heading">Digər Xidmətlər</h3>
        <ServicesHomeCard
          services={services.slice(0, getCardCount())}
          colors={colors}
          isMobile={windowWidth <= 768}
        />
        <div className="ser-card-but">
          <button className="orangeBtn">Hamısına bax</button>
        </div>
      </div>
      <ContactUs />
    </div>
  );
}

export default ServicesDetails;
