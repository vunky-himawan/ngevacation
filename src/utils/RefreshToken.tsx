import { useLogout } from "@/hooks/useLogout";
import { useRefreshToken } from "@/hooks/useRefreshToken";
import axios from "axios";

export const RefreshToken = () => {
  const getNewToken = useRefreshToken();
  const logout = useLogout();

  const axiosRefreshToken = axios.create();

  axiosRefreshToken.interceptors.request.use(
    (request) => {
      const token = localStorage.getItem("X-Access-Token");
      const refreshTokenExpiration: number = Number(
        localStorage.getItem("X-Refresh-Token-Expires-In")
      );

      if (token && refreshTokenExpiration < Date.now()) {
        logout({
          onSuccess: () => {
            localStorage.removeItem("X-Access-Token");
            localStorage.removeItem("X-Access-Token-Expires-In");
            localStorage.removeItem("X-Refresh-Token");
            localStorage.removeItem("X-Refresh-Token-Expires-In");

            window.location.href = "/login";
          },
          onError: () => {
            console.log("logout error");
          },
          token,
        });
      }

      if (token) {
        request.headers["Authorization"] = `Bearer ${token}`;
      }

      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosRefreshToken.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const newToken = await getNewToken();
          axiosRefreshToken.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newToken}`;
          return axiosRefreshToken(originalRequest);
        } catch (error) {
          localStorage.removeItem("X-Access-Token");
          localStorage.removeItem("X-Access-Token-Expires-In");
          localStorage.removeItem("X-Refresh-Token");
          localStorage.removeItem("X-Refresh-Token-Expires-In");

          window.location.href = "/auth/login";
          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    }
  );

  return axiosRefreshToken;
};
