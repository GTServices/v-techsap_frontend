import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; 
import "./ServicesHome.css";

function ServicesHomeCard({ services, colors = ["#ccc"], isMobile = false }) {
  // const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 
  const BASE_URL = useSelector((state) => state.tech.BASE_URL); 
  const selectedLanguage = useSelector((state) => state.tech.language); 


  if (isLoading) {
    return <p>Yüklənir...</p>;
  }

  return (
    <div className="card-zone container">
      {Array.isArray(services) && services.length > 0 ? (
        services.slice(0, isMobile ? 3 : services.length).map((service, index) => (
          <Link
            to={`/${selectedLanguage}/services/${service.slug}`}
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
