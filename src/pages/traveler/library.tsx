import { useGetBookmarks } from "@/hooks/article/useGetBookmarks";
import MainLayout from "@/layouts/MainLayout";
import { SEOModel } from "@/models/SEO";
import { useEffect } from "react";

const SEO: SEOModel = {
  title: "Library",
  description:
    "Explore a variety of captivating articles that uncover hidden destinations and unique experiences for travelers. Find inspiration for your next journey on Hidden Gems.",
  siteName: "Hidden Gems",
  siteUrl: "https://hiddengems.com/articles",
  keywords: [
    "hidden gems",
    "travel articles",
    "hidden destinations",
    "travel tips",
    "travel experiences",
  ],
  type: "website",
};

const TravelerLibrary = () => {
  const getData = useGetBookmarks();

  useEffect(() => {
    getData({
      onSuccess: () => {
        console.log("Success");
      },
      onError: () => {
        console.log("Error");
      },
    });
  }, []);

  return (
    <>
      <MainLayout SEO={SEO}>
        <section className="w-full max-w-7xl mx-auto mt-28 p-5">
          <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center">
              <h1 className="font-cabinet font-semibold text-5xl">
                Your Bookmarks
              </h1>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default TravelerLibrary;
