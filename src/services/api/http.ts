import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ENV } from "@src/config/env";
import { Linking } from "react-native";

// Use ENV.BASE_URL which prefers EXPO_PUBLIC_API_BASE_URL if available.
export const http = axios.create({
  baseURL: ENV.BASE_URL,
  timeout: 10000,
});

// Attach JWT automatically to requests
http.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem("@auth");
    if (token) {
      const parsed = JSON.parse(token);
      const jwt = parsed?.token;
      if (jwt) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${jwt}`;
      }
    }
  } catch {}
  return config;
});

// Handle 401 globally: clear auth and redirect to login screen via app scheme
http.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    try {
      const status = error?.response?.status;
      if (status === 401) {
        await AsyncStorage.removeItem("@auth");
        // Use app URI scheme to force navigation to login (app.json scheme: mytruck)
        // This works when app is foregrounded or in emulator
        const loginUrl = "mytruck://auth/login";
        try {
          await Linking.openURL(loginUrl);
        } catch (_) {
          // ignore openURL errors
        }
      }
    } catch (_) {}
    return Promise.reject(error);
  }
);
