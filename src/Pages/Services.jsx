import React, { useState, useEffect } from 'react';
import ServicesHomeCard from '../homeComponents/services-home/ServicesHomeCard';
import ContactUs from '../components/ContactUs/ConstactUs';
import ServicesTitle from '../servicesComponents/ServicesTitle';
import Pagination from '../components/Pagination/Pagination';
import { useSelector } from 'react-redux';

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
        throw new Error("Xidmətlər məlumatı alınarkən xəta baş verdi");
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





  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth <= 768);
  //   };

  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  return (
    <div className='ser container'>
      <ServicesTitle />
      {/* {loading ? (
        <p>Yüklənir...</p> 
      ) : ( */}
        <ServicesHomeCard services={services} colors={colors} isMobile={isMobile} />
      {/* )} */}
      <Pagination 
        totalPages={totalPages}
        currentPage= {currentPage} 
        setCurrentPage = {setCurrentPage}
      />
      <ContactUs />
    </div>
  );
}

export default Services;
