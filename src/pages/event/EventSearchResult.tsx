import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetEvents } from "@/hooks/event/useGetEvents";
import MainLayout from "@/layouts/MainLayout";
import { SEOModel } from "@/models/SEO";
import { Event } from "@/types/Event/Event";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const EventSearchResult = () => {
  const [searchParams] = useSearchParams();
  const getEvents = useGetEvents();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    getEvents(
      (events: Event[]) => {
        setEvents(events);
      },
      () => {
        console.log("error");
      },
      `s=${searchParams.get("s")}`
    );
  });

  const SEO: SEOModel = {
    title: "Events | Search Result",
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
            {events &&
              events.map((event: Event) => (
                <EventSearchResultCard key={event.event_id} event={event} />
              ))}
          </section>
        </div>
      </MainLayout>
    </>
  );
};

const EventSearchResultCard = ({ event }: { event: Event }) => {
  return (
    <>
      <Link
        to={`/hidden-gem/${event.event_id}`}
        className="flex flex-col md:flex-row gap-5 p-5 border-b py-10 my-10"
      >
        <div className="w-full lg:max-w-[200px] md:max-w-[200px] md:max-h-[130px]">
          <img
            src={event.photos[0]}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-cabinet text-2xl font-semibold">{event.title}</h1>
          <p>{event.description.substring(0, 100)}...</p>
          <p>{event.location}</p>
          <p>
            Price :{" "}
            {event.price_start.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })}{" "}
            -{" "}
            {event.price_end.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })}
          </p>
          <div className="flex gap-5 items-center">
            <Avatar>
              <AvatarImage src={event.user.profile} alt={event.user.fullname} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            by {event.user.username}
          </div>
        </div>
      </Link>
    </>
  );
};

export default EventSearchResult;
