import css from "./DetailsPage.module.css";
import FeaturesSection from "./FeaturesSection";
import ReviewsSection from "./ReviewsSection";

const DetailsPage = () => {
  return (
    <div className={css.container}>
      <h1>Details Page</h1>
      <p>This page provides detailed information about a specific item.</p>
    </div>
  );
};

export default DetailsPage;
export { FeaturesSection, ReviewsSection };
