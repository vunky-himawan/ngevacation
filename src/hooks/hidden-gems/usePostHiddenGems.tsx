import { API_BASE_URL } from "@/data/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type OperationalDayRequest = {
  day: string;
  open_time: string;
  close_time: string;
};

type CreateHiddenGemsRequest = {
  title: string;
  price_start: number;
  price_end: number;
  location: string;
  rating: number;
  category_id: string;
  operation_days: OperationalDayRequest[];
  description: string;
  photos: File[];
  user_id: string;
};

export const usePostHiddenGems = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  if (!token) {
    navigate("/auth/login");
  }

  const postHiddenGem = async (
    onSuccess: () => void,
    onError: () => void,
    data: CreateHiddenGemsRequest
  ) => {
    try {
      console.log(data);

      await axios.post(`${API_BASE_URL}/hidden-gems`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      onSuccess();
    } catch (error) {
      console.log(error);
      onError();
    }
  };

  return postHiddenGem;
};
