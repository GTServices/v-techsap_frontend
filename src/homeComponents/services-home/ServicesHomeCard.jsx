import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; 
import "./ServicesHome.css";

function ServicesHomeCard({ colors = ["#ccc"], isMobile = false }) {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const BASE_URL = useSelector((state) => state.tech.BASE_URL); 
  const selectedLanguage = useSelector((state) => state.tech.language); 

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/service?perPage=6&page=1&lang=${selectedLanguage}`);
        if (!response.ok) {
          throw new Error("Xidmətlər məlumatı alınarkən xəta baş verdi");
        }
        const result = await response.json();
        setServices(result.data); 
      } catch (error) {
        console.error("Xəta:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, [BASE_URL, selectedLanguage]);

  if (isLoading) {
    return <p>Yüklənir...</p>;
  }

  return (
    <div className="card-zone">
      {Array.isArray(services) && services.length > 0 ? (
        services.slice(0, isMobile ? 3 : services.length).map((service, index) => (
          <Link
            to={`/services/${service.id}`}
            key={service.id}
            className="card-link-wrapper"
          style={{width:"100%"}}>
            <div
              className="card"
              style={{ backgroundColor: colors[index % colors.length] }}
            >
              <div className="card-title">
                <h3>{service.title}</h3>
                <i>
                  <FaArrowUp />
                </i>
              </div>
              <p>{service.shortDesc }</p>
              <div className="card-img">
                <img
                  src={service.image} 
                  alt={service.title}
                  loading="lazy"
                />
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p>Xidmət mövcud deyil</p>
      )}
    </div>
  );
}

export default ServicesHomeCard;
