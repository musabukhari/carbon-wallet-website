import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
if (!BACKEND_URL) {
  // eslint-disable-next-line no-console
  console.warn("REACT_APP_BACKEND_URL is not set. API calls will fail.");
}

export const api = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("cw_token") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const createLead = async (payload) => {
  const { data } = await api.post("/leads", payload);
  return data;
};

export const getHello = async () => {
  const { data } = await api.get("/");
  return data;
};
