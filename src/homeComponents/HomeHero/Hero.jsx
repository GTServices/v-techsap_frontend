import React, { memo, useCallback, useEffect, useState } from "react";
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
  const BASE_URL = useSelector((state) => state.tech.BASE_URL);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`${BASE_URL}/staticImage/home-hero?lang=${selectedLanguage}`);
        const data = await response.json();
        setImageUrl(data.image);
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };

    const fetchCounts = async () => {
      try {
        
        const companyCountResponse = await fetch(`${BASE_URL}/setting/company-count`);
        const companyCountData = await companyCountResponse.json();
        setCompanyCount(companyCountData.value);

        const companyCountTextResponse = await fetch(`${BASE_URL}/staticText/company-count`);
        const companyCountTextData = await companyCountTextResponse.json();
        setCompanyCountText(companyCountTextData.value);

    
        const workCountResponse = await fetch(`${BASE_URL}/setting/work-count`);
        const workCountData = await workCountResponse.json();
        setWorkCount(workCountData.value);

        const workCountTextResponse = await fetch(`${BASE_URL}/staticText/work-count`);
        const workCountTextData = await workCountTextResponse.json();
        setWorkCountText(workCountTextData.value);
      } catch (error) {
        console.error("Error fetching counts or text:", error);
      }
    };

    fetchImage();
    fetchCounts();
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

  const renderCard = useCallback(
    (springProps, text) => (
      <div className="hero-left-card">
        <AnimatedNumber springProps={springProps} />
        <p>{text}</p>
      </div>
    ),
    []
  );

  return (
    <section className="hero-wrapper container">
      <div className="total">
        {/* Sol içerik */}
        <div className="hero-left-content">
          <div className="hero-left-top">
            <div className="hero-back">
              <img
                src="/hero-back.png"
                alt="background"
                className="optimized-img"
                loading="lazy"
              />
            </div>
            <h2>
              Biz insanları ön planda tutan <br /> texnologiya innovatoruyuq
            </h2>
            <p>
              "v-TECHSAP" İT xidmətləri, bulud saxlanması, kibertəhlükəsizlik və
              innovativ infrastruktur idarəçiliyi ilə müştərilərinə etibarlı
              texnologiya dəstəyi təmin edir.
            </p>
            <button type="button">Bizdən soruş</button>
          </div>
        </div>
        
        <div className="hero-left-bottom">
          {renderCard(props1, companyCount !== null ? companyCountText : "Loading...")}
          {renderCard(props2, workCount !== null ? workCountText : "Loading...")}
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
