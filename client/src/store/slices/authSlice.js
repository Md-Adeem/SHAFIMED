import { createSlice } from "@reduxjs/toolkit";

const initialState = (() => {
  let token = null;
  let user = null;
  try {
    token = localStorage.getItem("token");
    user = JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    console.error("Failed to parse auth data from localStorage");
  }
  return { token, user };
})();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem("token", state.token || "");
      localStorage.setItem("user", JSON.stringify(state.user || null));
      window.dispatchEvent(new Event("storage"));
    },
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.dispatchEvent(new Event("storage"));
    },
    hydrate(state) {
      try {
        state.token = localStorage.getItem("token");
        state.user = JSON.parse(localStorage.getItem("user") || "null");
      } catch {
        console.error("Failed to parse auth data from localStorage");
      }
    },
  },
});

export const { loginSuccess, logout, hydrate } = authSlice.actions;
export default authSlice.reducer;

