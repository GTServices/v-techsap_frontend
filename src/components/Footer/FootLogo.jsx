import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function FootLogo() {
  const [logoUrl, setLogoUrl] = useState(""); 
  const [footerTitle, setFooterTitle] = useState("");  
  const BASE_URL = useSelector((state) => state.tech.BASE_URL); 
  const selectedLanguage = useSelector((state) => state.tech.language);  

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await fetch(`${BASE_URL}/staticImage/logo-dark`);
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

    const fetchFooterTitle = async () => { 
      try {
        const response = await fetch(`${BASE_URL}/customText/footer-title?lang=${selectedLanguage}`);
        const data = await response.json();
        if (data && data.value) {
          setFooterTitle(data.value);
        } else {
          console.error("Footer title bilgisi alınamadı.");
        }
      } catch (error) {
        console.error("Footer title fetch sırasında bir hata oluştu:", error);
      }
    };

    fetchLogo();
    fetchFooterTitle();  

  }, [BASE_URL, selectedLanguage]);  

  return (
    <section className="foot-logo-section">
      <div className="logo-container">
        {logoUrl ? (
          <Link to={`/${selectedLanguage}`}>
            <img src={logoUrl} alt="Company Logo" className="foot-logo-img" />
          </Link>
        ) : (
          <p>Logo</p> 
        )}
      </div>
      <h4 className="foot-tagline">{footerTitle}</h4> 
    </section>
  );
}

export default FootLogo;
