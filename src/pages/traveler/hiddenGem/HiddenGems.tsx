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
import { useDeleteHiddenGem } from "@/hooks/hidden-gems/useDeleteHiddenGem";
import { useGetHiddenGems } from "@/hooks/hidden-gems/useGetHiddenGems";
import { useGetUser } from "@/hooks/useGetUser";
import MainLayout from "@/layouts/MainLayout";
import { SEOModel } from "@/models/SEO";
import { HiddenGem } from "@/types/HiddenGem/HiddenGems";
import { User } from "@/types/User";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SEO: SEOModel = {
  title: "Hidden Gems",
  description:
    "Explore a variety of captivating articles that uncover hidden destinations and unique experiences for travelers. Find inspiration for your next journey on Hidden Gems.",
  siteName: "Hidden Gems",
  siteUrl: "https://hiddengems.com/hidden-gems",
  keywords: [
    "hidden gems",
    "travel articles",
    "hidden destinations",
    "travel tips",
    "travel experiences",
  ],
  type: "website",
};

const TravelerHiddenGems = () => {
  const { token } = useAuth();
  const getUser = useGetUser();
  const [user, setUser] = useState<User | undefined>(undefined);
  const [status, setStatus] = useState<
    "PENDING" | "REVISION" | "REJECT" | "APPROVE"
  >("APPROVE");
  const [search, setSearch] = useState("");
  const getHiddenGems = useGetHiddenGems();
  const [hiddenGems, setHiddenGems] = useState<HiddenGem[]>([]);

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
      getHiddenGems(
        (data: HiddenGem[]) => {
          setHiddenGems(data);
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
            <div className="flex max-md:flex-col md:justify-between md:items-center">
              <h1 className="font-cabinet font-semibold text-5xl">
                Your Hidden Gems
              </h1>
              <Link to={"/hidden-gems/post"}>
                <Button className="bg-orange-500 rounded-full hover:bg-orange-400">
                  Create Hidden Gem
                </Button>
              </Link>
            </div>
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-5">
              <div className="flex gap-5 items-center max-md:order-2">
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
                placeholder="Search Hidden Gems"
                className="w-[20rem] max-md:order-1"
              />
            </div>
            <div className="flex flex-col gap-5 mt-5">
              {hiddenGems.length === 0 && (
                <p className="text-center text-gray-500">
                  No hidden gems found
                </p>
              )}
              {hiddenGems.map((hiddenGem: HiddenGem) => (
                <Card
                  key={hiddenGem.hidden_gem_id}
                  hiddenGem={hiddenGem}
                  setHiddenGems={setHiddenGems}
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
  hiddenGem,
  setHiddenGems,
}: {
  hiddenGem: HiddenGem;
  setHiddenGems: React.Dispatch<React.SetStateAction<Array<HiddenGem>>>;
}) => {
  const { token } = useAuth();
  const deleteHiddenGem = useDeleteHiddenGem();

  const handleDelete = () => {
    deleteHiddenGem({
      onSuccess() {
        setHiddenGems((prev) =>
          prev.filter(
            (prevHiddenGems) =>
              prevHiddenGems.hidden_gem_id !== hiddenGem.hidden_gem_id
          )
        );
      },
      onError() {
        console.log("error");
      },
      hiddenGemId: hiddenGem.hidden_gem_id,
      token: token as string,
    });
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-5 pb-5 border-b">
        <Link to={`/hidden-gem/${hiddenGem.hidden_gem_id}`}>
          <div className="w-full lg:max-w-[200px] md:max-w-[200px] md:max-h-[130px]">
            <img
              src={hiddenGem.photos[0]}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
        <div className="flex flex-col gap-2 justify-between">
          <div className="flex flex-col gap-2">
            <Link to={`/hidden-gem/${hiddenGem.hidden_gem_id}`}>
              <h1 className="font-cabinet text-2xl font-semibold">
                {hiddenGem.title}
              </h1>
              <p>{hiddenGem.description.substring(0, 100)}...</p>
            </Link>
            <p className="text-left text-sm">
              {new Date(hiddenGem.created_at).toDateString()}
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
                {hiddenGem.status === "APPROVE" && (
                  <DropdownMenuItem>
                    <Link
                      to={`/traveler/hidden-gem/${hiddenGem.hidden_gem_id}/edit`}
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

export default TravelerHiddenGems;
