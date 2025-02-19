import React, { useEffect, useState, memo } from "react";
import { useSelector } from "react-redux";
import "./AboutInfo.css";

const ContentItem = memo(({ item }) => (
  <div key={item.id} className="about-info__content-left">
    <div className="about-info__image-container">
      <img
        className="about-info__image"
        src={item.image } 
        alt={item.title}
        loading="lazy"
      />
    </div>
    <div className="about-info__description-container">
      <h3 className="about-info__content-header">{item.title}</h3>
      <p className="about-info__content-description">{item.desc}</p>
    </div>
  </div>
));

function AboutInfo() {
  const [data, setData] = useState([]);
  const [heading, setHeading] = useState("");
  const [texts, setTexts] = useState({});


  const [rightImage, setRightImage] = useState(""); 
  const [isLoading, setIsLoading] = useState(true);
  const BASE_URL = useSelector((state) => state.tech.BASE_URL); 
  const selectedLanguage = useSelector((state) => state.tech.language); 

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); 

        const valuesResponse = await fetch(`${BASE_URL}/ourValues?lang=${selectedLanguage}`);
        if (!valuesResponse.ok) {
          throw new Error("Əsas məlumat alınarkən xəta baş verdi");
        }
        const valuesData = await valuesResponse.json();
        setData(valuesData);

        
        const imageResponse = await fetch(`${BASE_URL}/staticImage/about-value`);
        if (!imageResponse.ok) {
          throw new Error("Şəkil məlumatı alınarkən xəta baş verdi");
        }
        const imageData = await imageResponse.json();
        setRightImage(imageData.image);
      } catch (error) {
        console.error("Xəta:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const getText = async () => {
      try {
        const response = await fetch(`${BASE_URL}/customText/getDatas?lang=${selectedLanguage}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify([
            "about-value-title", 
            "about-value-desc"
          ]),
        });
        if (!response.ok) throw new Error("Unexpected occurred");
        const data = await response.json(); 
        setTexts(data);
      } catch (error) {
        setError("Error fetching data");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
  
    const getHeading = async () => {
      try{
        const response = await fetch(`${BASE_URL}/staticText/our-values?lang=${selectedLanguage}`)
        if (!response.ok) throw new Error("Unexpected occurred");
        const data = await response.json(); 
        setHeading(data.value)
      } catch {
        setError("Error fetching data");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
    getHeading();
    getText();
  }, [BASE_URL, selectedLanguage]);

  if (isLoading) {
    return <div></div>; 
  }

  return (
    <div className="about-info container">
      <h3 className="about-info__header">{heading}</h3>
      <div className="about-info__title">
        <h4 className="about-info__subtitle">{texts["about-value-title"]}</h4>
        <p className="about-info__description">
          {texts["about-value-desc"]}
        </p>
      </div>
      <div className="about-total">
        <div className="about-info__content">
          {data.map((item) => (
            <ContentItem key={item.id} item={item} />
          ))}
        </div>
        <div className="about-info__content-right">
          <img
            className="about-info__content-right-image"
            src={rightImage} 
            alt="About Us"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

export default AboutInfo;
