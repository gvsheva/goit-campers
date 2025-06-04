import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import campersApi from "./api/campers";
import devNullApi from "./api/dev-null";

const store = configureStore({
    reducer: {
        [campersApi.reducerPath]: campersApi.reducer,
        [devNullApi.reducerPath]: devNullApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            campersApi.middleware,
            devNullApi.middleware,
        ),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
export default store;
