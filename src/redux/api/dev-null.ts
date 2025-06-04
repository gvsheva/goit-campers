import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./api";

const devNullApi = createApi({
    reducerPath: "devnull",
    baseQuery: axiosBaseQuery({
        baseUrl: "https://devnull-as-a-service.com/dev/null",
    }),
    endpoints(build) {
        return {
            devNull: build.query<void, void>({
                query: () => {
                    return { url: "", method: "POST" };
                },
                transformResponse: () => undefined,
            }),
        };
    },
});

export const { useDevNullQuery } = devNullApi;
export default devNullApi;
