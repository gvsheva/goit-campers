import { useSearchParams } from "react-router";
import { useAppDispatch } from "../../hooks";
import FilterToggleGroup, { type FilterItem } from "../FilterToggleGroup";
import LocationSelect from "../LocationSelect";
import css from "./Filters.module.css";
import { setFilters } from "../../redux/slices";
import { useEffect } from "react";
import { useGetLocationsQuery } from "../../redux/api/campers";
import type {
  CamperFeature,
  CamperTransmission,
  CamperType,
} from "../../types/camper";

const equipmentItems: FilterItem[] = [
  { name: "AC", label: "AC", icon: "wind" },
  { name: "automatic", label: "Automatic", icon: "diagram" },
  { name: "kitchen", label: "Kitchen", icon: "cup-hot" },
  { name: "TV", label: "TV", icon: "tv" },
  { name: "bathroom", label: "Bathroom", icon: "shower" },
];

const typeItems: FilterItem[] = [
  { name: "alcove", label: "Alcove", icon: "grid-3x3" },
  { name: "fullyIntegrated", label: "Fully Integrated", icon: "grid-2x2" },
  { name: "panelTruck", label: "Van", icon: "grid-1x2" },
];

const Filters = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = searchParams.get("location");
  const equipment = searchParams.getAll("equipment");
  const types = searchParams.getAll("type");

  useEffect(() => {
    const filters = {
      location: location || undefined,
      types: types as CamperType[],
      transmission: (equipment.includes("automatic")
        ? "automatic"
        : undefined) as CamperTransmission | undefined,
      features: equipment.filter((i) => i !== "automatic") as CamperFeature[],
    };
    dispatch(setFilters(filters));
  }, [searchParams, dispatch]);

  const setSearchParamsList = (
    params: URLSearchParams,
    name: string,
    values: any[],
  ) => {
    const n = new URLSearchParams(params);
    n.delete(name);
    for (const v of values) {
      n.append(name, v);
    }
    return n;
  };

  const { data: locations = [], isLoading: locationsAreLoading } =
    useGetLocationsQuery(null);

  return (
    <div className={css.container}>
      <div className={css.locationBox}>
        <h3 className={css.sectionLabel}>Location</h3>
        <LocationSelect
          options={locations}
          value={location || ""}
          loading={locationsAreLoading}
          onChange={(value) =>
            setSearchParams((p) => {
              const n = new URLSearchParams(p);
              if (value) {
                n.set("location", value);
              } else {
                n.delete("location");
              }
              return n;
            })
          }
        />
      </div>
      <div className={css.filtersBox}>
        <h3 className={css.sectionLabel}>Filters</h3>
        <FilterToggleGroup
          title="Vehicle equipment"
          items={equipmentItems}
          selected={equipment || []}
          onChange={(value) =>
            setSearchParams((p) => setSearchParamsList(p, "equipment", value))
          }
        />
        <FilterToggleGroup
          title="Vehicle type"
          items={typeItems}
          selected={types}
          onChange={(value) =>
            setSearchParams((p) => setSearchParamsList(p, "type", value))
          }
        />
      </div>
    </div>
  );
};

export default Filters;
