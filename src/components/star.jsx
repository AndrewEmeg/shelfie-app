/* eslint-disable react/prop-types */
// import { useState } from "react";

function StarRating({
  ratingNumber,
  setRatingNumber,
  tempRating,
  setTempRating,
}) {
  const starStyling = {
    fontSize: "32px",
    // fill: "red",
    color: "#D7A944",
    strokeWidth: "12px",
  };
  console.log(tempRating);
  return (
    <div className="flex gap-8 mb-8 items-center mt-20">
      <div className="font-rubik flex gap-2">
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            onClick={() => setRatingNumber(i + 1)}
            onMouseEnter={() => setTempRating(i + 1)}
            onMouseLeave={() => setTempRating(0)}
          >
            <ion-icon
              style={{
                ...starStyling,
                fill: (tempRating ? i < tempRating : i < ratingNumber)
                  ? "#F5F25A"
                  : "white",
              }}
              name="star"
            ></ion-icon>
          </span>
        ))}
      </div>
      <span className="text-5xl text-teal-700 font-medium">
        {tempRating || ratingNumber}
      </span>
    </div>
  );
}

export default StarRating;
