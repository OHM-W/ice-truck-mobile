import axios from "axios";
export const xampp = axios.create({
  baseURL: process.env.XAMPP_BASE_URL || "http://localhost/ice-api",
  timeout: 10000,
});
