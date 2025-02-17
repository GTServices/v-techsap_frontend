import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; 
import "./ServicesHome.css";

function ServicesHomeCard({ services, colors = ["#ccc"] }) {
  const [isLoading, setIsLoading] = useState(false); 
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Track the window width
  const BASE_URL = useSelector((state) => state.tech.BASE_URL); 
  const selectedLanguage = useSelector((state) => state.tech.language); 

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const getCardCount = () => {
    if (windowWidth < 375) return 3; 
    if (windowWidth < 768) return 4; 
    return services.length; 
  };

  if (isLoading) {
    return <p></p>;
  }

  return (
    <div className="card-zone container">
      {Array.isArray(services) && services.length > 0 ? (
        services.slice(0, getCardCount()).map((service, index) => (
          <Link
            to={`/${selectedLanguage}/services/${service.slug}`}
            key={service.id}
            className="card-link-wrapper"
            style={{ width: "100%" }}
          >
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
              <p>{service.shortDesc}</p>
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
        <p></p>
      )}
    </div>
  );
}

export default ServicesHomeCard;
