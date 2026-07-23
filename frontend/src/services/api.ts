import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL ?? "https://challenge.outsera.tech/api";

export const api = axios.create({
  baseURL,
});

export default api;
