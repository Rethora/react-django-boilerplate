import { createSlice } from "@reduxjs/toolkit/react";
import { authApi } from "../../services/auth/api";
import { AuthState } from "./types";

const initialState: AuthState = {
  user: null,
  token: null,
  refresh: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.access;
        state.refresh = action.payload.refresh;
        localStorage.setItem("access", action.payload.access);
        localStorage.setItem("refresh", action.payload.refresh);
      }
    );
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
      state.user = null;
      state.token = null;
      state.refresh = null;
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    });
    builder.addMatcher(
      authApi.endpoints.verifyToken.matchFulfilled,
      (state, action) => {
        state.user = action.payload.user;
        state.token = localStorage.getItem("access");
        state.refresh = localStorage.getItem("refresh");
      }
    );
    builder.addMatcher(authApi.endpoints.verifyToken.matchRejected, (state) => {
      state.user = null;
      state.token = null;
      state.refresh = null;
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    });
    builder.addMatcher(
      authApi.endpoints.refreshToken.matchFulfilled,
      (state, action) => {
        state.token = action.payload.access;
        state.refresh = action.payload.refresh;
        localStorage.setItem("access", action.payload.access);
        localStorage.setItem("refresh", action.payload.refresh);
      }
    );
  },
});
