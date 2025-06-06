import { useOutletContext } from "react-router";
import Reviews from "../../components/Reviews";
import css from "./ReviewsSection.module.css";
import type { Camper } from "../../types/camper";
import Notice from "../../components/Notice";

const ReviewsSection = () => {
  const { reviews } = useOutletContext<Camper>();
  return (
    <div className={css.container}>
      {reviews.length > 0 ? (
        <Reviews reviews={reviews} />
      ) : (
        <Notice type="info">
          No reviews yet — be the first to break the silence!
        </Notice>
      )}
    </div>
  );
};

export default ReviewsSection;
