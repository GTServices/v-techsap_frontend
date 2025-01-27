import React, { Suspense, lazy } from 'react';


const ContactHead = lazy(() => import('../ContactComponents/ContactHead'));
const ContactMap = lazy(() => import('../ContactComponents/ContactMap'));
const ContactUs = lazy(() => import('../components/ContactUs/ConstactUs'));

function Contact() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className='contact container'>
        <ContactHead />
        <ContactMap />
        <ContactUs />
      </div>
    </Suspense>
  );
}

export default Contact;
