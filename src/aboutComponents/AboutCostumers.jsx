import React, { memo } from "react";
import CostumerCard from "../homeComponents/costumers-home/CostumerCard";
import "./AboutCostumers.css";


const MemoizedCostumerCard = memo(CostumerCard);

function AboutCostumers() {
  return (
    <div className="about-costumers container">
      <div className="about-costumers-title">
        <h4 className="gradient-heading">Müştərilərimiz</h4>
        <p>Müştərilərimizlə Birlikdə Böyüyürük!</p>
        <MemoizedCostumerCard />
        <div className="costumersButton">
          <button className="orangeBtn">Hamısına bax</button>
        </div>
      </div>
    </div>
  );
}

export default AboutCostumers;
