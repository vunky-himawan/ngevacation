import { API_BASE_URL } from "@/data/Api";
import axios from "axios";

type Props = {
  onSuccess: () => void;
  onError: () => void;
  folder: string;
  filename: string;
};

export const useGetFile = () => {
  const getFile = async ({ onSuccess, onError, folder, filename }: Props) => {
    try {
      await axios.get(`${API_BASE_URL}/storage/public/${folder}/${filename}`);
      onSuccess();
    } catch (error) {
      onError();
    }
  };

  return getFile;
};
