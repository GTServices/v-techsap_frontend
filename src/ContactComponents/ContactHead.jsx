import React, { useState, useEffect, useCallback, useMemo } from "react";
import { MdMailOutline } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import "./ContactHead.css";

const ContactHead = React.memo(() => {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await fetch("/db.json");
        const data = await response.json();
        setContactData(data.contact);
      } catch (error) {
        setError("Error fetching data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchContactData();
  }, []); 
  const renderIcon = useCallback((icon) => {
    switch (icon) {
      case "MdMailOutline":
        return <MdMailOutline className="contact-icon" />;
      case "FaPhoneAlt":
        return <FaPhoneAlt className="contact-icon" />;
      case "IoLocationSharp":
        return <IoLocationSharp className="contact-icon" />;
      default:
        return null;
    }
  }, []); 

  if (loading) {
    return <div>Yüklənir...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const { heading, title, description, cards } = contactData;

  return (
    <div className="contact-head">
      <h3 className="contact-heading gradient-heading">{heading}</h3>

      <div className="contact-content">
        <img
          src="/public/cont.jpg"
          alt="Contact Background"
          className="contact-background-image"
        />

        <div className="contact-overlay">
          <div className="contact-head-title">
            <h3 className="contact-title">{title}</h3>
            <p className="contact-description">{description}</p>
          </div>
          <div className="contact-cards">
            {cards.map((card, index) => {
              const { icon, title, subtitle, email } = card;
              return (
                <div className="contact-card" key={index}>
                  {renderIcon(icon)} 
                  <h4 className="contact-card-title">{title}</h4>
                  <p className="contact-card-subtitle">{subtitle}</p>
                  <p className="contact-card-email">{email}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
});

export default ContactHead;
