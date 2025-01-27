import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaLocationDot, FaPhone, FaInstagram, FaLinkedin, FaYoutube, FaFacebook } from "react-icons/fa6";
import "./Footer.css";

function FootContact() {
  const [contactData, setContactData] = useState({ phone: "", address: "" });
  const [contactTitle, setContactTitle] = useState(""); 
  const [loading, setLoading] = useState(true); 
  const BASE_URL = useSelector((state) => state.tech.BASE_URL);
  const language = useSelector((state) => state.tech.language);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        setLoading(true);
        
        const response = await fetch(`${BASE_URL}/setting/getDatas?lang=${language}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify([
            "phone", "address", "instagram-link", "linkedin-link", "youtube-link", "facebook-link"
          ]),
        });

        const data = await response.json();
        if (response.ok) {
          setContactData({
            phone: data.phone,
            address: data.address,
          });
        } else {
          console.error("Failed to fetch contact data", data);
        }

        const titleResponse = await fetch(`${BASE_URL}/staticText/contact?lang=${language}`);
        const titleData = await titleResponse.json();

        if (titleResponse.ok) {
          setContactTitle(titleData.value);
        } else {
          console.error("Failed to fetch contact title", titleData);
        }
      } catch (error) {
        console.error("Error fetching contact data:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchContactData();
  }, [BASE_URL, language]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="foot-contact">
      <h4 className="foot-contact-title">{contactTitle }</h4>
      <ul className="contact-details">
        <li>
          <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
            <FaLocationDot className="contact-icon" />
            {contactData.address || "Address not available"}
          </a>
        </li>
        <li>
          <a href={`tel:${contactData.phone}`} target="_blank" rel="noopener noreferrer">
            <FaPhone className="contact-icon" />
            {contactData.phone || "Phone number not available"}
          </a>
        </li>
      </ul>
      <div className="social-icons">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="instagram-icon" aria-label="Instagram">
          <FaInstagram />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="linkedin-icon" aria-label="LinkedIn">
          <FaLinkedin />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="youtube-icon" aria-label="YouTube">
          <FaYoutube />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="facebook-icon" aria-label="Facebook">
          <FaFacebook />
        </a>
      </div>
    </div>
  );
}

export default FootContact;
