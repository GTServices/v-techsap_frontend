import React, { useState, useCallback } from 'react';
import './ContactUs.css';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    console.log('Form submitted with data:', formData);

    
    const formToSubmit = new FormData();
    formToSubmit.append('name', formData.name);
    formToSubmit.append('surname', formData.surname);
    formToSubmit.append('email', formData.email);
    formToSubmit.append('phone', formData.phone);
    formToSubmit.append('message', formData.message);

    // Uncomment when ready to submit to an actual backend
    // fetch('your-backend-url', {
    //   method: 'POST',
    //   body: formToSubmit,
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log('Submitted data:', data))
    //   .catch((error) => console.error('Error submitting form:', error));

    setFormData({
      name: '',
      surname: '',
      email: '',
      phone: '',
      message: ''
    });
  }, [formData]);

  return (
    <div className="contact-us container">
      <div className="contact-us__left">
        <h4 className="contact-us__title">İT Həllərimizlə Sizin Uğura Yol Açırıq</h4>
        <p className="contact-us__description">
          Müraciət formunu dolduraraq İT xidmətlərimiz haqqında daha ətraflı məlumat alın;
          komandamız sizinlə tezliklə əlaqə saxlayacaq və texnoloji ehtiyaclarınıza uyğun həllər təqdim edəcək.
        </p>
      </div>

      <div className="contact-us__right">
        <h3 className="contact-us__form-title">Bizə müraciət edin!</h3>
        <form className="contact-us__form" onSubmit={handleSubmit}>
          <div className="contact-us__inputs">
            <div className="contact-us__input-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="Ad"
                onChange={handleChange}
                className="contact-us__input"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Email address"
                onChange={handleChange}
                className="contact-us__input"
              />
            </div>
            <div className="contact-us__input-group">
              <input
                type="text"
                name="surname"
                value={formData.surname}
                placeholder="Soyad"
                onChange={handleChange}
                className="contact-us__input"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                placeholder="Telefon nömrəsi"
                onChange={handleChange}
                className="contact-us__input"
              />
            </div>
          </div>
          <textarea
            name="message"
            value={formData.message}
            placeholder="Mesajınızı buraya yazın..."
            onChange={handleChange}
            className="contact-us__textarea"
          ></textarea>
          <button className="contact-us__button" type="submit">
            Müraciət et
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
