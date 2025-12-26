import { configureStore } from "@reduxjs/toolkit";
import { api } from "./apiSlice";
import { persistedReducer } from "../app/persistConfig";
import { quranApi } from "@/features/user/quran/api/quranApi";
import { qiblaApi } from "@/features/user/qibla/api/qiblaApi";
import { prayerTimesApi } from "@/features/user/adhanTimes/api/prayerTimesApi";
import readerReducer from "@/features/user/quran/slices/readerSlice";
import bookmarkReducer from "@/features/user/quran/slices/bookmarkSlice";
import locationReducer from "@/features/user/adhanTimes/slices/locationSlice";

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    reader: readerReducer,
    bookmarks: bookmarkReducer,
    location: locationReducer,
    [api.reducerPath]: api.reducer,
    [quranApi.reducerPath]: quranApi.reducer,
    [qiblaApi.reducerPath]: qiblaApi.reducer,
    [prayerTimesApi.reducerPath]: prayerTimesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(api.middleware)
      .concat(quranApi.middleware)
      .concat(qiblaApi.middleware)
      .concat(prayerTimesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
