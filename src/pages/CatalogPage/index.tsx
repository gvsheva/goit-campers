import { useEffect } from "react";
import LocationSelect from "../../components/LocationSelect";
import {
  useGetCampersQuery,
  useGetLocationsQuery,
} from "../../redux/api/campers";
import css from "./CatalogPage.module.css";
import { useSearchParams } from "react-router";
import { useAppDispatch } from "../../hooks";
import { setFilters } from "../../redux/slices";
import FilterToggleGroup, {
  type FilterItem,
} from "../../components/FilterToggleGroup";
import type {
  CamperFeature,
  CamperTransmission,
  CamperType,
} from "../../types/camper";

const equipmentItems: FilterItem[] = [
  { name: "AC", label: "AC", icon: "wind" },
  { name: "transmission", label: "Automatic", icon: "diagram" },
  { name: "kitchen", label: "Kitchen", icon: "cup-hot" },
  { name: "TV", label: "TV", icon: "tv" },
];

const typeItems: FilterItem[] = [
  { name: "alcove", label: "Alcove", icon: "grid-3x3" },
  { name: "fullyIntegrated", label: "Fully Integrated", icon: "grid-2x2" },
  { name: "panelTruck", label: "Van", icon: "grid-1x2" },
];

const CatalogPage = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    dispatch(setFilters(Object.fromEntries(searchParams.entries())));
  }, [searchParams, dispatch]);

  const { data: locations = [], isLoading: locationsIsLoading } =
    useGetLocationsQuery(null);
  const location = searchParams.get("location");
  const selectedEquipment = searchParams.getAll("equipment");
  const transmission = searchParams.get("transmission");
  if (transmission === "automatic") {
    selectedEquipment.push("transmission");
  }
  const selectedTypes = searchParams.getAll("type");
  const {
    data: { items: campers, totalPages } = { items: [], totalPages: 0 },
    error,
    isLoading,
  } = useGetCampersQuery({
    location: location || undefined,
    types: selectedTypes as CamperType[],
    transmission: (transmission || undefined) as CamperTransmission | undefined,
    features: selectedEquipment.filter(
      (i) => i !== "transmission",
    ) as CamperFeature[],
  });
  return (
    <div className={css.container}>
      <h1>Catalog Page</h1>
      <p>This is the catalog page where you can browse items.</p>
      <LocationSelect
        options={locations}
        value={location || ""}
        loading={locationsIsLoading}
        onChange={(value) =>
          setSearchParams((p) => {
            p.set("location", value);
            return p;
          })
        }
      />
      <FilterToggleGroup
        title="Vehicle equipment"
        items={equipmentItems}
        selected={selectedEquipment || []}
        onChange={(value) =>
          setSearchParams((p) => {
            p.delete("equipment");
            p.delete("transmission");
            for (const item of value) {
              if (item === "transmission") {
                p.set("transmission", "automatic");
              } else {
                p.append("equipment", item);
              }
            }
            return p;
          })
        }
      />
      <FilterToggleGroup
        title="Vehicle type"
        items={typeItems}
        selected={selectedTypes}
        onChange={(value) =>
          setSearchParams((p) => {
            p.delete("type");
            for (const item of value) {
              p.append("type", item);
            }
            return p;
          })
        }
      />

      {isLoading ? (
        <>Loading...</>
      ) : error ? (
        <>error: {error}</>
      ) : (
        <ul>
          {campers.map((i) => (
            <li key={i.id}>{i.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CatalogPage;
