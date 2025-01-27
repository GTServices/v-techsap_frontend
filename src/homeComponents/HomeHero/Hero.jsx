import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSpring, animated } from "@react-spring/web";
import "./Hero.css";

const AnimatedNumber = memo(({ springProps }) => (
  <h5>
    <animated.span>{springProps.number.to((n) => n.toFixed(0))}</animated.span>
    <span className="plus-sign">+</span>
  </h5>
));

function Hero() {
  const selectedLanguage = useSelector((state) => state.tech.language);
  const [imageUrl, setImageUrl] = useState("");
  const [companyCount, setCompanyCount] = useState(null);
  const [workCount, setWorkCount] = useState(null);
  const [companyCountText, setCompanyCountText] = useState("");
  const [workCountText, setWorkCountText] = useState("");
  const [heroTitle, setHeroTitle] = useState("");
  const [heroDesc, setHeroDesc] = useState("");
  const [askUsText, setAskUsText] = useState("");
  const [heroBackImage, setHeroBackImage] = useState(""); 
  const BASE_URL = useSelector((state) => state.tech.BASE_URL);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const imageResponse = await fetch(
          `${BASE_URL}/staticImage/home-hero?lang=${selectedLanguage}`
        );
        const imageData = await imageResponse.json();
        setImageUrl(imageData.image);

        const heroResponse = await fetch(
          `${BASE_URL}/customText/getDatas?lang=${selectedLanguage}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(["home-hero-title", "home-hero-desc"]),
          }
        );
        const heroData = await heroResponse.json();
        setHeroTitle(heroData["home-hero-title"]);
        setHeroDesc(heroData["home-hero-desc"]);

        const companyCountResponse = await fetch(
          `${BASE_URL}/setting/company-count?lang=${selectedLanguage}`
        );
        const companyCountData = await companyCountResponse.json();
        setCompanyCount(companyCountData.value);

        const companyCountTextResponse = await fetch(
          `${BASE_URL}/staticText/company-count?lang=${selectedLanguage}`
        );
        const companyCountTextData = await companyCountTextResponse.json();
        setCompanyCountText(companyCountTextData.value);

        const workCountResponse = await fetch(
          `${BASE_URL}/setting/work-count?lang=${selectedLanguage}`
        );
        const workCountData = await workCountResponse.json();
        setWorkCount(workCountData.value);

        const workCountTextResponse = await fetch(
          `${BASE_URL}/staticText/work-count?lang=${selectedLanguage}`
        );
        const workCountTextData = await workCountTextResponse.json();
        setWorkCountText(workCountTextData.value);

        const askUsResponse = await fetch(
          `${BASE_URL}/staticText/ask-us?lang=${selectedLanguage}`
        );
        const askUsData = await askUsResponse.json();
        setAskUsText(askUsData.value);

        const heroBackResponse = await fetch(
          `${BASE_URL}/staticImage/logo-textless`
        ); 
        const heroBackData = await heroBackResponse.json();
        setHeroBackImage(heroBackData.image);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchHeroData();
  }, [BASE_URL, selectedLanguage]);

  const safeParseInt = (value) => {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? 0 : parsed;
  };

  const props1 = useSpring({
    from: { number: 0 },
    to: { number: companyCount ? safeParseInt(companyCount) : 0 },
    config: { tension: 120, friction: 60 },
  });

  const props2 = useSpring({
    from: { number: 0 },
    to: { number: workCount ? safeParseInt(workCount) : 0 },
    config: { tension: 120, friction: 60 },
  });

  return (
    <section className="hero-wrapper container">
      <div className="total">
        <div className="hero-left-content">
          <div className="hero-left-top">
            <div className="hero-back">
              <img
                src={heroBackImage}
                alt="background"
                className="optimized-img"
                loading="lazy"
              />
            </div>
            <h2>{heroTitle || "Loading..."}</h2>
            <p>{heroDesc || "Loading..."}</p>
            <button type="button">{askUsText || "Loading..."}</button>
          </div>
        </div>

        <div className="hero-left-bottom">
          <div className="hero-left-card">
            <AnimatedNumber springProps={props1} />
            <p>{companyCount !== null ? companyCountText : "Loading..."}</p>
          </div>
          <div className="hero-left-card">
            <AnimatedNumber springProps={props2} />
            <p>{workCount !== null ? workCountText : "Loading..."}</p>
          </div>
        </div>
      </div>

      <div className="hero-right-content">
        <div className="hero-right-img">
          <div className="overlay"></div>
          <img
            src={imageUrl}
            alt="hero image"
            className="optimized-img"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

export default memo(Hero);
