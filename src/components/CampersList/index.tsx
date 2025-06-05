import { useState } from "react";
import css from "./CampersList.module.css";
import CamperListCard from "../CamperListCard";
import Button from "../Button";
import { useAppSelector } from "../../hooks";
import { selectFilters } from "../../redux/selectors";
import { useGetCampersQuery } from "../../redux/api/campers";
import { Navigate } from "react-router";
import Spinner from "../Spinner";

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
  if (error) {
    return <Navigate to="/error" />;
  }
  const canLoadMore = totalPages > page;
  return (
    <div className={css.container}>
      {isLoading && campers.length < 1 ? (
        <Spinner className={css.spinner} />
      ) : (
        <>
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
                loading={isLoading}
              >
                Load more
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CampersList;
