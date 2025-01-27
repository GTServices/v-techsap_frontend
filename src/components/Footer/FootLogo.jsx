import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function FootLogo() {
  const [logoUrl, setLogoUrl] = useState(""); 
  const BASE_URL = useSelector((state) => state.tech.BASE_URL); 

  useEffect(() => {

    const fetchLogo = async () => {
      try {
        const response = await fetch(`${BASE_URL}/staticImage/logo_dark`);
        const data = await response.json();
        if (data && data.image) {
          setLogoUrl(data.image); 
        } else {
          console.error("Logo bilgisi alınamadı.");
        }
      } catch (error) {
        console.error("Logo fetch sırasında bir hata oluştu:", error);
      }
    };

    fetchLogo();
  }, [BASE_URL]);

  return (
    <section className="foot-logo-section">
      <div className="logo-container">
        {logoUrl ? (
          <img src={logoUrl} alt="Company Logo" className="foot-logo-img" />
        ) : (
          <p>Logo yükleniyor...</p> 
        )}
      </div>
      <h4 className="foot-tagline">Sizin Texnologiya Partnyorunuz!</h4>
    </section>
  );
}

export default FootLogo;
