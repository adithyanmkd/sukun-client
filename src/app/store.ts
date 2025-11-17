import { configureStore } from "@reduxjs/toolkit";
import { api } from "./apiSlice";
import { persistedReducer } from "../app/persistConfig";

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
