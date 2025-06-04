import css from "./CatalogPage.module.css";
import Filters from "../../components/Filters";
import CampersList from "../../components/CampersList";

const CatalogPage = () => {
  return (
    <div className={css.container}>
      <Filters />
      <CampersList />
    </div>
  );
};

export default CatalogPage;
