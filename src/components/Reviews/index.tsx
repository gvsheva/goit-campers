import React from "react";
import css from "./Reviews.module.css";
import type { CamperReview } from "../../types/camper";
import Icon from "../Icon";

interface ReviewProp {
  review: CamperReview;
}

const Review: React.FC<ReviewProp> = ({ review }) => {
  return (
    <div className={css.review}>
      <div className={css.header}>
        <div className={css.avatar}>{review.reviewer_name[0]}</div>
        <div>
          <p className={css.name}>{review.reviewer_name}</p>
          <div className={css.stars}>
            {Array.from({ length: 5 }, (_, i) => (
              <Icon
                name={i < review.reviewer_rating ? "star-pressed" : "star"}
                key={i}
              />
            ))}
          </div>
        </div>
      </div>
      <p className={css.comment}>{review.comment}</p>
    </div>
  );
};

interface ReviewsProps {
  reviews: CamperReview[];
}

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  return (
    <div className={css.list}>
      {reviews.map((review, index) => (
        <Review key={index} review={review} />
      ))}
    </div>
  );
};

export default Reviews;
