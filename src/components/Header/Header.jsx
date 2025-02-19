import React, { useState, useEffect, useCallback, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLanguage, setLanguages, setNavbarData } from "../../redux/techSlice";
import "./Header.css";
import { MdOutlineLanguage } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { FaLocationDot, FaPhone, FaInstagram, FaLinkedin, FaYoutube, FaFacebook } from "react-icons/fa6";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";

const Header = memo(() => {
  const dispatch = useDispatch();
  const location = useLocation();
  const {lang} = useParams();
  const currentPath = location.pathname.split("/").slice(2).join("/");
  
  const BASE_URL = useSelector((state) => state.tech.BASE_URL);
  const languages = useSelector((state) => state.tech.languages) || [];
  const [navbarData, setNavbarData] = useState({});
  const [logoURL, setLogoURL] = useState("");
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const storedLanguage = localStorage.getItem('selectedLanguage');
  const [selectedLanguage, setSelectedLanguage] = useState(storedLanguage || "az");

  useEffect(() => {
    changeLanguage(lang);
  }, [])

  const fetchLogo = async () => {
    try {
      const response = await fetch(`${BASE_URL}/staticImage/logo`);
      const data = await response.json();
      setLogoURL(data.image);
    } catch (error) {
      console.error("Error fetching logo:", error);
    }
  };

  const fetchNavbarData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/staticText/getDatas?lang=${selectedLanguage}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(["about", "contact", "home-page", "services", "main-address", "linkedin-link", "youtube-link", "facebook-link", "instagram-link"])
      });
      const data = await response.json();
      if (response.ok) {
        setNavbarData({
          ...data,
          "main-address": data["main-address"] || data["address"]
        });
      } else {
        console.error("Failed to fetch navbar data", data);
      }
    } catch (error) {
      console.error("Error fetching navbar data:", error);
    }
  };

  const fetchLanguages = async () => {
    try {
      const response = await fetch(`${BASE_URL}/lang`);
      const data = await response.json();
      dispatch(setLanguages(data));
    } catch (error) {
      console.error("Error fetching languages:", error);
    }
  };

  useEffect(() => {
    fetchLogo();
    fetchNavbarData();
    fetchLanguages();
  }, [dispatch, selectedLanguage, BASE_URL]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prevState) => !prevState);
    document.body.style.overflow = isMenuOpen ? "auto" : "hidden";
  }, [isMenuOpen]);

  const toggleLanguageMenu = useCallback((event) => {
    event.stopPropagation();
    setIsLanguageOpen((prevState) => !prevState);
  }, []);

  const changeLanguage = useCallback((language) => {
    setSelectedLanguage(language);
    localStorage.setItem('selectedLanguage', language); 
    dispatch(setLanguage(language));
  }, [dispatch]);

  const handleClickOutside = useCallback((event) => {
    if (isLanguageOpen && !event.target.closest(".language_bar")) {
      setIsLanguageOpen(false);
    }

    if (isMenuOpen && !event.target.closest(".head_navList") && !event.target.closest(".hamburger-icon")) {
      setIsMenuOpen(false);
      document.body.style.overflow = "auto";
    }
  }, [isLanguageOpen, isMenuOpen]);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleClickOutside, handleScroll]);

  const handleMenuItemClick = () => {
    setIsMenuOpen(false); 
    document.body.style.overflow = "auto"; 
    window.scrollTo(0, 0); 
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
        document.body.style.overflow = "auto";
      }
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className={`h-wrapper  ${isScrolled ? "scroll-active" : ""} ${isMenuOpen ? "menu-open" : ""}`}>
      <div className="container headerContent">
        <div className="header_logo">
          <Link to={`/${selectedLanguage}`}>
            {logoURL ? (
              <img src={logoURL} alt="header_logo_img" />
            ) : (
              <span></span>
            )}
          </Link>
        </div>

        <nav className={`head_navList ${isMenuOpen ? "active" : ""}`}>
          {isMenuOpen && (
            <div className="miniHeader" style={{ width: "100%" }}>
              <img src={logoURL} alt="logo" style={{ width: "100px", height: "50px" }} />
              <IoClose onClick={toggleMenu} />
            </div>
          )}

          <ul>
            <li>
              <NavLink
                to={`/${selectedLanguage}/`}
                className={({ isActive }) => (isActive && !location.pathname.split("/")[2]) ? "activeLink" : ""}
                onClick={handleMenuItemClick}
              >
                {navbarData["home-page"] || "Ana Sehife"}
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/${selectedLanguage}/about`}
                className={({ isActive }) => isActive ? "activeLink" : ""}
                onClick={handleMenuItemClick}
              >
                {navbarData["about"] || "Haqqımızda"}
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/${selectedLanguage}/services`}
                className={({ isActive }) => isActive ? "activeLink" : ""}
                onClick={handleMenuItemClick}
              >
                {navbarData["services"] || "Xidmətlər"}
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/${selectedLanguage}/contact`}
                className={({ isActive }) => isActive ? "activeLink" : ""}
                onClick={handleMenuItemClick}
              >
                {navbarData["contact"] || "Əlaqə"}
              </NavLink>
            </li>

            {isMenuOpen && (
              <div className="contact-section" style={{ paddingTop: "10rem" }}>
                <ul className="contact-info">
                  <h4 className="contact-section-title">{navbarData["contact"] || "Contact"}</h4>
                  <li>
                    <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
                      <FaLocationDot className="contact-icon" />
                      {navbarData["main-address"] || "Nizami district, Mehdi Abbasov 121"}
                    </a>
                  </li>
                  <li>
                    <a href="tel:0558650545">
                      <FaPhone className="contact-icon" />
                      (055) 865 05 45
                    </a>
                  </li>
                </ul>
                <div className="social-links">
                  <a href={navbarData["instagram-link"] || "https://instagram.com"} target="_blank" rel="noopener noreferrer">
                    <FaInstagram />
                  </a>
                  <a href={navbarData["linkedin-link"]} target="_blank" rel="noopener noreferrer">
                    <FaLinkedin />
                  </a>
                  <a href={navbarData["youtube-link"] || "https://youtube.com"} target="_blank" rel="noopener noreferrer">
                    <FaYoutube />
                  </a>
                  <a href={navbarData["facebook-link"] || "https://facebook.com"} target="_blank" rel="noopener noreferrer">
                    <FaFacebook />
                  </a>
                </div>
              </div>
            )}
          </ul>
        </nav>

        <button className="hamburger-icon" onClick={toggleMenu} aria-label="Toggle menu">
          <GiHamburgerMenu />
        </button>

        <div
          className="language_bar"
          onClick={toggleLanguageMenu}
          role="button"
          aria-expanded={isLanguageOpen}
          tabIndex={0}
        >
          <span>{selectedLanguage}</span>
          <i><MdOutlineLanguage /></i>

          <div className={`language_menu ${isLanguageOpen ? "is-active" : ""}`}>
            <ul>
              {languages.length === 0 ? (
                <li>Loading languages...</li>
              ) : (
                languages.map((lang) => (
                  <li key={lang.id}>
                    <Link to={`/${lang.langCode}/${currentPath}`} onClick={() => changeLanguage(lang.langCode)}>
                      {lang.name}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
});

export default Header;
