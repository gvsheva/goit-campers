import { createApi } from "@reduxjs/toolkit/query/react";
import { nullBaseQuery } from "./api";

const devNullApi = createApi({
    reducerPath: "devnull",
    baseQuery: nullBaseQuery(),
    endpoints(build) {
        return {
            devNull: build.mutation<
                void,
                Partial<
                    Record<"minDelay" | "maxDelay" | "failRate", number>
                > & {
                    data?: any;
                }
            >({
                query: ({
                    minDelay = 1000,
                    maxDelay = 3000,
                    failRate = 0,
                    ...rest
                }) => {
                    return { minDelay, maxDelay, failRate, ...rest };
                },
            }),
        };
    },
});

export const { useDevNullMutation } = devNullApi;
export default devNullApi;
