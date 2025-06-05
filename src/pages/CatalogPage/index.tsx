import css from "./CatalogPage.module.css";
import Filters from "../../components/Filters";
import CampersList from "../../components/CampersList";

const CatalogPage = () => {
  return (
    <div className={css.container}>
      <div className={css.filtersContainer}>
        <Filters />
      </div>
      <div className={css.camperslistcontainer}>
        <CampersList />
      </div>
    </div>
  );
};

export default CatalogPage;
