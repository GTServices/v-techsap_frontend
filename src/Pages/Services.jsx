import React, { useState, useEffect, useRef } from 'react';
import ServicesHomeCard from '../homeComponents/services-home/ServicesHomeCard';
import ContactUs from '../components/ContactUs/ConstactUs';
import ServicesTitle from '../servicesComponents/ServicesTitle';
import Pagination from '../components/Pagination/Pagination';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import useViewportWidth from '../hooks/useViewportWidth';

function Services() {
  const colors = [
    "var(--Pale_Blue)",
    "var(--Soft_Gray)",
    "var(--Dusty_Green)",
    "var(--Mist_Green)",
    "var(--Soft_Lilac)",
    "var(--Creamy_Almond)",
  ];

  const width = useViewportWidth();
  const [ perPage, setPerPage ] = useState(6);

  // useEffect(() => {
  //   if (width > 1028) {
  //     setPerPage(6);
  //   } else if (width > 677) {
  //     setPerPage(4);
  //   } else {
  //     setPerPage(3)
  //   }
  // }, [width])

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [loading, setLoading] = useState(true); 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [seoData, setSeoData] = useState(null); 
  const BASE_URL = useSelector((state) => state.tech.BASE_URL); 
  const selectedLanguage = useSelector((state) => state.tech.language); 

  const sectionRef = useRef(null);

  const scrollToSection = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const fetchSeoData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/pagesSeo/services`);
      const data = await response.json();
      if (response.ok) {
        setSeoData(data);
      } else {
        console.error('Failed to fetch SEO data');
      }
    } catch (error) {
      console.error('Error fetching SEO data:', error);
    }
  };

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
    fetchSeoData();
  }, [BASE_URL])

  useEffect(() => { 
    fetchServices(); 
    scrollToSection();
  }, [BASE_URL, selectedLanguage, currentPage, perPage]);

  return (
    <div className="ser">
  
      {seoData && (
        <Helmet>
          <title>{seoData.title}</title>
          <meta name="description" content={seoData.description} />
          <meta name="keywords" content={seoData.keywords} />
        </Helmet>
      )}

      <ServicesTitle />
      <div ref={sectionRef}>
        <ServicesHomeCard services={services} colors={colors} isMobile={isMobile} />
      </div>
      <Pagination 
        totalPages={totalPages}
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
      />
      <ContactUs />
    </div>
  );
}

export default Services;
