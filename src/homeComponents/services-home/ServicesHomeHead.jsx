import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
        console.error("Error fetching service text:", error);
      });
  }, [BASE_URL, selectedLanguage]);

  if (!serviceText) {
    return <div></div>;
  }


  const isUpperCase = serviceText.localeCompare(serviceText.toLocaleUpperCase("az")) === 0;
  const formattedText = isUpperCase ? serviceText : serviceText.toLocaleUpperCase("az");

  return (
    <div className="ser-head container">
      <h3 className="gradient-heading">{formattedText || "XİDMƏTLƏR"}</h3>
    </div>
  );
}

export default ServicesHomeHead;
