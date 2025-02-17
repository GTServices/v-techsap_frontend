import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import './Partnyors.css';

function Partnyors() {
  const [partners, setPartners] = useState([]);
  const BASE_URL = useSelector((state) => state.tech.BASE_URL);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch(`${BASE_URL}/partner`);
        const data = await response.json();
        setPartners(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPartners();
  }, [BASE_URL]);

  const doubledPartners = useMemo(() => {
    return partners.concat(partners); 
  }, [partners]);

  return (
    <div className="partnyors">
      <div className="slider">
        {doubledPartners.map((partner) => (
          <img
            key={partner.id}
            src={partner.image}
            alt={`Partner ${partner.title}`}
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}

export default Partnyors;
