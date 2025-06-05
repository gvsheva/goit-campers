import { useOutletContext } from "react-router";
import Reviews from "../../components/Reviews";
import css from "./ReviewsSection.module.css";
import type { Camper } from "../../types/camper";

const ReviewsSection = () => {
  const { reviews } = useOutletContext<Camper>();
  return (
    <div className={css.container}>
      <Reviews reviews={reviews} />
    </div>
  );
};

export default ReviewsSection;
