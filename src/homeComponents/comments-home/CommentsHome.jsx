import React, { useState, useEffect, useCallback } from 'react';
import CommentsSingle from './CommentsSingle';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './CommentsHome.css';

function CommentsHome() {
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [totalComments, setTotalComments] = useState(0); 
  const [limit, setLimit] = useState(3); 

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch('/db.json');
        const data = await response.json();
        setTotalComments(data.comments.length);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []); 


  const updateLimit = useCallback(() => {
    if (window.innerWidth <= 375) {
      setLimit(1); 
    } else if (window.innerWidth <= 768) {
      setLimit(2); 
    } else {
      setLimit(3);
    }
  }, []);

  useEffect(() => {
    updateLimit(); 
    window.addEventListener('resize', updateLimit); 

    return () => {
      window.removeEventListener('resize', updateLimit); 
    };
  }, [updateLimit]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - limit, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + limit;
      return nextIndex < totalComments ? nextIndex : prevIndex;
    });
  };

  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex + limit >= totalComments;

  return (
    <div className="comments container">
      <h4 className="gradient-heading">Müştərilərİ rəylərİ</h4>

      <div className="comments-total">
        <div className="comments-head">
          <div>
            <h4>Müştərilərimiz bizim haqqımızda nə deyir?</h4>
          </div>
          <div className="for-top-buttons">
            <div className="left-right-btns">
              <i
                onClick={handlePrev}
                className={isAtStart ? 'disabled' : ''}
              >
                <FaArrowLeft />
              </i>
              <i
                onClick={handleNext}
                className={isAtEnd ? 'disabled right-arrow' : 'right-arrow'}
              >
                <FaArrowRight />
              </i>
            </div>
          </div>
        </div>

        <CommentsSingle limit={limit} currentIndex={currentIndex} />

        <div className="for-bottom-buttons">
          <div className="left-right-btns">
            <i
              onClick={handlePrev}
              className={isAtStart ? 'disabled' : ''}
            >
              <FaArrowLeft />
            </i>
            <i
              onClick={handleNext}
              className={isAtEnd ? 'disabled right-arrow' : 'right-arrow'}
            >
              <FaArrowRight />
            </i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentsHome;
