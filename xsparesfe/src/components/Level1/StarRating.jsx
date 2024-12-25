import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt, faStar as emptyStar } from "@fortawesome/free-solid-svg-icons";

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating); // Number of full stars
  const halfStar = rating % 1 >= 0.5; // Check if there's a half star
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Remaining empty stars

  return (
    <div className="flex">
      {/* Full Stars */}
      {[...Array(fullStars)].map((_, index) => (
        <FontAwesomeIcon key={`full-${index}`} icon={faStar} className="text-yellow-500" />
      ))}

      {/* Half Star */}
      {halfStar && <FontAwesomeIcon icon={faStarHalfAlt} className="text-yellow-500" />}

      {/* Empty Stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <FontAwesomeIcon key={`empty-${index}`} icon={emptyStar} className="text-gray-300" />
      ))}
    </div>
  );
};

export default StarRating;
