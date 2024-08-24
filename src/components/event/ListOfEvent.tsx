import { useGetEvents } from "@/hooks/event/useGetEvents";
import { Event } from "@/types/Event/Event";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import InfiniteScroll from "react-infinite-scroll-component";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { EventCategory } from "@/types/Event/EventCategory";
import { useGetEventCategory } from "@/hooks/event/useGetEventCategory";
import { Skeleton } from "../ui/skeleton";

const ListOfEvent = () => {
  const getEvents = useGetEvents();
  const [data, setData] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [query, setQuery] = useState<string>("");
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);

  useEffect(() => {
    getEvents(
      (events: Event[]) => {
        setData(events);
        setIsLoading(false);
      },
      () => {
        console.log("error");
      },
      query
    );
  }, [query]);

  const fetchMoreData = () => {
    try {
      const otherQuery = query.split("&").slice(2).join("&");
      const newQuery = `page=${page}&limit=10${
        otherQuery !== "" ? `&${otherQuery}` : ""
      }`;

      getEvents(
        (events: Event[]) => {
          if (events.length === 0) {
            setHasMore(false);
          }
          setData((prevHiddenGems) => [...prevHiddenGems, ...events]);
        },
        () => {
          console.log("error");
        },
        newQuery
      );

      setPage((prevPage) => prevPage + 1);
    } catch (err) {
      console.error("Failed to fetch more articles:", err);
    }
  };

  return (
    <>
      <section id="events" className="px-5 py-10 w-full max-w-7xl mx-auto">
        <Filter setQuery={setQuery} query={query} />

        {data.length === 0 && (
          <div className="py-20">
            <p className="text-center">No data</p>
          </div>
        )}

        {isLoading && (
          <section className="w-full max-w-7xl mx-auto pt-28 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <Skeleton className="w-full h-[50vh] relative flex justify-center items-center rounded-3xl" />
            <Skeleton className="w-full h-[50vh] relative flex justify-center items-center rounded-3xl" />
            <Skeleton className="w-full h-[50vh] relative flex justify-center items-center rounded-3xl" />
            <Skeleton className="w-full h-[50vh] relative flex justify-center items-center rounded-3xl" />
            <Skeleton className="w-full h-[50vh] relative flex justify-center items-center rounded-3xl" />
            <Skeleton className="w-full h-[50vh] relative flex justify-center items-center rounded-3xl" />
          </section>
        )}

        {!isLoading && data && (
          <InfiniteScroll
            dataLength={data.length}
            next={fetchMoreData}
            loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
            hasMore={hasMore}
            scrollThreshold={1}
          >
            <section className="w-full max-w-7xl mx-auto pt-28 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {data.map((event: Event) => (
                <EventCard key={event.event_id} event={event} />
              ))}
            </section>
          </InfiniteScroll>
        )}
      </section>
    </>
  );
};

const EventCard = ({ event }: { event: Event }) => {
  return (
    <>
      <Link
        to={`/event/${event.event_id}`}
        className="flex flex-col gap-5 rounded-3xl p-2 mt-5"
      >
        <div>
          <img
            src={event.photos[0]}
            alt=""
            className="w-full h-full max-h-[11rem] object-cover"
          />
        </div>
        <div className="flex flex-col gap-2 ">
          <h2 className="font-semibold text-2xl font-cabinet">{event.title}</h2>
          <p className="text-left text-gray-500 font-light">
            {event.price_start.toLocaleString("id-ID", {
              maximumFractionDigits: 0,
              style: "currency",
              currency: "IDR",
            })}{" "}
            -{" "}
            {event.price_end.toLocaleString("id-ID", {
              maximumFractionDigits: 0,
              style: "currency",
              currency: "IDR",
            })}
          </p>
          <p>{event.description.substring(0, 100)}...</p>
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

const Filter = ({
  setQuery,
  query,
}: {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  query: string;
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [lowestPrice, setLowestPrice] = useState(0);
  const [highestPrice, setHighestPrice] = useState(0);
  const [location, setLocation] = useState("");
  const [categories, setCategories] = useState<EventCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>(
    {} as EventCategory
  );
  const [visibleCategories, setVisibleCategories] = useState<EventCategory[]>(
    []
  );
  const getCategories = useGetEventCategory();

  useEffect(() => {
    getCategories(
      (categories: EventCategory[]) => {
        setVisibleCategories(categories.slice(0, 5));
        setCategories(categories.slice(5, categories.length));
      },
      () => {
        console.log("error");
      }
    );
  }, []);

  const handleReset = () => {
    setSelectedCategory({} as EventCategory);
    setLowestPrice(0);
    setHighestPrice(0);
    setLocation("");
  };

  const handleApply = () => {
    const q = [...query.split("&").slice(0, 2)];

    if (lowestPrice > 0) {
      q.push(`price_start=${lowestPrice}`);
    }

    if (highestPrice > 0) {
      q.push(`price_end=${highestPrice}`);
    }

    if (location !== "") {
      q.push(`location=${location}`);
    }

    if (selectedCategory.category_id) {
      q.push(`category_id=${selectedCategory.category_id}`);
    }

    setQuery(q.join("&"));
  };

  return (
    <>
      <div className="flex justify-end items-center">
        <Button
          type="button"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center gap-3 rounded-full"
        >
          <p className="text-lg">Filter</p>
          <span className="icon-[iconamoon--sorting-center-light] w-5 h-5"></span>
        </Button>
      </div>

      <section
        className={`fixed w-screen h-screen lg:bg-transparent bg-black/50 backdrop-blur-sm top-0 left-0 z-40 ${
          isFilterOpen ? "translate-y-0" : "translate-y-full"
        } duration-500 transition-all`}
      >
        <div className="flex flex-col gap-5 px-7 md:px-12 py-10 bg-white relative top-0 left-0 pt-24 md:pt-28 max-w-6xl 2xl:max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <Button
              type="button"
              variant={"ghost"}
              className="hover:bg-transparent w-fit p-0"
              onClick={handleReset}
            >
              <p className="text-lg font-bold text-orange-500">Reset</p>
            </Button>
            <Button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              type="button"
              variant={"ghost"}
              className="hover:bg-transparent w-fit p-0"
            >
              <span className="icon-[iconamoon--sign-plus] rotate-45 w-8 h-8"></span>
            </Button>
          </div>

          <div>
            <p className="text-md font-semibold">Price</p>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Min, e.g. 100000"
                value={lowestPrice}
                inputMode="numeric"
                onChange={(e) => {
                  const value = e.target.value;
                  // Hanya update state jika value adalah angka
                  if (/^\d*$/.test(value)) {
                    setLowestPrice(Number(value));
                  }
                }}
              />
              <p>-</p>
              <Input
                placeholder="Max, e.g. 1000000"
                inputMode="numeric"
                value={highestPrice}
                onChange={(e) => {
                  const value = e.target.value;
                  // Hanya update state jika value adalah angka
                  if (/^[0-9]*$/.test(value)) {
                    setHighestPrice(Number(value));
                  }
                }}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="location" className="text-md mb-2 font-semibold">
              Location
            </Label>
            <div className="flex flex-col gap-2">
              <Input
                id="location"
                placeholder="e.g. Berlin"
                value={location}
                onChange={(e) => {
                  const value: string = e.target.value;

                  if (/^[a-zA-Z]*$/.test(value)) {
                    setLocation(value);
                  }
                }}
              />
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={"ghost"}
                  onClick={() => setLocation("Surabaya")}
                  className={`w-fit border rounded-full p-5 flex gap-2 ${
                    location === "Surabaya" ? "bg-orange-500 text-white" : ""
                  }`}
                >
                  <p>Surabaya</p>
                </Button>
                <Button
                  variant={"ghost"}
                  onClick={() => setLocation("Malang")}
                  className={`w-fit border rounded-full p-5 flex gap-2 ${
                    location === "Malang" ? "bg-orange-500 text-white" : ""
                  }`}
                >
                  <p>Malang</p>
                </Button>
                <Button
                  variant={"ghost"}
                  onClick={() => setLocation("Bandung")}
                  className={`w-fit border rounded-full p-5 flex gap-2 ${
                    location === "Bandung" ? "bg-orange-500 text-white" : ""
                  }`}
                >
                  <p>Bandung</p>
                </Button>
                <Button
                  variant={"ghost"}
                  onClick={() => setLocation("Jawa Tengah")}
                  className={`w-fit border rounded-full p-5 flex gap-2 ${
                    location === "Jawa Tengah" ? "bg-orange-500 text-white" : ""
                  }`}
                >
                  <p>Jawa Tengah</p>
                </Button>
                <Button
                  variant={"ghost"}
                  onClick={() => setLocation("Kalimantan Timur")}
                  className={`w-fit border rounded-full p-5 flex gap-2 ${
                    location === "Kalimantan Timur"
                      ? "bg-orange-500 text-white"
                      : ""
                  }`}
                >
                  <p>Kalimantan Timur</p>
                </Button>
                <Button
                  variant={"ghost"}
                  onClick={() => setLocation("Jawa Timur")}
                  className={`w-fit border rounded-full p-5 flex gap-2 ${
                    location === "Jawa Timur" ? "bg-orange-500 text-white" : ""
                  }`}
                >
                  <p>Jawa Timur</p>
                </Button>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="category" className="text-md mb-2 font-semibold">
              Category
            </Label>
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap gap-2">
                {visibleCategories.map((category: EventCategory) => (
                  <Button
                    key={category.category_id}
                    variant={"ghost"}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-fit border rounded-full p-5 flex gap-2 ${
                      selectedCategory.category_id === category.category_id
                        ? "bg-orange-500 text-white"
                        : ""
                    }`}
                  >
                    <p>{category.category_name}</p>
                  </Button>
                ))}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"ghost"}
                      className="w-fit p-5 text-orange-500 hover:bg-transparent hover:text-orange-400"
                    >
                      See All
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[30rem]">
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category: EventCategory) => (
                        <Button
                          key={category.category_id}
                          variant={"ghost"}
                          onClick={() => setSelectedCategory(category)}
                          className={`w-fit border rounded-full p-5 flex gap-2 ${
                            selectedCategory.category_id ===
                            category.category_id
                              ? "bg-orange-500 text-white"
                              : ""
                          }`}
                        >
                          <p>{category.category_name}</p>
                        </Button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <Button onClick={handleApply} type="button" className="bg-orange-500">
            Apply
          </Button>
        </div>
      </section>
    </>
  );
};
export default ListOfEvent;
