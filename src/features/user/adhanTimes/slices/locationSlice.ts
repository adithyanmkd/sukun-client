import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { LocationState } from "../types";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    city: "Mumbai",
    country: "India",
  } as LocationState,
  reducers: {
    setLocation: (state, action: PayloadAction<LocationState>) => {
      state.city = action.payload.city;
      state.country = action.payload.country;
    },
  },
});

export const { setLocation } = locationSlice.actions;
export default locationSlice.reducer;
