import React, { useState } from "react";
import PropTypes from "prop-types";

const Pagination2 = ({ currentPage, totalPages, onPageChange }) => {
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(currentPage);
  const [clickCount, setClickCount] = useState(0);

  // Handlers
  const handleCenterClick = () => {
    if (editMode) return;
    if (clickCount === 1) {
      setEditMode(true);
      setInputValue(currentPage);
      setClickCount(0);
    } else {
      setClickCount(1);
      setTimeout(() => setClickCount(0), 400); // reset if not double-clicked
    }
  };

  const handleInputBlur = () => {
    setEditMode(false);
    if (
      inputValue !== currentPage &&
      inputValue >= 1 &&
      inputValue <= totalPages
    ) {
      onPageChange(Number(inputValue));
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    setInputValue(val ? Math.max(1, Math.min(totalPages, Number(val))) : "");
  };

  // Button states
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;
  const prevPage = hasPrev ? currentPage - 1 : null;
  const nextPage = hasNext ? currentPage + 1 : null;

  return (
    <div className="mt-32 pt-10">
      <div className="d-flex gap-8 justify-center align-center">
        {/* Extreme left: ... if more pages before */}
        {currentPage > 2 ? (
          <div className="size-40 flex-center rounded-full text-dark-1">...</div>
        ) : (
            <div className="size-40 flex-center rounded-full text-dark-1"></div>
          )}
        {/* Previous page */}
        <button
          className={`button -brown-2 size-40 rounded-full border-light flex-center${!hasPrev ? " disabled" : ""}`}
          onClick={() => hasPrev && onPageChange(prevPage)}
          disabled={!hasPrev}
        >
          <span>{prevPage || ""}</span>
        </button>
        {/* Center: current page, double-click to edit */}
        <button
          className={`button size-40 rounded-full flex-center${editMode ? " disabled" : " bg-dark-2 text-white"}`}
          onClick={handleCenterClick}
          disabled={editMode}
          style={{ position: "relative" }}
        >
          {editMode ? (
            <input
              type="number"
              min={1}
              max={totalPages}
              value={inputValue}
              autoFocus
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onKeyDown={e => {
                if (e.key === "Enter") handleInputBlur();
              }}
              className="size-40 flex-center rounded-full text-center border-light"
              style={{ width: 36, textAlign: "center" }}
            />
          ) : (
            <span>{currentPage}</span>
          )}
        </button>
        {/* Next page */}
        <button
          className={`button -brown-2 size-40 rounded-full border-light flex-center${!hasNext ? " disabled" : ""}`}
          onClick={() => hasNext && onPageChange(nextPage)}
          disabled={!hasNext}
        >
          <span>{nextPage || ""}</span>
        </button>
        {/* Extreme right: ... if more pages after */}
        {currentPage < totalPages - 1 ? (
          <div className="size-40 flex-center rounded-full text-dark-1">...</div>
        ) : (
            <div className="size-40 flex-center rounded-full text-dark-1"></div>
          )}
      </div>
    </div>
  );
};

Pagination2.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination2;
