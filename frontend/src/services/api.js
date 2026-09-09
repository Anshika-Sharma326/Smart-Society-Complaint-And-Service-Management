import axios from "axios";

const api = axios.create({
  baseURL: "https://smart-society-backend-7vzn.onrender.com/api",
});

export default api;