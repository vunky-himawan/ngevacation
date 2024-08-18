import { useGetHiddenGems } from "@/hooks/hidden-gems/useGetHiddenGems";
import { HiddenGem } from "@/types/HiddenGem/HiddenGems";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

const FeaturedHiddenGems = () => {
  const [hiddenGems, setHiddenGems] = useState<HiddenGem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const getHiddenGems = useGetHiddenGems();

  useEffect(() => {
    getHiddenGems(
      (data: HiddenGem[]) => {
        setHiddenGems(data.sort((a, b) => b.rating - a.rating).splice(0, 3));
        setIsLoading(false);
      },
      () => {
        console.log("error");
      }
    );
  }, []);

  return (
    <>
      <section className="h-fit w-full max-w-7xl mx-auto px-4 py-10 flex flex-col gap-5">
        <a href="/" className="flex gap-5 items-center justify-between">
          <h1 className="font-semibold text-3xl font-cabinet">Hidden Gems</h1>
          <div className="icon-[iconamoon--arrow-right-1-thin] w-7 h-7" />
        </a>
        {isLoading && (
          <Skeleton className="w-full h-[50vh] relative flex justify-center items-center rounded-3xl" />
        )}
        {!isLoading && hiddenGems.length > 0 && (
          <div className="w-full grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {hiddenGems.map((hiddenGem: HiddenGem) => (
              <CardOfHiddenGems
                image={hiddenGem.photos[0]}
                title={hiddenGem.title}
                rating={hiddenGem.rating}
                uploader={hiddenGem.user.username}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

const CardOfHiddenGems = ({
  image,
  title,
  rating,
  uploader,
}: {
  image: string;
  title: string;
  rating: number;
  uploader: string;
}) => {
  const ratingStars = Array(Math.floor(rating)).fill(1);

  return (
    <>
      <div className="flex-1 grid grid-rows-2 grid-cols-1">
        <div className="w-full h-full flex justify-center items-center rounded-3xl overflow-hidden">
          <img src={image} alt="hidden gem" className="min-h-full" />
        </div>
        <div className="flex flex-col justify-between p-5 border rounded-3xl overflow-hidden">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <h2 className="text-xl">{title}</h2>
            </div>
            <p className="text-sm">Uploaded by {uploader}</p>
            <div className="flex gap-1 items-center">
              {ratingStars.map((star, index) => (
                <div
                  key={index}
                  className="icon-[iconamoon--star-fill] w-5 h-5 bg-yellow-500"
                />
              ))}
              {Math.floor(rating)}
            </div>
          </div>
          <div>
            <a href="/" className="text-yellow-5">
              View Details
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturedHiddenGems;
