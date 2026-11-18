import { ssToken } from "@/constants";
import axios from "axios";

export const API_DOMAIN = import.meta.env.VITE_API_ENDPOINT || "http://localhost:5173";

if (!API_DOMAIN) {
  throw new Error("API_DOMAIN is not defined in the environment variables.");
}

export const API_URL = `${API_DOMAIN}/api/v1`;

const api = axios.create({
  baseURL: API_URL,
});

export const baseApi = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const tokenItem = sessionStorage.getItem(ssToken);
    const token = tokenItem ? JSON.parse(tokenItem) : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
