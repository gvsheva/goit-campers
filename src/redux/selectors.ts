import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export const selectSelf = (state: RootState) => state;

export const selectFilters = createSelector(
    selectSelf,
    (state: RootState) => state.filters,
);

export const selectFavorites = createSelector(
    selectSelf,
    (state: RootState) => state.favorites,
);
