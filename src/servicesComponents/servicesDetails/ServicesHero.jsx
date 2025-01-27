import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"; 
import "../servicesDetails/ServicesHero.css";
import { Link } from "react-router-dom";

function ServicesHero({serviceData}) {
  const BASE_URL = useSelector((state) => state.tech.BASE_URL); 
  const language = useSelector((state) => state.tech.language); 
  const selectedLanguage = useSelector((state) => state.tech.language);
  const [buttonText, setButtonText] = useState("")

  useEffect(() => {
    fetch(`${BASE_URL}/staticText/apply?lang=${selectedLanguage}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch data from server`);
        }
        return response.json(); 
      })
      .then((data) => {
        setButtonText(data.value); 
      })
      .catch((error) => {
        console.error("Xəta:", error);
      });
  }, [BASE_URL, language]); 

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  if (!serviceData) {
    return <div>Yüklənir...</div>; 
  }


  const { image, title, desc, specs,subTitle } = serviceData;

  return (
    <div className="services-hero container">
      <div className="services-hero-all">
        {/* Left Hero Section */}
        <div className="services-left-hero">
          {image ? (
            <img src={image} alt={title || "Service Image"} />
          ) : (
            <div>No image available</div>
          )}
        </div>

        {/* Right Hero Section */}
        <div className="services-hero-right-top">
          <h3>{subTitle || "No Title"}</h3> 
          <p>{desc || "No description available"}</p>
        </div>

        {/* Description */}
        {/* <div className="services-hero-description">
          <p>{desc || "No description available"}</p>
        </div> */}

    
        {specs && specs.length > 0 ? (
          <div className="services-hero-right-bottom">
            {specs.map((spec, index) => (
              <div className={`services-hero-card-${spec.id}`} key={spec.id}>
                <h4>{index + 1 < 10 ? `0${index + 1}` : index + 1}</h4>
                <h3>{spec.title || "No Title"}</h3>
                <p>{spec.desc || "No description available"}</p>
              </div>
            ))}
          </div>
        ) : (
          <div>No specs available</div>
        )}

   
        <div className="ser-but">
          <Link to="/contact" className="orangeBtn">{buttonText}</Link>
        </div>
      </div>
    </div>
  );
}

export default ServicesHero;
