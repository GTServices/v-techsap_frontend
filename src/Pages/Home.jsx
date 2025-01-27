import React, { Suspense, lazy } from 'react';

// Lazy load components
const Hero = lazy(() => import('../homeComponents/HomeHero/Hero'));
const AboutHome = lazy(() => import('../homeComponents/about-home/AboutHome'));
const ServicesHome = lazy(() => import('../homeComponents/services-home/ServicesHome'));
const CostumersHome = lazy(() => import('../homeComponents/costumers-home/CostumersHome'));
const CommentsHome = lazy(() => import('../homeComponents/comments-home/commentsHome'));
const PartnyorsHome = lazy(() => import('../components/Partnyors/PartnyorsHome'));
const ConstactUs = lazy(() => import('../components/ContactUs/ConstactUs'));

function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <Hero />
        <AboutHome />
        <ServicesHome />
        {/* <ProductsHome /> */}
        <CostumersHome />
        {/* <CommentsHome /> */}
        <PartnyorsHome />
        <ConstactUs />
      </div>
    </Suspense>
  );
}

export default Home;
