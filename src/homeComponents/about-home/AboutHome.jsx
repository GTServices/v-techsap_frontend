import React, { memo, useEffect, useState } from 'react';
import { useSelector } from "react-redux"; 
import './AboutHome.css';
import { Link } from 'react-router-dom';

const AboutContentLeft = memo(({ title, imageUrl }) => (
  <div className="aboutContentLeft">
    <h3>{title}</h3>
    <div className="aboutContentLeftImg">
      <img
        src={imageUrl}
        alt="about-home-img"
        loading="lazy" 
        className="lazy-load-image"
      />
    </div>
  </div>
));

const AboutContentRight = memo(({ subtitle, description, buttonText }) => (
  <div className="aboutContentRight">
    <h3>{subtitle}</h3>
    <p>{description}</p>
    <div className="about-btn-div">
      <Link to="/about" className="orangeBtn">{buttonText}</Link>
    </div>
  </div>
));

function AboutHome() {
  const [data, setData] = useState({
    title: '',
    subtitle: '',
    description: '',
    imageUrl: '',
    buttonText: '',
    headingText: ''
  });

  const BASE_URL = useSelector((state) => state.tech.BASE_URL);
  const selectedLanguage = useSelector((state) => state.tech.language);

  useEffect(() => {
    const fetchCustomText = async () => {
      try {
        const response = await fetch(`${BASE_URL}/customText/getDatas?lang=${selectedLanguage}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(["home-about-title", "home-about-subtitle", "home-about-desc"]),
        });
        const result = await response.json();
        setData((prevData) => ({
          ...prevData,
          title: result["home-about-title"],
          subtitle: result["home-about-subtitle"],
          description: result["home-about-desc"],
        }));
      } catch (error) {
        console.error("Məlumat yüklənərkən xəta baş verdi:", error);
      }
    };

    const fetchImage = async () => {
      try {
        const response = await fetch(`${BASE_URL}/staticImage/home-about`);
        const result = await response.json();
        setData((prevData) => ({
          ...prevData,
          imageUrl: result.image,
        }));
      } catch (error) {
        console.error("Şəkil yüklənərkən xəta baş verdi:", error);
      }
    };

    const fetchButtonText = async () => {
      try {
        const response = await fetch(`${BASE_URL}/staticText/more-details?lang=${selectedLanguage}`);
        const result = await response.json();
        setData((prevData) => ({
          ...prevData,
          buttonText: result.value,
        }));
      } catch (error) {
        console.error("Button mətni yüklənərkən xəta baş verdi:", error);
      }
    };

    const fetchHeadingText = async () => {
      try {
        const response = await fetch(`${BASE_URL}/staticText/about?lang=${selectedLanguage}`);
        const result = await response.json();
        setData((prevData) => ({
          ...prevData,
          headingText: result.value,
        }));
      } catch (error) {
        console.error("Heading mətni yüklənərkən xəta baş verdi:", error);
      }
    };

    fetchCustomText();
    fetchImage();
    fetchButtonText();
    fetchHeadingText();
  }, [BASE_URL, selectedLanguage]);

  return (
    <section className="aboutWrapper container">
      <div className="aboutWrapper-heading">
        <h2 className="gradient-heading">{data.headingText}</h2>
      </div>
      <div className="aboutWrapperContent">
        <AboutContentLeft title={data.title} imageUrl={data.imageUrl} />
        <AboutContentRight 
          subtitle={data.subtitle} 
          description={data.description} 
          buttonText={data.buttonText}
        />
      </div>
    </section>
  );
}

export default AboutHome;
