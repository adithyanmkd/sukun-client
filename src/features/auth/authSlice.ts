import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import type { User } from "@/app/apiSlice";

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async () => {
    let url;
    const env = import.meta.env;
    const mode = env.VITE_MODE;

    if (mode === "development") {
      url = env.VITE_API_URL;
    } else {
      url = env.VITE_DEV_TUNNEL_URL;
    }

    window.location.href = `${url}/google`;
  },
);

export const completeGoogleLogin = createAsyncThunk(
  "auth/completeGoogleLogin",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async ({ token, user }: { token: string; user: any }) => {
    return {
      token,
      user,
    };
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    updateAvatar: (state, action) => {
      if (state.user) {
        state.user.avatar = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(completeGoogleLogin.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isLoading = false;
      })
      .addCase(completeGoogleLogin.rejected, (state) => {
        state.error = "Invalid token";
        state.isLoading = false;
      });
  },
});

export const { logout, setCredentials, updateAvatar } = authSlice.actions;
export default authSlice.reducer;
