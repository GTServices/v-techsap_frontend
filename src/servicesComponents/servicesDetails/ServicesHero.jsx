import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"; 
import "../servicesDetails/ServicesHero.css";

function ServicesHero() {
  const [heroData, setHeroData] = useState(null);
  const [error, setError] = useState(null);
  const BASE_URL = useSelector((state) => state.tech.BASE_URL); 
  const language = useSelector((state) => state.tech.language); 
const selectedLanguage = useSelector((state) => state.tech.language);
  useEffect(() => {
    fetch(`${BASE_URL}/service/1?lang=${selectedLanguage}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch data from server: ${response.statusText}`);
        }
        const contentType = response.headers.get("Content-Type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Expected JSON response but got something else");
        }
        return response.json(); 
      })
      .then((data) => {
        console.log("Fetched Data:", data); 
        setHeroData(data); 
      })
      .catch((error) => {
        setError(error.message); 
        console.error("Xəta:", error);
      });
  }, [BASE_URL, language]); 

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!heroData) {
    return <div>Yüklənir...</div>; 
  }


  const { image, title, shortDesc, desc, specs,subTitle } = heroData;

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
          <button className="orangeBtn">Müraciət et</button>
        </div>
      </div>
    </div>
  );
}

export default ServicesHero;
