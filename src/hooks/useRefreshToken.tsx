import { API_BASE_URL } from "@/data/Api";
import axios from "axios";

export const useRefreshToken = () => {
  const refreshToken = async () => {
    const refreshToken = localStorage.getItem("X-Refresh-Token");

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/refresh`, null, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });

      const accessToken = response.data.data.access_token.token;
      const accessTokenExpiresIn = response.data.data.access_token.expires_in;
      const newRefreshToken = response.data.data.refresh_token.token;
      const newRefreshTokenExpiresIn =
        response.data.data.refresh_token.expires_in;

      localStorage.setItem("X-Access-Token", accessToken);
      localStorage.setItem(
        "X-Access-Token-Expires-In",
        new Date(accessTokenExpiresIn).getTime().toString() // Calculate the expiration time
      );
      localStorage.setItem("X-Refresh-Token", newRefreshToken);
      localStorage.setItem(
        "X-Refresh-Token-Expires-In",
        new Date(newRefreshTokenExpiresIn).getTime().toString() // Calculate the expiration time
      );

      return accessToken as string;
    } catch (error) {
      console.log(error);
    }
  };

  return refreshToken;
};
