import Loading from "@/components/Skeleton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { useDeleteEvent } from "@/hooks/event/useDeleteEvent";
import { useGetEvents } from "@/hooks/event/useGetEvents";
import { useGetUser } from "@/hooks/useGetUser";
import MainLayout from "@/layouts/MainLayout";
import { SEOModel } from "@/models/SEO";
import { Event } from "@/types/Event/Event";
import { User } from "@/types/User";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SEO: SEOModel = {
  title: "Events",
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

const TravelerEvents = () => {
  const { token } = useAuth();
  const getUser = useGetUser();
  const [user, setUser] = useState<User | undefined>(undefined);
  const [status, setStatus] = useState<
    "PENDING" | "REVISION" | "REJECT" | "APPROVE"
  >("APPROVE");
  const [search, setSearch] = useState("");
  const getEvents = useGetEvents();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    getUser(
      (data: User) => {
        setUser(data);
      },
      () => {
        console.log("error");
      },
      token as string
    );
  }, [token]);

  useEffect(() => {
    if (user) {
      getEvents(
        (data: Event[]) => {
          console.log(data);
          setEvents(data);
        },
        () => {
          console.log("error");
        },
        `u=${user.user_id}&s=${search}&stat[]=${status}`,
        token as string
      );
    }
  }, [user, search, status]);

  if (!user) {
    return <Loading />;
  }

  return (
    <>
      <MainLayout SEO={SEO}>
        <section className="w-full max-w-7xl mx-auto mt-28 p-5">
          <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center">
              <h1 className="font-cabinet font-semibold text-5xl">
                Your Events
              </h1>
              <Link to={"/event/post"}>
                <Button className="bg-orange-500 rounded-full hover:bg-orange-400">
                  Create Event
                </Button>
              </Link>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-5 items-center">
                <button
                  onClick={() => setStatus("APPROVE")}
                  className={`p-3 ${
                    status === "APPROVE" ? "border-b border-black" : ""
                  }`}
                >
                  Approved
                </button>
                <button
                  onClick={() => setStatus("PENDING")}
                  className={`p-3 ${
                    status === "PENDING" ? "border-b border-black" : ""
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setStatus("REVISION")}
                  className={`p-3 ${
                    status === "REVISION" ? "border-b border-black" : ""
                  }`}
                >
                  Revision
                </button>
                <button
                  onClick={() => setStatus("REJECT")}
                  className={`p-3 ${
                    status === "REJECT" ? "border-b border-black" : ""
                  }`}
                >
                  Reject
                </button>
              </div>
              <Input
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search Events"
                className="w-[20rem]"
              />
            </div>
            <div className="flex flex-col gap-5 mt-5">
              {events.length === 0 && (
                <p className="text-center text-gray-500">No events found</p>
              )}
              {events.map((event: Event) => (
                <Card
                  key={event.event_id}
                  event={event}
                  setEvents={setEvents}
                />
              ))}
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

const Card = ({
  event,
  setEvents,
}: {
  event: Event;
  setEvents: React.Dispatch<React.SetStateAction<Array<Event>>>;
}) => {
  const { token } = useAuth();
  const deleteEvent = useDeleteEvent();

  const handleDelete = () => {
    deleteEvent({
      onSuccess() {
        setEvents((prev) =>
          prev.filter((prevArticle) => prevArticle.event_id !== event.event_id)
        );
      },
      onError() {
        console.log("error");
      },
      eventId: event.event_id,
      token: token as string,
    });
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-5 pb-5 border-b">
        <Link to={`/event/${event.event_id}`}>
          <div className="w-full lg:max-w-[200px] md:max-w-[200px] md:max-h-[130px]">
            <img
              src={event.photos[0]}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
        <div className="flex flex-col gap-2 justify-between">
          <div className="flex flex-col gap-2">
            <Link to={`/event/${event.event_id}`}>
              <h1 className="font-cabinet text-2xl font-semibold">
                {event.title}
              </h1>
              <p>{event.description.substring(0, 100)}...</p>
            </Link>
            <p className="text-left text-sm">
              {new Date(event.created_at).toDateString()}
            </p>
          </div>
          <div className="flex gap-8 items-center">
            <DropdownMenu>
              <div className="flex gap-2 items-center cursor-pointer">
                <DropdownMenuTrigger asChild>
                  <span className="icon-[iconamoon--menu-kebab-horizontal] w-5 h-5"></span>
                </DropdownMenuTrigger>
              </div>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {event.status === "APPROVE" && (
                  <DropdownMenuItem>
                    <Link
                      to={`/traveler/event/${event.event_id}/edit`}
                      className="w-full p-1 text-left"
                    >
                      Edit
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="w-full text-red-500 p-1 text-left"
                  >
                    Delete
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  );
};
export default TravelerEvents;
