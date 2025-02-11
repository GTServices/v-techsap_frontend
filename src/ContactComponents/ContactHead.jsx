import React, { useState, useEffect } from "react";
import { MdMailOutline } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import "./ContactHead.css";
import { useSelector } from "react-redux";

const ContactHead = React.memo(() => {
  const selectedLanguage = useSelector((state) => state.tech.language);
  const BASE_URL = useSelector((state) => state.tech.BASE_URL);

  const [contactData, setContactData] = useState({});
  const [contacts, setContacts] = useState({});
  const [staticText, setStaticText] = useState({});
  const [heroImage, setHeroImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getText = async () => {
    try {
      const response = await fetch(`${BASE_URL}/customText/getDatas?lang=${selectedLanguage}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          "contact-hero-title",
          "contact-hero-desc",
          "contact-email-title",
          "contact-email-desc",
          "contact-phone-title",
          "contact-phone-desc",
          "contact-address-title",
          "contact-address-desc",
        ]),
      });
      if (!response.ok) throw new Error("Unexpected occurred");
      const data = await response.json();
      setContactData(data);
    } catch (error) {
      setError("Error fetching data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStaticText = async () => {
    try {
      const response = await fetch(`${BASE_URL}/staticText/getDatas?lang=${selectedLanguage}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(["contact", "main-address"]),
      });
      if (!response.ok) throw new Error("Unexpected occurred");
      const data = await response.json();
      setStaticText(data);
    } catch (error) {
      setError("Error fetching data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getHeroImage = async () => {
    try {
      const response = await fetch(`${BASE_URL}/staticImage/contact-hero`);
      if (!response.ok) throw new Error("Unexpected occurred");
      const data = await response.json();
      setHeroImage(data.image);
    } catch {
      setError("Error fetching data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getContacts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/setting/getDatas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(["phone", "email", "address"]),
      });
      if (!response.ok) throw new Error("Unexpected occurred");
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      setError("Error fetching data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getText();
    getStaticText();
    getHeroImage();
    getContacts();
  }, [selectedLanguage]);

  if (loading) {
    return <div>Yüklənir...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  
  const handleCardClick = (type) => {
    switch (type) {
      case "email":
        window.location.href = `mailto:${contacts["email"]}`;
        break;
      case "phone":
        window.location.href = `tel:${contacts["phone"]}`;
        break;
      case "address":
        window.open(
          `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(staticText["main-address"])}`,
          "_blank"
        );
        break;
      default:
        break;
    }
  };

  return (
    <div className="contact-head">
      <h3 className="contact-heading gradient-heading">{staticText.contact}</h3>

      <div className="contact-content">
        <img src={heroImage} alt="Contact Background" className="contact-background-image" />

        <div className="contact-overlay">
          <div className="contact-head-title">
            <h3 className="contact-title">{contactData["contact-hero-title"]}</h3>
            <p className="contact-description">{contactData["contact-hero-desc"]}</p>
          </div>
          <div className="contact-cards">
            <div className="contact-card" onClick={() => handleCardClick("email")}>
              <MdMailOutline className="contact-icon" />
              <h4 className="contact-card-title">{contactData["contact-email-title"]}</h4>
              <p className="contact-card-subtitle">{contactData["contact-email-desc"]}</p>
              <p className="contact-card-email">{contacts["email"]}</p>
            </div>
            <div className="contact-card" onClick={() => handleCardClick("phone")}>
              <FaPhoneAlt className="contact-icon" />
              <h4 className="contact-card-title">{contactData["contact-phone-title"]}</h4>
              <p className="contact-card-subtitle">{contactData["contact-phone-desc"]}</p>
              <p className="contact-card-email">{contacts["phone"]}</p>
            </div>
            <div className="contact-card" onClick={() => handleCardClick("address")}>
              <IoLocationSharp className="contact-icon" />
              <h4 className="contact-card-title">{contactData["contact-address-title"]}</h4>
              <p className="contact-card-subtitle">{contactData["contact-address-desc"]}</p>
              <p className="contact-card-email">{staticText["main-address"]}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ContactHead;
