import { API_BASE_URL } from "@/data/Api";
import { User } from "@/types/User";
import { RefreshToken } from "@/utils/RefreshToken";

export const useGetUser = () => {
  const axiosInstance = RefreshToken();

  const getUser = async (
    onSuccess: (data: User) => void,
    onError: () => void,
    token: string
  ) => {
    try {
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axiosInstance.get(`${API_BASE_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      onSuccess(response.data.data);
    } catch (error) {
      onError();
    }
  };

  return getUser;
};
