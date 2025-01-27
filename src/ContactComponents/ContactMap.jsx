import React, { memo } from "react";
import { FaLocationDot } from "react-icons/fa6";
import './ContactMap.css';

const ContactMap = memo(() => {
  return (
    <div className="contact-map">
      <div className="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.27122791868!2d32.71576072280216!3d39.92076873218865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d34f2db0f9a8fd%3A0x64f23d9d8898d394!2sAnkara%2C%20Turkey!5e0!3m2!1sen!2str!4v1694858538585!5m2!1sen!2str"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="map-info">
        <h3>Bizə Necə tapa Bilərsiniz?</h3>
        <p>Ünvanımızı tapmaq üçün xəritəyə baxın və bizə rahatlıqla gələn yolu izləyin.</p>
        <div className="location">
          <div className="location-icon">
            <FaLocationDot />
          </div>
          <p>Nizami rayon,Mehdi Abbasov 121</p>
        </div>
      </div>
    </div>
  );
});

export default ContactMap;
