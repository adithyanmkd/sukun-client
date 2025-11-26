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
    // const url = import.meta.env.VITE_API_URL;
    const tunnelUrl = import.meta.env.VITE_DEV_TUNNEL_URL;
    console.log(tunnelUrl);
    window.location.href = `${tunnelUrl}/google`;
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
    logout: (state) => {
      state.user = null;
      state.token = null;
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

export const { logout } = authSlice.actions;
export default authSlice.reducer;
