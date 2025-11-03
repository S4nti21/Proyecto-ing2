import axios from "axios";

const API_URL = "http://192.168.0.27:8080/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
