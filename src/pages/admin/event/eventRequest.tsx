import Loading from "@/components/Skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { useGetEvents } from "@/hooks/event/useGetEvents";
import AdminLayout from "@/layouts/AdminLayout";
import { Event } from "@/types/Event/Event";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EventRequest = () => {
  const { token } = useAuth();
  const [event, setEvent] = useState<Event[]>([]);
  const getEvent = useGetEvents();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getEvent(
      (data: Event[]) => {
        setEvent(data);
        setIsLoading(false);
      },
      () => {
        console.log("error");
      },
      "stat[]=PENDING",
      token as string
    );
  }, []);

  return (
    <>
      <AdminLayout
        title="EventRequest"
        siteName="Hidden Gems"
        siteUrl="https://hiddengems.com"
      >
        {isLoading && <Loading />}
        {!isLoading && event.length > 0 && (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 px-4 py-5">
            {event.map((event: Event) => (
              <Card key={event.event_id} event={event} />
            ))}
          </div>
        )}
      </AdminLayout>
    </>
  );
};

const Card = ({ event }: { event: Event }) => {
  return (
    <>
      <Link
        to={`/admin/event/detail/${event.event_id}`}
        className="w-full flex flex-col gap-5 rounded-2xl p-5 border h-fit"
      >
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <Avatar>
              <AvatarImage src={event.user.profile} alt={event.user.fullname} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1>{event.user.fullname}</h1>
          </div>
          <p className="capitalize py-2 px-3 text-sm bg-orange-100 text-orange-600 rounded-xl">
            {event.status}
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-3 lg:justify-between">
          <div className="flex-1">
            <p className="font-semibold">Event Name</p>
            <p className="text-sm">{event.title}</p>
          </div>
          <div className="flex-1">
            <p className="font-semibold">Requested at</p>
            <p className="text-sm">
              {new Date(event.created_at).toDateString()}
            </p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-3 lg:justify-between">
          <div className="flex-1">
            <p className="font-semibold">Location</p>
            <p className="text-sm">{event.location}</p>
          </div>
          <div className="flex-1">
            <p className="font-semibold">Description</p>
            <p className="text-sm">{event.description.substring(0, 100)}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default EventRequest;
