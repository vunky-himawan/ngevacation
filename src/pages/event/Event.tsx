import MainLayout from "@/layouts/MainLayout";
import { SEOModel } from "@/models/SEO";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetEvent } from "@/hooks/event/useGetEvent";
import { Event as EventModel } from "@/types/Event/Event";
import { EventOperationalDay } from "@/types/Event/EventOperationalDay";

const Event = () => {
  const { token } = useAuth();
  const { eventId } = useParams<{ eventId: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<EventModel>();
  const getEvent = useGetEvent();

  const SEO: SEOModel = {
    title: "Event",
    description:
      "Explore a variety of captivating articles that uncover hidden destinations and unique experiences for travelers. Find inspiration for your next journey on Hidden Gems.",
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

  useEffect(() => {
    getEvent(
      eventId as string,
      (data: EventModel) => {
        console.log(data);
        setData(data);
        setIsLoading(false);
        SEO.title = data.title;
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
        <section className="mx-auto w-full lg:max-w-6xl 2xl:max-w-7xl mt-24 p-5 flex flex-col gap-3">
          {isLoading && (
            <div className="w-full relative flex flex-col gap-5 justify-center rounded-3xl">
              <Skeleton className="w-full h-[50vh] relative flex justify-center items-center rounded-3xl" />
              <Skeleton className="w-full h-[1rem] relative flex justify-center items-center rounded-3xl" />
              <Skeleton className="w-full h-[1rem] relative flex justify-center items-center rounded-3xl" />
              <Skeleton className="w-full h-[1rem] relative flex justify-center items-center rounded-3xl" />
              <Skeleton className="w-full h-[1rem] relative flex justify-center items-center rounded-3xl" />
            </div>
          )}
          {!isLoading && data && (
            <>
              <Swiper
                slidesPerView={1}
                loop={true}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                className="w-full h-[50vh] relative flex justify-center items-center rounded-3xl"
              >
                {data?.photos.map((photo: string, index: number) => (
                  <SwiperSlide
                    key={index}
                    className="border h-full bg-black/30 !flex !justify-center !items-center w-full rounded-3xl overflow-hidden"
                  >
                    <img
                      src={photo}
                      alt={data?.title}
                      className="w-full h-full object-cover absolute top-0 left-0"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <h1 className="font-cabinet font-semibold text-5xl">
                {data?.title}
              </h1>
              <div className="flex flex-col md:flex-row justify-between md:items-center max-md:gap-3">
                <div className="flex gap-5 items-center">
                  <Avatar>
                    <AvatarImage
                      src={data?.user.profile}
                      alt={data?.user.fullname}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  by {data?.user.username}
                </div>
                {data?.created_at && (
                  <div>
                    Uploaded at {new Date(data.created_at).toDateString()}
                  </div>
                )}
              </div>
              <Badge className="w-fit p-2 rounded-full bg-orange-500">
                {data?.category.category_name}
              </Badge>
              <p className="text-md">
                Range Price :{" "}
                {data?.price_start.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}{" "}
                -{" "}
                {data?.price_end.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </p>
              <div className="w-full overflow-hidden">
                <h1 className="text-xl font-semibold">Operational Days</h1>
                <div className="overflow-auto">
                  <div className="flex gap-5 w-max mt-3">
                    {data?.operation_days.map(
                      (operational: EventOperationalDay, index: number) => (
                        <OperationalDayCard
                          key={index}
                          day={new Date(operational.date).toDateString()}
                          openingTime={new Date(operational.open_time)}
                          closingTime={new Date(operational.close_time)}
                        />
                      )
                    )}
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-semibold">Description</h1>
                <p>{data?.description}</p>
              </div>
            </>
          )}
        </section>
      </MainLayout>
    </>
  );
};

const OperationalDayCard = ({
  day,
  openingTime,
  closingTime,
}: {
  day: string;
  openingTime: Date;
  closingTime: Date;
}) => {
  return (
    <>
      <div className="min-w-[20rem] max-h-[20rem] border p-5 rounded-xl flex flex-col gap-5 bg-white">
        <div className="flex justify-between items-center">
          <div>
            <h1>Day</h1>
            <p className="text-md font-semibold">{day}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <h1>Opening Time</h1>
            <p className="text-md font-semibold">
              {openingTime.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>
          </div>
          <div>
            <h1>Closing Time</h1>
            <p className="text-md font-semibold">
              {closingTime.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Event;
