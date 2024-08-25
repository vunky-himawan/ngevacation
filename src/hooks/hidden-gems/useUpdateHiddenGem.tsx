import { useAuth } from "@/context/AuthContext";
import { API_BASE_URL } from "@/data/Api";
import axios from "axios";

export const useUpdateHiddenGem = () => {
  const { token } = useAuth();

  const updateHiddenGem = async (
    onSuccess: () => void,
    onError: () => void,
    hiddenGemId: string,
    data: FormData
  ) => {
    try {
      if (!token) {
        throw new Error("Not logged in");
      }

      console.log(data);

      await axios.patch(`${API_BASE_URL}/hidden-gems/${hiddenGemId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      onSuccess();
    } catch (error) {
      onError();
    }
  };

  return updateHiddenGem;
};
