import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function ServicesHomeHead() {
  const [serviceText, setServiceText] = useState(null);
  const BASE_URL = useSelector((state) => state.tech.BASE_URL);
  const selectedLanguage = useSelector((state) => state.tech.language);

  useEffect(() => {
    fetch(`${BASE_URL}/staticText/services?lang=${selectedLanguage}`)
      .then((response) => response.json())
      .then((data) => {
        setServiceText(data.value);  
      })
      .catch((error) => {
        console.error('Error fetching service text:', error);
      });
  }, [BASE_URL, selectedLanguage]);

  if (!serviceText) {
    return <div>Yüklənir...</div>; 
  }

  return (
    <div className="ser-head container">
      <h3 className="gradient-heading">{serviceText || "Xidmətlər"}</h3>
    </div>
  );
}

export default ServicesHomeHead;
