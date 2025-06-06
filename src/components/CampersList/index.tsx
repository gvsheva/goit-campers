import css from "./CampersList.module.css";
import CamperListCard from "../CamperListCard";
import Button from "../Button";
import { useAppSelector } from "../../hooks";
import { selectFilters } from "../../redux/selectors";
import { useGetCampersQuery } from "../../redux/api/campers";
import { Navigate, useSearchParams } from "react-router";
import Loading from "../Loading";

const CampersList = () => {
  const filters = useAppSelector(selectFilters);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10) || 1;
  const setPage = (newPage: number) => {
    setSearchParams((p) => {
      const n = new URLSearchParams(p);
      n.set("page", newPage.toString());
      return n;
    });
  };
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
        <Loading />
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
                onClick={() => setPage(page + 1)}
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
