import React, { useEffect, useState, memo } from "react";
import { useSelector } from "react-redux"; 
import CostumerCard from "../homeComponents/costumers-home/CostumerCard";
import "./AboutCostumers.css";

const MemoizedCostumerCard = memo(CostumerCard);

function AboutCostumers() {
  const [texts, setTexts] = useState("");
  const [customerText, setCustomerText] = useState("");
  const BASE_URL = useSelector((state) => state.tech.BASE_URL); 
  const selectedLanguage = useSelector((state) => state.tech.language);

  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/customText/customer-title?lang=${selectedLanguage}`);
      if (!response.ok) {
        throw new Error("Failed to fetch static text data");
      }
      const data = await response.json();

      setCustomerText(data.value || "We grow together with our customers!"); 
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getStaticText = async () => {
    try {
      const response = await fetch(`${BASE_URL}/staticText/getDatas?lang=${selectedLanguage}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify([
          "see-all", 
          "our-customers"
        ]),
      });
      if (!response.ok) throw new Error("Unexpected occurred");
      const data = await response.json(); 
      setTexts(data);
    } catch (error) {
      // setError("Error fetching data");
      console.error(error);
    } 
  }

  useEffect(() => {
    if (!BASE_URL) {
      console.error("BASE_URL is not available in Redux store");
      return;
    }
    
    fetchData();
    getStaticText();
  }, [BASE_URL, selectedLanguage]); 

  return (
    <div className="about-costumers container">
      <div className="about-costumers-title">
        <h4 className="gradient-heading">{texts["our-customers"]}</h4>
        <p>{customerText}</p>
        <MemoizedCostumerCard />
        <div className="costumersButton">
          {/* <button className="orangeBtn">{texts["see-all"]}</button> */}
        </div>
      </div>
    </div>
  );
}

export default AboutCostumers;
