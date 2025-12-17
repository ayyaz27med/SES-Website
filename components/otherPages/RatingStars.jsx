"use client";
import React, { useState } from "react";
import Label from "../common/Label";

export default function RatingStars({
  value = 0,
  onChange,
  error,
  label,
}) {
  const [hover, setHover] = useState(0);

  return (
    <div className="rating-wrapper">
      {label && <div className="mb_8"><Label label={label} /></div>}

      <div
        className="d-flex gap-8"
        onMouseLeave={() => setHover(0)}
      >
        {[1, 2, 3, 4, 5].map((star) => {
          const isActive = (hover || value) >= star;

          return (
            <span
              key={star}
              onMouseEnter={() => setHover(star)}
              onClick={() => onChange(star)}
              className={`star-icon ${isActive ? "active" : ""}`}
              style={{ cursor: 'pointer'}}
            >
              <i className="icon icon-star" style={{ fontSize: 25}} />
            </span>
          );
        })}
      </div>

      {error ? (
        <div className="small" style={{ color: "red" }}>
          {error}
        </div>
      ) : null}
    </div>
  );
}
