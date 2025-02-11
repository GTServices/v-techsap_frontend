import React, { useEffect, useState } from "react";
import "./ServicesTitle.css";
import { useSelector } from "react-redux";

const ServicesTitle = () => {
  const [texts, setTexts] = useState("");
  const [headingText, setHeadingText] = useState("");
  const BASE_URL = useSelector((state) => state.tech.BASE_URL);
  const selectedLanguage = useSelector((state) => state.tech.language);

  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/staticText/services?lang=${selectedLanguage}`);
      if (!response.ok) {
        throw new Error("Failed to fetch static text data");
      }
      const data = await response.json();

      setHeadingText(data.value || "Services");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getTexts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/customText/getDatas?lang=${selectedLanguage}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(["service-title", "service-desc"]),
      });
      if (!response.ok) throw new Error("Unexpected occurred");
      const data = await response.json();
      setTexts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!BASE_URL) {
      console.error("BASE_URL is not available in Redux store");
      return;
    }

    fetchData();
    getTexts();
  }, [BASE_URL, selectedLanguage]);

  // headingText lokal müqayisə ilə böyük hərf olub-olmadığını yoxlayırıq
  const isUpperCase = headingText.localeCompare(headingText.toLocaleUpperCase("az")) === 0;
  const formattedHeading = isUpperCase ? headingText : headingText.toLocaleUpperCase("az");

  return (
    <div className="services-title-container container">
      <h3 className="services-title-heading gradient-heading">{formattedHeading}</h3>
      <div className="services-title-content">
        <h3 className="services-title-subheading">{texts["service-title"]}</h3>
        <p className="services-title-description">{texts["service-desc"]}</p>
      </div>
    </div>
  );
};

export default React.memo(ServicesTitle);
