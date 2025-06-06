import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

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
export const { reducer } = favoritesSlice;
