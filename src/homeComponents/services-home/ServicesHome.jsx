import React, { useEffect, useState, useCallback } from "react";
import "./ServicesHome.css";
import { FaArrowUp } from "react-icons/fa";
import OrangeBTN from "../../components/Buttons/OrangeBTN";
import ServicesHomeHead from "./ServicesHomeHead";
import ServicesHomeCard from "./ServicesHomeCard";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

function ServicesHome() {
  const [services, setServices] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [miniMobile, setMiniMobile] = useState(window.innerWidth < 375);
  const [error, setError] = useState(null);

  const colors = [
    "var(--Pale_Blue)",
    "var(--Soft_Gray)",
    "var(--Dusty_Green)",
    "var(--Mist_Green)",
    "var(--Soft_Lilac)",
    "var(--Creamy_Almond)",
  ];

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth <= 768);
    setMiniMobile(window.innerWidth < 375);
  }, []);

  useEffect(() => {
    fetch("/db.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Data loading failed");
        }
        return response.json();
      })
      .then((data) => {
        if (data && Array.isArray(data["ser-home"])) {
          setServices(data["ser-home"]);
        } else {
          console.error("Invalid data format received", data);
          setServices([]);
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        setError("Failed to load services. Please try again later.");
        setServices([]);
      });

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return (
    <section className="ser-home container">
      <ServicesHomeHead />
      {error ? (
        <p className="error-message">{error}</p>
      ) : services.length > 0 ? (
        <ServicesHomeCard services={services} colors={colors} isMobile={isMobile} />
      ) : (
        <p className="no-services">Hal-hazırda heç bir xidmət mövcud deyil.</p>
      )}
      {miniMobile ? (
        <div className="ser-home-btn">
          <button className="orangeBtn">Daha Cox</button>
        </div>
      ) : (
        <div className="left-right-btns">
      <i><FaArrowLeft /></i>
      <i className="right-arrow"><FaArrowRight /></i>
    </div>
      )}
    </section>
  );
}

export default ServicesHome;
