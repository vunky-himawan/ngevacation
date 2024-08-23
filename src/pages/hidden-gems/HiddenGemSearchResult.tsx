import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetHiddenGems } from "@/hooks/hidden-gems/useGetHiddenGems";
import MainLayout from "@/layouts/MainLayout";
import { SEOModel } from "@/models/SEO";
import { HiddenGem } from "@/types/HiddenGem/HiddenGems";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const HiddenGemSearchResult = () => {
  const [searchParams] = useSearchParams();
  const getHiddenGems = useGetHiddenGems();
  const [hiddenGems, setHiddenGems] = useState<HiddenGem[]>([]);

  useEffect(() => {
    getHiddenGems(
      (hiddenGems: HiddenGem[]) => {
        setHiddenGems(hiddenGems);
      },
      () => {
        console.log("error");
      },
      `s=${searchParams.get("s")}`
    );
  });

  const SEO: SEOModel = {
    title: "Hidden Gems | Search Result",
    description: "",
    siteName: "Hidden Gems",
    siteUrl: "https://hiddengames.com/hidden-gems",
    keywords: [
      "hidden gems",
      "travel articles",
      "hidden destinations",
      "travel tips",
      "travel experiences",
    ],
    type: "website",
  };

  return (
    <>
      <MainLayout withSearch={true} SEO={SEO}>
        <div className="w-full max-w-7xl mx-auto pt-28 px-5">
          <section className="flex gap-5 w-full max-w-7xl mx-auto">
            <h1 className="font-cabinet text-4xl md:text-5xl font-semibold text-gray-500">
              Search Result{" "}
              <span className="text-black">{searchParams.get("s")}</span>
            </h1>
          </section>
          <section>
            {hiddenGems &&
              hiddenGems.map((hiddenGem: HiddenGem) => (
                <HiddenGemSearchResultCard
                  key={hiddenGem.hidden_gem_id}
                  hiddenGem={hiddenGem}
                />
              ))}
          </section>
        </div>
      </MainLayout>
    </>
  );
};

const HiddenGemSearchResultCard = ({ hiddenGem }: { hiddenGem: HiddenGem }) => {
  return (
    <>
      <Link
        to={`/hidden-gem/${hiddenGem.hidden_gem_id}`}
        className="flex flex-col md:flex-row gap-5 p-5 border-b py-10 my-10"
      >
        <div className="w-full lg:max-w-[200px] md:max-w-[200px] md:max-h-[130px]">
          <img
            src={hiddenGem.photos[0]}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-cabinet text-2xl font-semibold">
            {hiddenGem.title}
          </h1>
          <p>{hiddenGem.description.substring(0, 100)}...</p>
          <p>{hiddenGem.location}</p>
          <div className="flex gap-3 items-center">
            <div className="flex">
              <span
                className={`icon-[iconamoon--star-fill] w-4 h-4 ${
                  hiddenGem.rating >= 1 ? "bg-yellow-500" : "bg-gray-300"
                }`}
              ></span>
              <span
                className={`icon-[iconamoon--star-fill] w-4 h-4 ${
                  hiddenGem.rating >= 2 ? "bg-yellow-500" : "bg-gray-300"
                }`}
              ></span>
              <span
                className={`icon-[iconamoon--star-fill] w-4 h-4 ${
                  hiddenGem.rating >= 3 ? "bg-yellow-500" : "bg-gray-300"
                }`}
              ></span>
              <span
                className={`icon-[iconamoon--star-fill] w-4 h-4 ${
                  hiddenGem.rating >= 4 ? "bg-yellow-500" : "bg-gray-300"
                }`}
              ></span>
              <span
                className={`icon-[iconamoon--star-fill] w-4 h-4 ${
                  hiddenGem.rating >= 5 ? "bg-yellow-500" : "bg-gray-300"
                }`}
              ></span>
            </div>
            <p>{hiddenGem.rating.toFixed(1)}</p>
          </div>
          <p>
            Price :{" "}
            {hiddenGem.price_start.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })}{" "}
            -{" "}
            {hiddenGem.price_end.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })}
          </p>
          <div className="flex gap-5 items-center">
            <Avatar>
              <AvatarImage
                src={hiddenGem.user.profile}
                alt={hiddenGem.user.fullname}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            by {hiddenGem.user.username}
          </div>
        </div>
      </Link>
    </>
  );
};

export default HiddenGemSearchResult;
