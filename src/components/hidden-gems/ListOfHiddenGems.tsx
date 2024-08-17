import { useGetHiddenGems } from "@/hooks/hidden-gems/useGetHiddenGems";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { HiddenGem } from "@/types/HiddenGem/HiddenGems";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const ListOfHiddenGems = () => {
  const getHiddenGems = useGetHiddenGems();
  const [data, setData] = useState<HiddenGem[]>([]);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    getHiddenGems(
      (hiddenGems: HiddenGem[]) => {
        setData(hiddenGems);
      },
      () => {
        console.log("error");
      },
      query
    );
  }, [query]);

  return (
    <>
      <section id="hidden-gems-list" className="px-5 py-10 w-full max-w-7xl mx-auto">
        <Filter setQuery={setQuery} />

        <div className="w-full max-w-7xl mx-auto pt-28 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data &&
            data.map((hiddenGem: HiddenGem) => (
              <HiddenGemCard
                key={hiddenGem.hidden_gem_id}
                hiddenGem={hiddenGem}
              />
            ))}
        </div>
      </section>
    </>
  );
};

const HiddenGemCard = ({ hiddenGem }: { hiddenGem: HiddenGem }) => {
  return (
    <>
      <Link
        to={`/article/${hiddenGem.hidden_gem_id}`}
        className="flex flex-col gap-5 rounded-3xl p-2 mt-5"
      >
        <div>
          <img
            src={hiddenGem.photos[0]}
            alt=""
            className="w-full h-full max-h-[11rem] object-cover"
          />
        </div>
        <div className="flex flex-col gap-2 ">
          <h2 className="font-semibold text-2xl font-cabinet">
            {hiddenGem.title}
          </h2>
          <p className="text-left text-gray-500 font-light">
            {hiddenGem.price_start.toLocaleString("id-ID", {
              maximumFractionDigits: 0,
              style: "currency",
              currency: "IDR",
            })}{" "}
            -{" "}
            {hiddenGem.price_end.toLocaleString("id-ID", {
              maximumFractionDigits: 0,
              style: "currency",
              currency: "IDR",
            })}
          </p>
          <p>{hiddenGem.description.substring(0, 100)}...</p>
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

const Filter = ({
  setQuery,
}: {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [lowestPrice, setLowestPrice] = useState(0);
  const [highestPrice, setHighestPrice] = useState(0);
  const [location, setLocation] = useState("");

  const handleReset = () => {
    setLowestPrice(0);
    setHighestPrice(0);
    setLocation("");
  };

  const handleApply = () => {
    const query = [];

    if (lowestPrice > 0) {
      query.push(`price_start=${lowestPrice}`);
    }

    if (highestPrice > 0) {
      query.push(`price_end=${highestPrice}`);
    }

    if (location !== "") {
      query.push(`location=${location}`);
    }

    setQuery(query.join("&"));
  };

  return (
    <>
      <div className="flex justify-end items-center">
        <Button
          type="button"
          variant={"ghost"}
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center gap-3 hover:bg-transparent"
        >
          <p className="text-lg underline">Filter</p>
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

          {/* <div>
            <p className="text-md mb-2">Rating</p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={"ghost"}
                className="w-fit border rounded-full p-5 flex gap-2"
              >
                <span className="icon-[iconamoon--star-fill] bg-yellow-500"></span>
                <p className="inline-block -space-x-10">Kurang dari 3</p>
              </Button>
              <Button
                variant={"ghost"}
                className="w-fit border rounded-full p-5 flex gap-2"
              >
                <span className="icon-[iconamoon--star-fill] bg-yellow-500"></span>
                <p className="inline-block -space-x-10">Kurang dari 4</p>
              </Button>
              <Button
                variant={"ghost"}
                className="w-fit border rounded-full p-5 flex gap-2"
              >
                <span className="icon-[iconamoon--star-fill] bg-yellow-500"></span>
                <p className="inline-block -space-x-10">Kurang dari 5</p>
              </Button>
              <Button
                variant={"ghost"}
                className="w-fit border rounded-full p-5 flex gap-2"
              >
                <span className="icon-[iconamoon--star-fill] bg-yellow-500"></span>
                <p className="inline-block -space-x-10">5</p>
              </Button>
            </div>
          </div> */}

          <div>
            <p className="text-md mb-2">Price</p>
            <div className="grid grid-cols-2 gap-2">
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
            <Label htmlFor="location">Location</Label>
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

          <Button onClick={handleApply} type="button" className="bg-orange-500">
            Apply
          </Button>
        </div>
      </section>
    </>
  );
};

export default ListOfHiddenGems;
