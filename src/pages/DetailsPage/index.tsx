import { useParams } from "react-router";
import css from "./DetailsPage.module.css";
import FeaturesSection from "./FeaturesSection";
import ReviewsSection from "./ReviewsSection";
import { useGetCamperByIdQuery } from "../../redux/api/campers";
import Gallery from "../../components/Gallery";

const DetailsPage = () => {
  const { id } = useParams();
  const { data: camper, error, isLoading } = useGetCamperByIdQuery(id!);
  return (
    <div className={css.container}>
      <Gallery images={camper?.gallery || []} />
    </div>
  );
};

export default DetailsPage;
export { FeaturesSection, ReviewsSection };
