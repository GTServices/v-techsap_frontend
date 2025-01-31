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
import { Link, useParams } from 'react-router-dom';

function ServicesDetails() {
  const selectedLanguage = useSelector((state) => state.tech.language);
  const BASE_URL = useSelector((state) => state.tech.BASE_URL);
  const {slug} = useParams();
  

  const [services, setServices] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [customersTitle, setCustomersTitle] = useState(""); 
  const [texts, setTexts] = useState({}); 
  const [customerHeading, setCustomerHeading] = useState(""); 
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const colors = [
    "var(--Pale_Blue)",
    "var(--Soft_Gray)",
    "var(--Dusty_Green)",
    "var(--Mist_Green)",
    "var(--Soft_Lilac)",
    "var(--Creamy_Almond)",
  ];

  const getServices = async () => {
    try{
      const response = await fetch(`${BASE_URL}/service?perPage=4&page=1&lang=${selectedLanguage}`)
      if (!response.ok) throw new Error("Unexpected occurred");
      const data = await response.json(); 
      setServices(data.data)
    } catch {
      setError("Error fetching data");
      console.error(error);
    } finally {
      // setLoading(false);
    }
  }


  const getServiceData = async () => {
    try{
      const response = await fetch(`${BASE_URL}/service/${slug}?lang=${selectedLanguage}`)
      if (!response.ok) throw new Error("Unexpected occurred");
      const data = await response.json(); 
      setServiceData(data)
    } catch {
      setError("Error fetching data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const getCustomerHeading = async () => {
    try{
      const response = await fetch(`${BASE_URL}/customText/customer-title?lang=${selectedLanguage}`)
      if (!response.ok) throw new Error("Unexpected occurred");
      const data = await response.json(); 
      setCustomerHeading(data.value)
    } catch {
      // setError("Error fetching data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const getText = async () => {
    try {
      const response = await fetch(`${BASE_URL}/staticText/getDatas?lang=${selectedLanguage}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify([
          "other-services", 
          "see-all"
        ]),
      });
      if (!response.ok) throw new Error("Unexpected occurred");
      const data = await response.json(); 
      setTexts(data);
    } catch (error) {
      // setError("Error fetching data");
      console.error(error);
    } finally {
      // setLoading(false);
    }
  };



  useEffect(() => {
    getServiceData();
    getCustomerHeading();
    getText();
    getServices();
  }, [BASE_URL, selectedLanguage])

console.log(serviceData);


  const handleResize = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
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
      <ServicesTopTitle serviceData={serviceData}/>
      <ServicesHero serviceData={serviceData}/>
      <ServicesDetailsInfo serviceData={serviceData}/>

      <div className="services-hero-detail">
        <h3>{serviceData?.customersTitle || "IT xidmətindən istifadə edən müştərilərimiz"}</h3> 
        <h4>{customerHeading}</h4>
      </div>
      <div className="costumer-for-detail">
        <CostumerCard serviceCustomers={serviceData.customers} maxCards={5} />
      </div>

      <div className="services-detail-cards container">
        <h3 className="gradient-heading">{texts["other-services"]}</h3>
        <ServicesHomeCard
          services={services.slice(0, getCardCount())}
          colors={colors}
          isMobile={windowWidth <= 768}
        />
        <div className="ser-card-but">
          <Link to="/services" className="orangeBtn">{texts["see-all"]}</Link>
        </div>
      </div>
      <ContactUs />
    </div>
  );
}

export default ServicesDetails;
