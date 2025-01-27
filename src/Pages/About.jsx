import React, { Suspense, lazy } from 'react';


const AboutHero = lazy(() => import('../aboutComponents/AboutHero'));
const AboutInfo = lazy(() => import('../aboutComponents/AboutInfo'));
const AboutCostumers = lazy(() => import('../aboutComponents/AboutCostumers'));
const AboutTeam = lazy(() => import('../aboutComponents/AboutTeam'));

function About() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
