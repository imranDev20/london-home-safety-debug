"use client";
import React, { useState } from "react";

type StarRatingProps = {
  value: number;
  onChange: (param: number) => void;
};

const StarRating = ({ onChange, value }: StarRatingProps) => {
  const [hoverValue, setHoverValue] = useState<number>(0);

  const handleClick = (newValue: number) => {
    onChange(newValue);
  };

  const handleMouseEnter = (newValue: number) => {
    setHoverValue(newValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(0);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          style={{
            fontSize: "24px",
            color: i <= (hoverValue || value) ? "gold" : "lightgray",
            cursor: "pointer",
          }}
          onClick={() => handleClick(i)}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
        >
          &#9733;
        </span>
      );
    }
    return stars;
  };

  return <div>{renderStars()}</div>;
};

export default StarRating;
