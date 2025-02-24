import React, { useEffect, useState, useCallback } from "react";
import "./ServicesHome.css";
import { FaArrowUp } from "react-icons/fa";
import OrangeBTN from "../../components/Buttons/OrangeBTN";
import ServicesHomeHead from "./ServicesHomeHead";
import ServicesHomeCard from "./ServicesHomeCard";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useSelector } from "react-redux";
import useViewportWidth from "../../hooks/useViewportWidth";
import { Link } from "react-router-dom";

function ServicesHome() {
  const width = useViewportWidth();
  const [ perPage, setPerPage ] = useState(6);

  useEffect(() => {
    if (width > 1028) {
      setPerPage(6);
    } else if (width > 677) {
      setPerPage(4);
    } else {
      setPerPage(3)
    }
  }, [width])

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
      const response = await fetch(`${BASE_URL}/service?perPage=${perPage}&page=${currentPage}&lang=${selectedLanguage}`);
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

  }, [BASE_URL, selectedLanguage, currentPage, perPage]);

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
      
        </div>
      ) : (
        
        width > 677 ?
        <div className="left-right-btns container">
          <i onClick={handlePrewServices}><FaArrowLeft /></i>
          <i onClick={handleNextServices} className="right-arrow"><FaArrowRight /></i>
        </div> :
        <Link
          to={`/${selectedLanguage}/services`}
          className="more-btn"
        >
          Daha çox
        </Link>
        
      )}
    </section>
  );
}

export default ServicesHome;
