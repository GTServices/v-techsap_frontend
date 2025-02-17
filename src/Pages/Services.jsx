import React, { useState, useEffect } from 'react';
import ServicesHomeCard from '../homeComponents/services-home/ServicesHomeCard';
import ContactUs from '../components/ContactUs/ConstactUs';
import ServicesTitle from '../servicesComponents/ServicesTitle';
import Pagination from '../components/Pagination/Pagination';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';

function Services() {
  const colors = [
    "var(--Pale_Blue)",
    "var(--Soft_Gray)",
    "var(--Dusty_Green)",
    "var(--Mist_Green)",
    "var(--Soft_Lilac)",
    "var(--Creamy_Almond)",
  ];

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [loading, setLoading] = useState(true); 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [seoData, setSeoData] = useState(null); 
  const BASE_URL = useSelector((state) => state.tech.BASE_URL); 
  const selectedLanguage = useSelector((state) => state.tech.language); 

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
    fetchSeoData();
  }, [BASE_URL])

  useEffect(() => { 
    fetchServices(); 
  }, [BASE_URL, selectedLanguage, currentPage]);

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
      <ServicesHomeCard services={services} colors={colors} isMobile={isMobile} />
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
