import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
    CamperEngine,
    CamperFeature,
    CamperTransmission,
    CamperType,
} from "../../types/camper";

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
export const { reducer } = filtersSlice;
