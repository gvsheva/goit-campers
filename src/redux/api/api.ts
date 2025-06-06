import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import axios from "axios";
import type { AxiosRequestConfig, AxiosError } from "axios";

export const axiosBaseQuery =
    (
        { baseUrl }: { baseUrl: string } = { baseUrl: "" },
    ): BaseQueryFn<
        {
            url: string;
            method?: AxiosRequestConfig["method"];
            data?: AxiosRequestConfig["data"];
            params?: AxiosRequestConfig["params"];
            headers?: AxiosRequestConfig["headers"];
        },
        unknown,
        unknown
    > =>
    async ({ url, method, data, params, headers }) => {
        try {
            const result = await axios({
                url: baseUrl + url,
                method,
                data,
                params,
                headers,
            });
            return { data: result.data };
        } catch (axiosError) {
            const err = axiosError as AxiosError;
            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || err.message,
                },
            };
        }
    };

const randomDelay = (min: number, max: number) => {
    return new Promise((resolve) => {
        const delay = Math.floor(Math.random() * (max - min + 1)) + min;
        setTimeout(resolve, delay);
    });
};

export const nullBaseQuery =
    (): BaseQueryFn<
        { minDelay?: number; maxDelay?: number; failRate?: number },
        unknown,
        { status: number; message: string }
    > =>
    async ({ minDelay = 500, maxDelay = 5000, failRate = 0 }) => {
        await randomDelay(minDelay, maxDelay);

        const shouldFail = Math.random() < failRate;
        if (shouldFail) {
            return {
                error: {
                    status: 500,
                    message: "Simulated server error",
                },
            };
        }

        return { data: null };
    };
