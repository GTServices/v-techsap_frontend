import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; 
import Partnyors from './Partnyors';

const PartnyorsHome = () => {
  const [partnersText, setPartnersText] = useState(""); 
  const { BASE_URL, language } = useSelector((state) => state.tech); 

  useEffect(() => {
    const fetchPartnersText = async () => {
      try {
        const response = await fetch(`${BASE_URL}/staticText/our-partners?lang=${language}`);
        const data = await response.json();
        if (response.ok) {
          setPartnersText(data.value);
        } else {
          console.error("Failed to fetch partners text:", data);
        }
      } catch (error) {
        console.error("Error fetching partners text:", error);
      }
    };

    fetchPartnersText();
  }, [BASE_URL, language]); 

  return (
    <>
      <div className='container'>
        <h4 className='gradient-heading'>{partnersText || "Loading..."}</h4>
      </div>
      <Partnyors />
    </>
  );
};

export default React.memo(PartnyorsHome);
