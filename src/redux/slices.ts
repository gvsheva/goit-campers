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
