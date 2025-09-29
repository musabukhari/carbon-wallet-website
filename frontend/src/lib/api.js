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

export const createLead = async (payload) => {
  const { data } = await api.post("/leads", payload);
  return data;
};

export const getHello = async () => {
  const { data } = await api.get("/");
  return data;
};
