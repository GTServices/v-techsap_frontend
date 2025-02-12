import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet'; 

const ContactHead = lazy(() => import('../ContactComponents/ContactHead'));
const ContactMap = lazy(() => import('../ContactComponents/ContactMap'));
const ContactUs = lazy(() => import('../components/ContactUs/ConstactUs'));

function Contact() {
  const [seoData, setSeoData] = useState(null);

  useEffect(() => {
    const fetchSeoData = async () => {
      try {
        const response = await fetch('{{apiURL}}/pagesSeo/contact');
        const data = await response.json();
        if (response.ok) {
          setSeoData(data);
        } else {
          console.error('Failed to fetch SEO data');
        }
      } catch (error) {
        console.error('Error fetching SEO data:', error);
      }
    };

    fetchSeoData();
  }, []);

  return (
    <Suspense fallback={<div></div>}>
     
      {seoData ? (
        <Helmet>
          <title>{seoData.title}</title>
          <meta name="description" content={seoData.description} />
          <meta name="keywords" content={seoData.keywords} />
        </Helmet>
      ) : (
        <Helmet>
          <title>V-Techsap Contact</title>
          <meta name="description" content="" />
          <meta name="keywords" content="" />
        </Helmet>
      )}

      <div className="contact container">
        <ContactHead />
        <ContactMap />
        
      </div>
      <ContactUs />
    </Suspense>
  );
}

export default Contact;
