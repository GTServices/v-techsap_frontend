import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import FootContact from "./FootContact";
import FootLogo from "./FootLogo";
import "./Footer.css";

function Footer() {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const [loading, setLoading] = useState(true); 
  const [texts, setTexts] = useState({});
  const BASE_URL = useSelector((state) => state.tech.BASE_URL);
  const language = useSelector((state) => state.tech.language);  
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchTexts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/staticText/getDatas?lang=${language}`, {  
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(["home-page", "about", "contact", "services", "links"]),
        });

        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        // console.log("Fetched Texts:", data);
        setTexts(data);
        setLoading(false); 
      } catch (error) {
        console.error("Text fetching failed:", error);
        setLoading(false); 
      }
    };

    fetchTexts();
  }, [BASE_URL, language]);


  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="foot">
      <div className="foot-container container">
        <div className="foot-top">
          <div className="foot-left">
            <FootLogo />
          </div>

          {isSmallScreen ? (
            <div className="forFlex">
              <div className="foot-links">
                <h4>{texts.links}</h4>
                <ul>
                  <li>
                    <a href="#">{texts["home-page"]}</a>
                  </li>
                  <li>
                    <a href="#">{texts["about"]}</a>
                  </li>
                  <li>
                    <a href="#">{texts["services"]}</a>
                  </li>
                  <li>
                    <a href="#">{texts["contact"]}</a>
                  </li>
                </ul>
              </div>
              <div className="foot-right">
                <FootContact />
              </div>
            </div>
          ) : (
            <>
              <div className="foot-links">
                <h4>{texts.links}</h4>
                <ul>
                  <li>
                    <a href="#">{texts["home-page"]}</a>
                  </li>
                  <li>
                    <a href="#">{texts["about"]}</a>
                  </li>
                  <li>
                    <a href="#">{texts["services"]}</a>
                  </li>
                  <li>
                    <a href="#">{texts["contact"]}</a>
                  </li>
                </ul>
              </div>
              <div className="foot-right">
                <FootContact />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="foot-bottom container">
        <p>
          &copy; 2025 Tech. Bütün hüquqlar <a href="#">WebCoder</a> qorunur.
        </p>
      </div>
    </section>
  );
}

export default Footer;
