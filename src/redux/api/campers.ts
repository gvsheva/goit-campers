import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./api";
import type {
    Camper,
    CamperEngine,
    CamperFeature,
    CamperType,
    CamperTransmission,
} from "../../types/camper";

interface Page<T> {
    total: number;
    totalPages: number;
    items: T[];
}

interface GetCampersParams {
    page?: number;
    limit?: number;
    location?: string;
    types?: CamperType[];
    transmission?: CamperTransmission;
    engine?: CamperEngine;
    features?: CamperFeature[];
}

const campersApi = createApi({
    reducerPath: "campers",
    baseQuery: axiosBaseQuery({
        baseUrl: "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/",
    }),
    tagTypes: ["Campers", "Camper", "Locations"],
    endpoints(build) {
        return {
            getCampers: build.query<Page<Camper>, GetCampersParams>({
                query() {
                    return { url: "campers" };
                },
                transformResponse: (
                    { items }: { items: Camper[] },
                    _meta,
                    arg,
                ) => {
                    if (arg.location) {
                        items = items.filter(
                            (i) => i.location === arg.location,
                        );
                    }
                    if (arg.types && arg.types.length > 0) {
                        items = items.filter((i) =>
                            arg.types!.includes(i.form),
                        );
                    }
                    if (arg.transmission) {
                        items = items.filter(
                            (i) => i.transmission === arg.transmission,
                        );
                    }
                    if (arg.engine) {
                        items = items.filter((i) => i.engine === arg.engine);
                    }
                    if (arg.features && arg.features.length > 0) {
                        items = items.filter((i) =>
                            arg.features!.every((f) => i[f]),
                        );
                    }
                    const total = items.length;
                    const page = arg.page || 1;
                    const limit = arg.limit || 5;
                    items = items.slice(0, page * limit);
                    return {
                        total: total,
                        totalPages: Math.ceil(total / limit),
                        items,
                    };
                },
                providesTags: (_result, _error, arg) => [
                    { type: "Campers", ...arg },
                ],
            }),
            getCamperById: build.query<Camper, string>({
                query: (id) => {
                    return { url: `campers/${id}` };
                },
                providesTags: (_result, _error, id) => [{ type: "Camper", id }],
            }),
            getLocations: build.query<string[], null>({
                query: () => {
                    return {
                        url: "campers",
                    };
                },
                transformResponse: (response: { items: Camper[] }) => {
                    const locations = response.items
                        .map((item) => item.location)
                        .filter(
                            (loc, index, self) => self.indexOf(loc) === index,
                        );
                    return locations.sort();
                },
                providesTags: () => [{ type: "Locations" }],
            }),
        };
    },
});

export const {
    useGetCampersQuery,
    useGetCamperByIdQuery,
    useGetLocationsQuery,
} = campersApi;
export default campersApi;
