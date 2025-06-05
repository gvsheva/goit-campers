import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
    CamperEngine,
    CamperFeature,
    CamperType as CamperType,
    CamperTransmission,
} from "../types/camper";

interface FiltersState {
    location?: string;
    types?: CamperType[];
    transmission?: CamperTransmission;
    engine?: CamperEngine;
    features?: CamperFeature[];
}

const initialState: FiltersState = {};

const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setFilters: (_state, action: PayloadAction<FiltersState>) =>
            action.payload,
    },
});

export const { setFilters } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;

const favoritesSlice = createSlice({
    name: "favorites",
    initialState: [] as string[],
    reducers: {
        addToFavorites: (state, action: PayloadAction<string>) => {
            if (!state.includes(action.payload)) {
                state.push(action.payload);
            }
        },
        removeFromFavorites: (state, action: PayloadAction<string>) => {
            return state.filter((id) => id !== action.payload);
        },
    },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
