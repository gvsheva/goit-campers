import { useState } from "react";
import css from "./CampersList.module.css";
import CamperListCard from "../CamperListCard";
import Button from "../Button";
import { useAppSelector } from "../../hooks";
import { selectFilters } from "../../redux/selectors";
import { useGetCampersQuery } from "../../redux/api/campers";

const CampersList = () => {
  const filters = useAppSelector(selectFilters);
  const [page, setPage] = useState(1);
  const {
    data: { items: campers, totalPages } = { items: [], totalPages: 0 },
    error,
    isLoading,
  } = useGetCampersQuery({
    page,
    ...filters,
  });
  const canLoadMore = totalPages > page;
  return (
    <div className={css.container}>
      <ul className={css.list}>
        {campers.map((camper) => (
          <li key={camper.id} className={css.item}>
            <CamperListCard camper={camper} />
          </li>
        ))}
      </ul>
      {canLoadMore && (
        <div className={css.loadMoreWrapper}>
          <Button
            variant="outline"
            onClick={() => setPage((p) => p + 1)}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Load more"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CampersList;
