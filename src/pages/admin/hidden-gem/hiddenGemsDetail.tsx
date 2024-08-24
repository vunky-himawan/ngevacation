import { useAuth } from "@/context/AuthContext";
import { useGetHiddenGemById } from "@/hooks/hidden-gems/useGetHiddenGemById";
import AdminLayout from "@/layouts/AdminLayout";
import { HiddenGem } from "@/types/HiddenGem/HiddenGems";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const HiddenGemsDetail = () => {
  const { hiddenGemId } = useParams<{ hiddenGemId: string }>();
  const { token } = useAuth();
  const getData = useGetHiddenGemById();

  useEffect(() => {
    getData(
      hiddenGemId as string,
      (data: HiddenGem) => {
        console.log(data);
      },
      () => {
        console.log("error");
      },
      token as string
    );
  }, []);

  return (
    <AdminLayout
      title="Hidden Gems Detail"
      siteName="Hidden Gems"
      siteUrl="https://hiddengems.com"
    >
      <div>Hidden Gems Detail {hiddenGemId}</div>
    </AdminLayout>
  );
};

export default HiddenGemsDetail;
