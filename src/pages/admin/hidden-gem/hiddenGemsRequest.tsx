import Loading from "@/components/Skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { useGetHiddenGems } from "@/hooks/hidden-gems/useGetHiddenGems";
import AdminLayout from "@/layouts/AdminLayout";
import { HiddenGem } from "@/types/HiddenGem/HiddenGems";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HiddenGemsRequest = () => {
  const { token } = useAuth();
  const getRequestHiddenGems = useGetHiddenGems();
  const [hiddenGems, setHiddenGems] = useState<HiddenGem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getRequestHiddenGems(
      (data: HiddenGem[]) => {
        setHiddenGems(data);
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
        title="Hidden Gems Request"
        siteName="Hidden Gems"
        siteUrl="https://hiddengems.com"
      >
        {isLoading && <Loading />}
        {!isLoading && hiddenGems.length > 0 && (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 px-4 py-5">
            {hiddenGems.map((hiddenGem: HiddenGem) => (
              <Card key={hiddenGem.hidden_gem_id} hiddenGem={hiddenGem} />
            ))}
          </div>
        )}
      </AdminLayout>
    </>
  );
};

const Card = ({ hiddenGem }: { hiddenGem: HiddenGem }) => {
  return (
    <>
      <Link
        to={`/admin/hidden-gem/detail/${hiddenGem.hidden_gem_id}`}
        className="w-full flex flex-col gap-5 rounded-2xl p-5 border h-fit"
      >
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <Avatar>
              <AvatarImage
                src={hiddenGem.user.profile}
                alt={hiddenGem.user.fullname}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1>{hiddenGem.user.fullname}</h1>
          </div>
          <p className="capitalize py-2 px-3 text-sm bg-orange-100 text-orange-600 rounded-xl">
            {hiddenGem.status}
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-3 lg:justify-between">
          <div className="flex-1">
            <p className="font-semibold">Hidden Gems Name</p>
            <p className="text-sm">{hiddenGem.title}</p>
          </div>
          <div className="flex-1">
            <p className="font-semibold">Requested at</p>
            <p className="text-sm">
              {new Date(hiddenGem.created_at).toDateString()}
            </p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-3 lg:justify-between">
          <div className="flex-1">
            <p className="font-semibold">Location</p>
            <p className="text-sm">{hiddenGem.location}</p>
          </div>
          <div className="flex-1">
            <p className="font-semibold">Description</p>
            <p className="text-sm">{hiddenGem.description.substring(0, 100)}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default HiddenGemsRequest;
