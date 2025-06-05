import { createApi } from "@reduxjs/toolkit/query/react";
import { nullBaseQuery } from "./api";

const devNullApi = createApi({
    reducerPath: "devnull",
    baseQuery: nullBaseQuery(),
    endpoints(build) {
        return {
            devNull: build.mutation<void, any>({
                query: (_data: any) => {
                    return { minDelay: 1000, maxDelay: 3000 };
                },
            }),
        };
    },
});

export const { useDevNullMutation } = devNullApi;
export default devNullApi;
