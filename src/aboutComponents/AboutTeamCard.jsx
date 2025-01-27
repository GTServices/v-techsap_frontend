import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { FaLinkedin } from 'react-icons/fa';
import './AboutTeamCard.css';

const useDebouncedResize = (delay = 300) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    const debouncedResize = () => {
      clearTimeout(debouncedResize.timeout);
      debouncedResize.timeout = setTimeout(handleResize, delay);
    };

    window.addEventListener('resize', debouncedResize);
    return () => {
      window.removeEventListener('resize', debouncedResize);
    };
  }, [handleResize, delay]);

  return windowWidth;
};

function AboutTeamCard() {
  const [teamData, setTeamData] = useState([]);
  const [maxCards, setMaxCards] = useState(8);
  const [isLoading, setIsLoading] = useState(true); 
  const BASE_URL = useSelector((state) => state.tech.BASE_URL); 
  const selectedLanguage = useSelector((state) => state.tech.language); 
  const windowWidth = useDebouncedResize();


  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setIsLoading(true); 
        const response = await fetch(`${BASE_URL}/team?limit=8&lang=${selectedLanguage}`);
        if (!response.ok) {
          throw new Error('Failed to fetch team data');
        }
        const data = await response.json();
        setTeamData(data); 
      } catch (error) {
        console.error('Error fetching team data:', error);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchTeamData();
  }, [BASE_URL, selectedLanguage]);

 
  useEffect(() => {
    if (windowWidth >= 768) {
      setMaxCards(8);
    } else if (windowWidth >= 375) {
      setMaxCards(6);
    } else {
      setMaxCards(4);
    }
  }, [windowWidth]);

  return (
    <div className="about-team-card">
      {isLoading ? (
        <p>Loading team members...</p> 
      ) : teamData.length > 0 ? (
        teamData.slice(0, maxCards).map((teamMember) => (
          <div className="card" key={teamMember.id}>
            <div className="card-img">
              <img
                src={teamMember.image} 
                alt={teamMember.name}
                loading="lazy" 
              />
            </div>
            <div className="card-title">
              <div className="card-title-left">
                <h3>{teamMember.name}</h3>
                <p>{teamMember.position}</p>
              </div>
              <div className="icon-team">
                <a
                  href={teamMember.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i>
                    <FaLinkedin />
                  </i>
                </a>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No team members found.</p> 
      )}
    </div>
  );
}

export default AboutTeamCard;
