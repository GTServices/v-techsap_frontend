import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet'; 
import { useDispatch, useSelector } from 'react-redux';
import { setLanguages } from '../redux/techSlice'; 

const Hero = lazy(() => import('../homeComponents/HomeHero/Hero'));
const AboutHome = lazy(() => import('../homeComponents/about-home/AboutHome'));
const ServicesHome = lazy(() => import('../homeComponents/services-home/ServicesHome'));
const CostumersHome = lazy(() => import('../homeComponents/costumers-home/CostumersHome'));
const CommentsHome = lazy(() => import('../homeComponents/comments-home/commentsHome'));
const PartnyorsHome = lazy(() => import('../components/Partnyors/PartnyorsHome'));
const ConstactUs = lazy(() => import('../components/ContactUs/ConstactUs'));

function Home() {
  const [seoData, setSeoData] = useState(null);

  const dispatch = useDispatch();
  const BASE_URL = useSelector(state => state.tech.BASE_URL); 


  useEffect(() => {
    const fetchSeoData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/pagesSeo/home`);
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
  }, [BASE_URL]);


  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch(`${BASE_URL}/languages`);
        const data = await response.json();
        if (response.ok) {
          dispatch(setLanguages(data)); 
        } else {
          console.error('Failed to fetch languages');
        }
      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    };

    fetchLanguages();
  }, [BASE_URL, dispatch]);

  if (!seoData) {

    return <div>Loading SEO data...</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
   
      <Helmet>
        <title>{seoData.title || 'V-Techsap'}</title>
        <meta name="description" content={seoData.description || 'V-Techsap website'} />
        <meta name="keywords" content={seoData.keywords || 'tech, it, support, seo, programming'} />
      </Helmet>

      <div>
        <Hero />
        <AboutHome />
        <ServicesHome />
        {/* <ProductsHome /> */}
        <CostumersHome />
        {/* <CommentsHome /> */}
        <PartnyorsHome />
        <div className='container'>
        <ConstactUs />
        </div>
      </div>
    </Suspense>
  );
}

export default Home;
