import EventForm from "@/components/event/EventPostForm";
import HiddenGemsForm from "@/components/hidden-gems/HiddenGemsForm";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import { useGetEvent } from "@/hooks/event/useGetEvent";
import { useGetHiddenGemById } from "@/hooks/hidden-gems/useGetHiddenGemById";
import MainLayout from "@/layouts/MainLayout";
import { SEOModel } from "@/models/SEO";
import { Event } from "@/types/Event/Event";
import { HiddenGem } from "@/types/HiddenGem/HiddenGems";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SEO: SEOModel = {
  title: "Share Your Event - Upload Your Event",
  description:
    "Contribute to the Hidden Gems community by sharing your undiscovered travel destinations. Upload photos, provide tips, and inspire others with your unique travel experiences.",
  siteName: "Hidden Gems",
  siteUrl: "https://hiddengems.com/upload",
  keywords: [
    "upload hidden gem",
    "share travel stories",
    "contribute travel tips",
    "upload travel photos",
    "hidden destinations",
  ],
  type: "website",
};

const HiddenGemUpdate = () => {
  const { token } = useAuth();
  const { hiddenGemId } = useParams<{ hiddenGemId: string }>();
  const getHiddenGem = useGetHiddenGemById();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hiddenGem, setHiddenGem] = useState<HiddenGem | undefined>(undefined);

  useEffect(() => {
    getHiddenGem(
      hiddenGemId as string,
      (data: HiddenGem) => {
        setHiddenGem(data);
        setIsLoading(false);
      },
      () => {
        console.log("error");
      },
      token as string
    );
  }, []);

  return (
    <>
      <MainLayout SEO={SEO}>
        {isLoading && (
          <section className="mx-auto w-full lg:max-w-6xl 2xl:max-w-7xl mt-24 p-5 flex flex-col gap-3">
            <div className="w-full relative flex flex-col gap-5 justify-center rounded-3xl">
              <Skeleton className="w-full h-[50vh] relative flex justify-center items-center rounded-3xl" />
              <Skeleton className="w-full h-[1rem] relative flex justify-center items-center rounded-3xl" />
              <Skeleton className="w-full h-[1rem] relative flex justify-center items-center rounded-3xl" />
              <Skeleton className="w-full h-[1rem] relative flex justify-center items-center rounded-3xl" />
              <Skeleton className="w-full h-[1rem] relative flex justify-center items-center rounded-3xl" />
            </div>
          </section>
        )}
        {hiddenGem && !isLoading && <HiddenGemsForm data={hiddenGem} isEdit />}
      </MainLayout>
    </>
  );
};

export default HiddenGemUpdate;
