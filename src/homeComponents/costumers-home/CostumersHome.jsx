import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import CostumerCard from './CostumerCard';
import './CostumerCard.css';

function CostumersHome() {
  const [customerTitle, setCustomerTitle] = useState('');  
  const BASE_URL = useSelector((state) => state.tech.BASE_URL); 
  const language = useSelector((state) => state.tech.language);  

  const handleSeeAllClick = useCallback(() => {
    console.log('Navigating to all customers...');
  }, []);

  useEffect(() => {
    const fetchCustomerTitle = async () => {
      try {
     
        const response = await fetch(`${BASE_URL}/staticText/customer?lang=${language}`);
        const data = await response.json();

        if (response.ok) {
          setCustomerTitle(data.value); 
        } else {
          console.error('Failed to fetch customer title');
        }
      } catch (error) {
        console.error('Error fetching customer title:', error);
      }
    };

    fetchCustomerTitle();  
  }, [BASE_URL, language]); 

  return (
    <div className="costumer-total container">
      <h4 className="gradient-heading">{customerTitle || 'Loading...'}</h4>  
      <CostumerCard />

      <div className="costumersButton">
        <a href="#" onClick={handleSeeAllClick}>
          <button className="orangeBtn">Hamısına bax</button>
        </a>
      </div>
    </div>
  );
}

export default React.memo(CostumersHome);
