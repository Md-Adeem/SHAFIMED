import axios from "axios";
import store from "../store";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Redux-first approach: Get token from Redux state instead of localStorage
api.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

