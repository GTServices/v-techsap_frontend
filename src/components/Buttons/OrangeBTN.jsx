import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './OrangeBTN.css'
function OrangeBTN() {
  return (
    <div className="left-right-btns">
      <i><FaArrowLeft /></i>
      <i className="right-arrow"><FaArrowRight /></i>
    </div>
  );
}

export default OrangeBTN;
