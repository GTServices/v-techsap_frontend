import React, { memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from "react-redux"; 
import './AboutHome.css';

const AboutContentLeft = memo(({ imageUrl }) => (
  <div className="aboutContentLeft">
    <h3>Texnologiya İlə İrəliyə Baxırıq</h3>
    <div className="aboutContentLeftImg">
      <img
        src={imageUrl}
        alt="about-home-img"
        loading="lazy" 
        className="lazy-load-image"
      />
    </div>
  </div>
));

const AboutContentRight = memo(() => (
  <div className="aboutContentRight">
    <h3>
      Müştərilərimizin məlumatlarını təhlükəsiz saxlamaq və onların rəqəmsal təhlükələrdən qorunmasını təmin etmək bizim üçün prioritetdir.
    </h3>
    <p>
      Texnologiyanın sürətlə dəyişdiyi bu dövrdə, biz müştərilərimizlə birlikdə davamlı inkişafı dəstəkləyirik. Komandamız hər bir layihəyə fərdi yanaşaraq, hər bir müştəri üçün uzunmüddətli və effektiv həllər hazırlayır.
      İstər təhlükəsizlik, istərsə də iş proseslərinin optimallaşdırılması olsun, məqsədimiz müştərilərimizin rəqabət üstünlüyünü artırmaq və onların gələcəyə inamla baxmalarını təmin etməkdir.
      Bizim üçün hər bir iş əlaqəsi, qarşılıqlı etibar və uzunmüddətli əməkdaşlıq deməkdir.
    </p>
    <div className="about-btn-div">
      <button className="orangeBtn">Daha ətraflı</button>
    </div>
  </div>
));

function AboutHome() {
  const [imageUrl, setImageUrl] = useState(""); 
  const BASE_URL = useSelector((state) => state.tech.BASE_URL); 

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`${BASE_URL}/staticImage/home-about`);
        const data = await response.json();
        setImageUrl(data.image); 
      } catch (error) {
        console.error("Şəkil yüklənərkən xəta baş verdi:", error);
      }
    };

    fetchImage();
  }, [BASE_URL]); 

  return (
    <section className="aboutWrapper container">
      <div className="aboutWrapper-heading">
        <h2 className="gradient-heading">HAQQIMIZDA</h2>
      </div>
      <div className="aboutWrapperContent">
        <AboutContentLeft imageUrl={imageUrl} /> 
        <AboutContentRight />
      </div>
    </section>
  );
}

export default AboutHome;