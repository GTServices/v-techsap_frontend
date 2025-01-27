import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import '../costumers-home/costumerCard.css';

function CostumerCard({ maxCards: maxCardsProp, serviceCustomers }) {
  const [customers, setCustomers] = useState([]);
  const [maxCards, setMaxCards] = useState(10); 
  const BASE_URL = useSelector((state) => state.tech.BASE_URL);  
  const language = useSelector((state) => state.tech.language);  

  const updateMaxCards = useCallback(() => {
    const width = window.innerWidth;
    if (width < 375) {
      setMaxCards(12);
    } else if (width < 768) {
      setMaxCards(8);
    } else {
      setMaxCards(10);
    }
  }, []);

  useEffect(() => {
    updateMaxCards();  
    window.addEventListener('resize', updateMaxCards);  

    return () => {
      window.removeEventListener('resize', updateMaxCards); 
    };
  }, [updateMaxCards]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/customer${serviceCustomers ? "" : "/homePage"}?limit=${maxCards}`);  
        if (!response.ok) {
          throw new Error('Network error');
        }
        const data = await response.json();
        if (data) {
          setCustomers(data);
        } else {
          console.error('No customer data found');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [BASE_URL, language, maxCards]);  

  const effectiveMaxCards = maxCardsProp || maxCards;

  const CustomerCardMemo = React.memo(({ customer }) => (
    <div className="costumer-card" key={customer.id}>
      <div className="costumer-image">
        <img src={customer.image} alt={`Customer ${customer.id}`} />
      </div>
    </div>
  ));

  return (
    <div className="costumer container">
      <div className="customer-list">
        {serviceCustomers ? (
          serviceCustomers?.slice(0, effectiveMaxCards).map((customer) => (
            <CustomerCardMemo customer={customer} key={customer.id} />
          ))
        ) : customers.length > 0 ? (
          customers.slice(0, effectiveMaxCards).map((customer) => (
            <CustomerCardMemo customer={customer} key={customer.id} />
          ))
        ) : (
          <p>No customers found.</p>
        )}
      </div>
    </div>
  );
}

export default React.memo(CostumerCard);
