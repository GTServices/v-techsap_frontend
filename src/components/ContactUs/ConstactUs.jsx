import React, { useState, useCallback, useEffect } from "react";
import "./ContactUs.css";
import { useSelector } from "react-redux";

function ContactUs() {
  const selectedLanguage = useSelector((state) => state.tech.language);
  const BASE_URL = useSelector((state) => state.tech.BASE_URL);

  const [staticTexts, setStaticTexts] = useState({});
  const [texts, setTexts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false); 

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const getStaticText = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/staticText/getDatas?lang=${selectedLanguage}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify([
            "name",
            "surname",
            "email-address",
            "phone-number",
            "message",
            "apply",
          ]),
        }
      );
      if (!response.ok) throw new Error("Unexpected occurred");
      const data = await response.json();
      setStaticTexts(data);
    } catch (error) {
      setError("Error fetching data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getTexts = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/customText/getDatas?lang=${selectedLanguage}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(["contact-title", "contact-subtitle", "contact-desc"]),
        }
      );
      if (!response.ok) throw new Error("Unexpected occurred");
      const data = await response.json();
      setTexts(data);
    } catch (error) {
      setError("Error fetching data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStaticText();
    getTexts();
  }, [selectedLanguage]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!formData?.name && !formData?.surname && !formData?.email && !formData?.phone && !formData?.message) {
        console.log("Error while submit");
        return;
      }

      const formToSubmit = new FormData();
      formToSubmit.append("name", formData.name);
      formToSubmit.append("surname", formData.surname);
      formToSubmit.append("email", formData.email);
      formToSubmit.append("phone", formData.phone);
      formToSubmit.append("message", formData.message);

      const submitForm = async () => {
        try {
          const response = await fetch(`${BASE_URL}/contactBase`, {
            method: "POST",
            body: formToSubmit,
          });
          if (!response.ok) throw new Error("Unexpected occurred");
          const data = await response.json();
          console.log(data);


          setShowToast(true);
          setTimeout(() => setShowToast(false), 3000);
        } catch (error) {
          console.error(error);
        }
      };
      submitForm();

      setFormData({
        name: "",
        surname: "",
        email: "",
        phone: "",
        message: "",
      });
    },
    [formData]
  );

  if (loading) {
    return <div>Yüklənir...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="contact-us container">
      <div className="contact-us__left">
        <h4 className="contact-us__title">{texts["contact-subtitle"]}</h4>
        <p className="contact-us__description">{texts["contact-desc"]}</p>
      </div>

      <div className="contact-us__right">
        <h3 className="contact-us__form-title">{texts["contact-title"]}</h3>
        <form className="contact-us__form" onSubmit={handleSubmit}>
          <div className="contact-us__inputs">
            <div className="contact-us__input-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder={staticTexts?.name}
                onChange={handleChange}
                className="contact-us__input"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder={staticTexts["email-address"]}
                onChange={handleChange}
                className="contact-us__input"
              />
            </div>
            <div className="contact-us__input-group">
              <input
                type="text"
                name="surname"
                value={formData.surname}
                placeholder={staticTexts["surname"]}
                onChange={handleChange}
                className="contact-us__input"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                placeholder={staticTexts["phone-number"]}
                onChange={handleChange}
                className="contact-us__input"
              />
            </div>
          </div>
          <textarea
            name="message"
            value={formData.message}
            placeholder={staticTexts["message"]}
            onChange={handleChange}
            className="contact-us__textarea"
          ></textarea>
          <button className="contact-us__button" type="submit">
            {staticTexts?.apply}
          </button>
        </form>
      </div>

      {showToast && <div className="success-toast">  ✅ Məlumat göndərildi!</div>}
    </div>
  );
}

export default ContactUs;
