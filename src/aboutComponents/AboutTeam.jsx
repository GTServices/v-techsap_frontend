import React, { memo } from 'react';
import AboutTeamCard from './AboutTeamCard';
import './AboutTeam.css';

const MemoizedAboutTeamCard = memo(AboutTeamCard);

function AboutTeam() {
  return (
    <div className="about-team container">
      <div className="about-head">
        <h4>Komandamız</h4>
        <p>Yenilikçi və Peşəkar Komandamızla Tanış Olun</p>
      </div>
 
      <MemoizedAboutTeamCard />
      <div className="costumersButton">
        <a href="#">
          <button className="orangeBtn">Hamısına bax</button>
        </a>
      </div>
    </div>
  );
}

export default AboutTeam;
