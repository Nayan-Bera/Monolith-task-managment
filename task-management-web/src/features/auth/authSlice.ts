import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { User } from "./type";

interface AuthState {
  user: User | null;
  token: string | null;
}

const storedAuth = localStorage.getItem("auth");

const parsedAuth: AuthState | null = storedAuth
  ? JSON.parse(storedAuth)
  : null;

const initialState: AuthState = {
  user: parsedAuth?.user ?? null,
  token: parsedAuth?.token ?? null,
};

const saveAuth = (state: AuthState) => {
  localStorage.setItem("auth", JSON.stringify(state));
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setCredentials(
      state,
      action: PayloadAction<{
        user: User;
        token: string;
      }>
    ) {
      state.user = action.payload.user;
      state.token = action.payload.token;

      saveAuth(state);
    },

    logout(state) {
      state.user = null;
      state.token = null;

      localStorage.removeItem("auth");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentAuth = (state: RootState) => state.auth;