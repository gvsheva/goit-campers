import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import campersApi from "./api/campers";
import devNullApi from "./api/dev-null";
import { favoritesReducer, filtersReducer } from "./slices";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["favorites"],
};

const reducer = combineReducers({
    [campersApi.reducerPath]: campersApi.reducer,
    [devNullApi.reducerPath]: devNullApi.reducer,
    filters: filtersReducer,
    favorites: favoritesReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(
            campersApi.middleware,
            devNullApi.middleware,
        ),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
export default store;

export const persistor = persistStore(store);
