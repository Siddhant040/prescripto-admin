import axios from "axios";
import {refreshAccessToken} from "./auth.api"


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    const skipUrls = [
      "/auth/login",
      
      "/auth/refresh-token",
    ];

    const shouldSkip = skipUrls.some((url) =>
      originalRequest?.url?.includes(url)
    );

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !shouldSkip
    ) {
      originalRequest._retry = true;

      console.log("Access token expired");

      try {
        await refreshAccessToken();

        console.log("Access token refreshed successfully");

        return api(originalRequest);
      } catch (refreshError) {
        console.log("No active session");

        // Reject the ORIGINAL request instead of the refresh error
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
export default api
