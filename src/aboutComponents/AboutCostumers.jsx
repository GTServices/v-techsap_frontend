import React, { useEffect, useState, memo } from "react";
import { useSelector } from "react-redux"; 
import CostumerCard from "../homeComponents/costumers-home/CostumerCard";
import "./AboutCostumers.css";

const MemoizedCostumerCard = memo(CostumerCard);

function AboutCostumers() {
  const [customerText, setCustomerText] = useState("");
  const [seeAllText, setSeeAllText] = useState(""); 
  const BASE_URL = useSelector((state) => state.tech.BASE_URL); 
  const selectedLanguage = useSelector((state) => state.tech.language);

  useEffect(() => {
    if (!BASE_URL) {
      console.error("BASE_URL is not available in Redux store");
      return;
    }

    const fetchData = async () => {
      try {
        // Fetching customer title and see-all text using GET request
        const response = await fetch(`${BASE_URL}/customText/customer-title?lang=${selectedLanguage}`);

        if (!response.ok) {
          throw new Error("Failed to fetch static text data");
        }

        const data = await response.json();

        // Set the customer title from the fetched data
        setCustomerText(data.value || "We grow together with our customers!"); 
        setSeeAllText("See all"); // You can update this as needed from another endpoint if required
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [BASE_URL, selectedLanguage]); 

  return (
    <div className="about-costumers container">
      <div className="about-costumers-title">
        <h4 className="gradient-heading"></h4>
        <p>{customerText}</p>
        <MemoizedCostumerCard />
        <div className="costumersButton">
          <button className="orangeBtn">{seeAllText}</button>
        </div>
      </div>
    </div>
  );
}

export default AboutCostumers;
