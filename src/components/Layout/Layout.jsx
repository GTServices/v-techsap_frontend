import React from 'react';
import PropTypes from 'prop-types'; 
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Layout({ children }) {
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.any,
};

export default Layout;
