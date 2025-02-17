import React, { memo, useEffect, useState } from 'react';
import AboutTeamCard from './AboutTeamCard';
import './AboutTeam.css';
import { useSelector } from 'react-redux';

const MemoizedAboutTeamCard = memo(AboutTeamCard);

function AboutTeam() {
  const [texts, setTexts] = useState("");
  const [headingText, setHeadingText] = useState("");
  const BASE_URL = useSelector((state) => state.tech.BASE_URL); 
  const selectedLanguage = useSelector((state) => state.tech.language);

  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/customText/about-team-title?lang=${selectedLanguage}`);
      if (!response.ok) {
        throw new Error("Failed to fetch static text data");
      }
      const data = await response.json();

      setHeadingText(data.value || "We grow together with our customers!"); 
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
          "our-team"
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
    <div className="about-team container">
      <div className="about-head">
        <h4>{texts["our-team"]}</h4>
        <p>{headingText}</p>
      </div>
 
      <MemoizedAboutTeamCard />
    </div>
  );
}

export default AboutTeam;
