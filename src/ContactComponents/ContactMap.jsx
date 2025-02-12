import React, { memo, useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import './ContactMap.css';
import { useSelector } from "react-redux";

const ContactMap = memo(() => {
  const selectedLanguage = useSelector((state) => state.tech.language);
  const BASE_URL = useSelector((state) => state.tech.BASE_URL);

  const [texts, setTexts] = useState({});
  const [address, setAddress] = useState("");
  const [map, setMap] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getText = async () => {
    try {
      const response = await fetch(`${BASE_URL}/customText/getDatas?lang=${selectedLanguage}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify([
          "contact-map-title", 
          "contact-map-desc"
        ]),
      });
      if (!response.ok) throw new Error("Unexpected occurred");
      const data = await response.json(); 
      setTexts(data);
    } catch (error) {
      setError("Error fetching data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getAddress = async () => {
    try{
      const response = await fetch(`${BASE_URL}/staticText/main-address?lang=${selectedLanguage}`)
      if (!response.ok) throw new Error("Unexpected occurred");
      const data = await response.json(); 
      setAddress(data.value)
    } catch {
      setError("Error fetching data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const getMap = async () => {
    try{
      const response = await fetch(`${BASE_URL}/setting/map-iframe`)
      if (!response.ok) throw new Error("Unexpected occurred");
      const data = await response.json(); 
      setMap(data.value)
    } catch {
      setError("Error fetching data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    getText();
    getAddress();
    getMap();
  }, [selectedLanguage]); 


  if (loading) {
    return <div></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="contact-map">
      <div className="map" dangerouslySetInnerHTML={{__html: map}}>

      </div>
      <div className="map-info">
        <h3>{texts["contact-map-title"]}</h3>
        <p>{texts["contact-map-desc"]}</p>
        <div className="location">
          <div className="location-icon">
            <FaLocationDot />
          </div>
          <p>{address}</p>
        </div>
      </div>
    </div>
  );
});

export default ContactMap;
