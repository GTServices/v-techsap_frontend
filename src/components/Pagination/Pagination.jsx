import React, { useState } from "react";
import "./Pagination.css";

function Pagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3; 

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handlePrevClick = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="pagination">
   
      <button
        className="pagination-btn"
        onClick={handlePrevClick}
        disabled={currentPage === 1}
      >
        &lt;
      </button>

    
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          className={`pagination-btn ${
            currentPage === index + 1 ? "active" : ""
          }`}
          onClick={() => handlePageClick(index + 1)}
        >
          {index + 1}
        </button>
      ))}

  
      <button
        className="pagination-btn"
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
}

export default Pagination;
