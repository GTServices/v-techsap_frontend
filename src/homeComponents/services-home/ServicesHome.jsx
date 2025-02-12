import React, { useEffect, useState, useCallback } from "react";
import "./ServicesHome.css";
import { FaArrowUp } from "react-icons/fa";
import OrangeBTN from "../../components/Buttons/OrangeBTN";
import ServicesHomeHead from "./ServicesHomeHead";
import ServicesHomeCard from "./ServicesHomeCard";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useSelector } from "react-redux";

function ServicesHome() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [miniMobile, setMiniMobile] = useState(window.innerWidth < 375);
  const [error, setError] = useState(null);

  const colors = [
    "var(--Pale_Blue)",
    "var(--Soft_Gray)",
    "var(--Dusty_Green)",
    "var(--Mist_Green)",
    "var(--Soft_Lilac)",
    "var(--Creamy_Almond)",
  ];


  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1)

  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const BASE_URL = useSelector((state) => state.tech.BASE_URL); 
  const selectedLanguage = useSelector((state) => state.tech.language); 

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/service?perPage=6&page=${currentPage}&lang=${selectedLanguage}`);
      if (!response.ok) {
        throw new Error("");
      }
      const result = await response.json();      
      setTotalPages(result.pageCount);
      setServices(result.data); 
    } catch (error) {
      console.error("Xəta:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();

  }, [BASE_URL, selectedLanguage, currentPage]);

  function handlePrewServices () {
    if (currentPage > 1) {
      setCurrentPage(prew => prew - 1)
    }
  }

  function handleNextServices () {
    if (currentPage < totalPages) {
      setCurrentPage(prew => prew + 1)
    }
  }


  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth <= 768);
    setMiniMobile(window.innerWidth < 375);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return (
    <section className="ser-home ">
      <ServicesHomeHead />
      {error ? (
        <p className="error-message">{error}</p>
      ) : services.length > 0 ? (
        <ServicesHomeCard services={services} colors={colors} isMobile={isMobile} />
      ) : (
        <p className="no-services"></p>
      )}
      {miniMobile ? (
        <div className="ser-home-btn">
          {/* <button className="orangeBtn">Daha Cox</button> */}
        </div>
      ) : (
        <div className="left-right-btns container">
      <i onClick={handlePrewServices}><FaArrowLeft /></i>
      <i onClick={handleNextServices} className="right-arrow"><FaArrowRight /></i>
    </div>
      )}
    </section>
  );
}

export default ServicesHome;
