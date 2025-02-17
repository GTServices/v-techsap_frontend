import React, { Suspense, lazy, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguages } from '../redux/techSlice'; 
import { Helmet } from 'react-helmet-async';

const AboutHero = lazy(() => import('../aboutComponents/AboutHero'));
const AboutInfo = lazy(() => import('../aboutComponents/AboutInfo'));
const AboutCostumers = lazy(() => import('../aboutComponents/AboutCostumers'));
const AboutTeam = lazy(() => import('../aboutComponents/AboutTeam'));

function About() {
  const dispatch = useDispatch();
  const BASE_URL = useSelector(state => state.tech.BASE_URL); 

  const [seoData, setSeoData] = useState(null);


  useEffect(() => {
    const fetchSeoData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/pagesSeo/about`);
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

    return <div></div>;
  }

  return (
    <Suspense fallback={<div></div>}>
     
      <Helmet>
        <title>{seoData.title }</title>
        <meta name="description" content={seoData.description || ''} />
        <meta name="keywords" content={seoData.keywords || ''} />
      </Helmet>

      <div>
        <AboutHero />
        <AboutInfo />
        <AboutCostumers />
        <AboutTeam />
      </div>
    </Suspense>
  );
}

export default About;
