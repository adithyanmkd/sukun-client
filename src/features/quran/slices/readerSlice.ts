import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface RecentlyRead {
  surahId: number;
  surahName: string;
  ayah: number;
  progress: number;
}

interface ReaderState {
  recentlyRead: RecentlyRead | null;
  bookmarks: Array<{ surahId: number; ayah: number }>;
}

const initialState: ReaderState = {
  recentlyRead: null,
  bookmarks: [],
};

const readerSlice = createSlice({
  name: "reader",
  initialState,
  reducers: {
    setRecentlyRead(state, action: PayloadAction<RecentlyRead>) {
      state.recentlyRead = action.payload;
    },
    addBookmark(
      state,
      action: PayloadAction<{ surahId: number; ayah: number }>,
    ) {
      state.bookmarks.push(action.payload);
    },
  },
});

export const { setRecentlyRead, addBookmark } = readerSlice.actions;
export default readerSlice.reducer;
