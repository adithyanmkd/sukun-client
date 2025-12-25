import { configureStore } from "@reduxjs/toolkit";
import { api } from "./apiSlice";
import { persistedReducer } from "../app/persistConfig";
import { quranApi } from "@/features/user/quran/api/quranApi";
import { qiblaApi } from "@/features/user/qibla/api/qiblaApi";
import readerReducer from "@/features/user/quran/slices/readerSlice";
import bookmarkReducer from "@/features/user/quran/slices/bookmarkSlice";

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    reader: readerReducer,
    bookmarks: bookmarkReducer,
    [api.reducerPath]: api.reducer,
    [quranApi.reducerPath]: quranApi.reducer,
    [qiblaApi.reducerPath]: qiblaApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(api.middleware)
      .concat(quranApi.middleware)
      .concat(qiblaApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
