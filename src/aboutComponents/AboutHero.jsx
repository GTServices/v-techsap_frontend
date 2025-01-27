import React, { useEffect, useState, memo } from "react";
import CountUp from "react-countup";
import { useSelector } from "react-redux"; 
import "./AboutHero.css";

const StatsItem = memo(({ stat }) => (
  <div className="stats-item">
    <div className="about-num">
      <CountUp end={parseInt(stat.num)} duration={2} /> <span>+</span>
    </div>
    <div className="num-text">{stat.text}</div>
  </div>
));

function AboutHero() {
  const [data, setData] = useState(null);
  const [heroImage, setHeroImage] = useState(""); 
  const BASE_URL = useSelector((state) => state.tech.BASE_URL); 
  const selectedLanguage = useSelector((state) => state.tech.language); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await fetch("/db.json");
        const result = await response.json();
        setData(result.aboutHero);

       
        const imageResponse = await fetch(`${BASE_URL}/staticImage/about-main`);
        if (!imageResponse.ok) {
          throw new Error("Hero şəkil məlumatı alınarkən xəta baş verdi");
        }
        const imageData = await imageResponse.json();
        setHeroImage(imageData.image); // Şəkil URL-i state-ə yazılır
      } catch (error) {
        console.error("Xəta:", error);
      }
    };

    fetchData();
  }, [BASE_URL]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <section className="about-hero container">
      <h4 className="section-title gradient-text">{data.title}</h4>
      <div className="about-hero-content">
        <div className="about-hero-text">
          <h3 className="about-title">Biz Kimik?</h3>
          <h5 className="about-subtitle">{data.subtitle}</h5>
          <p className="about-description">{data.description}</p>
        </div>
        <div className="about-hero-visual">
          <div className="hero-image-wrapper">
            <img
              src={heroImage}
              alt="About Hero"
              className="hero-image"
              loading="lazy" 
            />
            <div className="black-shadow"></div>
          </div>
          <div className="stats-grid">
            {data.stats.map((stat, index) => (
              <StatsItem key={index} stat={stat} />
            ))}
          </div>
        </div>
      </div>
      <div className="game">
        <img
          src={data.images.gameImage.src}
          alt={data.images.gameImage.alt}
          loading="lazy" 
        />
      </div>
    </section>
  );
}

export default AboutHero;
