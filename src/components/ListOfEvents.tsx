import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import { useEffect, useState } from "react";
import { useGetEvents } from "@/hooks/event/useGetEvents";
import { Event } from "@/types/Event/Event";
import { Skeleton } from "./ui/skeleton";
import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Autoplay } from "swiper/modules";

const ListOfEvent = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const getEvents = useGetEvents();

  useEffect(() => {
    getEvents(
      (data: Event[]) => {
        setEvents(data.splice(0, 5));
        setIsLoading(false);
      },
      () => {
        console.log("error");
      }
    );
  }, []);

  return (
    <>
      <section className="w-full max-w-7xl mx-auto px-4 py-10 flex flex-col gap-5">
        <a href="/" className="flex gap-5 items-center justify-between">
          <h1 className="font-semibold text-3xl font-cabinet">Events</h1>
          <div className="icon-[iconamoon--arrow-right-1-thin] w-7 h-7" />
        </a>
        <div className="w-full relative">
          {isLoading && (
            <Skeleton className="w-full h-[50vh] relative flex justify-center items-center rounded-3xl" />
          )}
          {!isLoading && events.length > 0 && (
            <Swiper
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              className="w-full h-[50vh] relative flex justify-center items-center rounded-3xl"
            >
              {events.map((event: Event) => (
                <SwiperSlide
                  key={event.event_id}
                  className="border h-full bg-black/30 !flex !justify-center !items-center w-full rounded-3xl overflow-hidden"
                >
                  <Link
                    to={`/event/${event.event_id}`}
                    key={event.event_id}
                    className="w-full h-full relative"
                  >
                    <img
                      src={event.photos[0]}
                      alt={event.title}
                      className="w-full h-full object-cover absolute top-0 left-0"
                    />
                    <div className="absolute top-0 left-0 w-full h-full flex flex-col gap-3 text-center justify-center items-center text-white font-cabinet font-semibold text-2xl">
                      <p>{event.title}</p>
                      <Badge className="bg-orange-500 px-3 py-1 hover:bg-orange-400">
                        {event.category.category_name}
                      </Badge>
                      <p className="text-base font-normal">
                        {event.description.substring(0, 100)}
                      </p>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </section>
    </>
  );
};

export default ListOfEvent;
