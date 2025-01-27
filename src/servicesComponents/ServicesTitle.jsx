import React from 'react';
import './ServicesTitle.css';

const ServicesTitle = () => (
  <div className="services-title-container container">
    <h3 className="services-title-heading gradient-heading">Xidmətlər</h3>
    <div className="services-title-content">
      <h3 className="services-title-subheading">Gələcək üçün İT Həllər!</h3>
      <p className="services-title-description">
        "Hər işimizdə keyfiyyət, etibarlılıq və innovasiyaya əsaslanırıq. Müştərilərimizə davamlı dəyər yaratmaq əsas məqsədimizdir."
      </p>
    </div>
  </div>
);

export default React.memo(ServicesTitle);
