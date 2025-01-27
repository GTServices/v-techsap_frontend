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
  const [nums, setNums] = useState({});
  const [texts, setTexts] = useState({});
  const [heroImage, setHeroImage] = useState(""); 
  const [aboutTitle, setAboutTitle] = useState(""); 
  const [aboutSubtitle, setAboutSubtitle] = useState(""); 
  const [aboutDesc, setAboutDesc] = useState(""); 
  const [gameImage, setGameImage] = useState(""); 
  const [whoAreWe, setWhoAreWe] = useState(""); 
  const BASE_URL = useSelector((state) => state.tech.BASE_URL); 
  const selectedLanguage = useSelector((state) => state.tech.language); 

  useEffect(() => {
    const fetchData = async () => {
      try {
      
        // const response = await fetch("/db.json");
        // const result = await response.json();
        // setData(result.aboutHero);

        
        const customTextResponse = await fetch(`${BASE_URL}/customText/getdatas?lang=${selectedLanguage}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(["about-hero-title", "about-hero-desc"]) 
        });
        if (!customTextResponse.ok) {
          throw new Error("Failed to fetch custom text data");
        }
        const customTextData = await customTextResponse.json();
        setAboutSubtitle(customTextData["about-hero-title"]); 
        setAboutDesc(customTextData["about-hero-desc"]); 

        
        const translationResponse = await fetch(`${BASE_URL}/staticText/getdatas?lang=${selectedLanguage}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify([
            "who-are-we", 
            "about",
            "years-of-experience",
            "project-count",
            "customer-count",
            "team-count"
          ]) 
        });
        if (!translationResponse.ok) {
          throw new Error("Failed to fetch 'who-are-we' translation");
        }
        const translationData = await translationResponse.json();
        setTexts(translationData)
        setWhoAreWe(translationData["who-are-we"] || "Who Are We?"); 
        setAboutTitle(translationData["about"])

        
        const imageResponse = await fetch(`${BASE_URL}/staticImage/about-main`);
        if (!imageResponse.ok) {
          throw new Error("Hero image data fetch failed");
        }
        const imageData = await imageResponse.json();
        setHeroImage(imageData.image); 

     
        const gameImageResponse = await fetch(`${BASE_URL}/staticImage/logo-textless`);
        if (!gameImageResponse.ok) {
          throw new Error("Game image data fetch failed");
        }
        const gameImageData = await gameImageResponse.json();
        setGameImage(gameImageData.image); 
      } catch (error) {
        console.error("Error:", error);
      } finally {
        
      }
    };

    const getNums = async () => {
      try {
        const response = await fetch(`${BASE_URL}/setting/getDatas`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify([
            "years-of-experience",
            "team-count", 
            "customer-count",
            "project-count"
          ]),
        });
        if (!response.ok) throw new Error("Unexpected occurred");
        const data = await response.json(); 
        setNums(data);
      } catch (error) {
        setError("Error fetching data");
        console.error(error);
      } finally {
        // setLoading(false);
      }
    };
  

    fetchData();
    getNums();

  }, [BASE_URL, selectedLanguage]);


  return (
    <section className="about-hero container">
      <h4 className="section-title gradient-text">{aboutTitle}</h4>
      <div className="about-hero-content">
        <div className="about-hero-text">
          <h3 className="about-title">{whoAreWe}</h3> 
          <h5 className="about-subtitle">{aboutSubtitle}</h5> 
          <p className="about-description">{aboutDesc}</p> 
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
            {/* {data.stats.map((stat, index) => (
              <StatsItem key={index} stat={stat} />
            ))} */}
            <StatsItem stat={{num: nums["years-of-experience"], text: texts["years-of-experience"]}} />
            <StatsItem stat={{num: nums["team-count"], text: texts["project-count"]}} />
            <StatsItem stat={{num: nums["customer-count"], text: texts["customer-count"]}} />
            <StatsItem stat={{num: nums["project-count"], text: texts["team-count"]}} />
          </div>
        </div>
      </div>
      <div className="game">
        <img
          src={gameImage}
          alt="Game Image"
          loading="lazy" 
        />
      </div>
    </section>
  );
}

export default AboutHero;
