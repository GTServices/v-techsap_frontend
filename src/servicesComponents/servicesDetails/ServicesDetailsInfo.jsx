import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../servicesDetails/ServicesDetailsInfo.css';

function ServicesDetailsInfo() {
  const [cards, setCards] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [benefitImage, setBenefitImage] = useState(null); 
  const [benefitsTitle, setBenefitsTitle] = useState(""); 
  
  const BASE_URL = useSelector((state) => state.tech.BASE_URL); 
  const selectedLanguage = useSelector((state) => state.tech.language); 

  useEffect(() => {
   
    fetch(`${BASE_URL}/service/2?lang=${selectedLanguage}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch benefits from the server");
        }
        return response.json();
      })
      .then((data) => {
        setCards(data.benefits);
        setBenefitImage(data.benefitImage || null);
        setBenefitsTitle(data.benefitsTitle || "Faydaları və Dəyəri"); 
        setLoading(false); 
      })
      .catch((error) => {
        console.error('Məlumat çəkilməsində səhv:', error);
        setLoading(false); 
      });
  }, [BASE_URL, selectedLanguage]); 

  if (loading) {
    return <div>Yüklənir...</div>; 
  }

  return (
    <div className='services-detail-info container'>
      <div className="services-detail-info-title">
        <h3>{ "salam"}</h3>
        <p>{benefitsTitle || "İT Xidmətlərimizin Sizə Gətirdiyi Dəyər və Faydalar"}</p> 
      </div>

      <div className="info-cards">
        {cards.map((card, index) => (
          <div key={card.id} className="card-item">
            <h3>{card.title || "No Title"}</h3>
            <p>{card.desc || "No description available"}</p>
            {
                !index && benefitImage && (
                <div className="card-item-img">
                    <img src={benefitImage} alt="Benefit Image" />
                </div>
                )
            }
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServicesDetailsInfo;
