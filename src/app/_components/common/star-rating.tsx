"use client";
import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
} from "react";

type StarRatingProps = {
  value: number;
  onChange: (param: number) => void;
};

const StarRating = forwardRef(({ onChange, value }: StarRatingProps, ref) => {
  const [hoverValue, setHoverValue] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    clear() {
      onChange(0);
    },
    focus() {
      containerRef.current?.focus();
    },
  }));

  const handleClick = (newValue: number) => {
    onChange(newValue);
  };

  const handleMouseEnter = (newValue: number) => {
    setHoverValue(newValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(0);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      onChange(Math.min(value + 1, 5));
    } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      onChange(Math.max(value - 1, 0));
    }
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
          role="radio"
          aria-checked={i === value}
          aria-label={`${i} star${i !== 1 ? "s" : ""}`}
          tabIndex={-1}
        >
          &#9733;
        </span>
      );
    }
    return stars;
  };

  return (
    <div
      ref={containerRef}
      onKeyDown={handleKeyDown}
      role="radiogroup"
      aria-label="Rating"
      tabIndex={0}
      style={{ display: "inline-block" }}
    >
      {renderStars()}
    </div>
  );
});

StarRating.displayName = "StarRating";

export default StarRating;
