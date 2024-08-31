import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useApprove } from "@/hooks/hidden-gems/useApprove";
import { useGetHiddenGemById } from "@/hooks/hidden-gems/useGetHiddenGemById";
import { useReject } from "@/hooks/hidden-gems/useReject";
import AdminLayout from "@/layouts/AdminLayout";
import { HiddenGemsOperationDay } from "@/types/HiddenGem/HiddenGemOperationDay";
import { HiddenGem } from "@/types/HiddenGem/HiddenGems";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const HiddenGemsDetail = () => {
  const { hiddenGemId } = useParams<{ hiddenGemId: string }>();
  const { token } = useAuth();
  const getData = useGetHiddenGemById();
  const [hiddenGem, setHiddenGem] = useState<HiddenGem | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const reject = useReject();
  const approve = useApprove();
  const navigate = useNavigate();

  useEffect(() => {
    getData(
      hiddenGemId as string,
      (data: HiddenGem) => {
        setHiddenGem(data);
        setIsLoading(false);
      },
      () => {
        console.log("error");
      },
      token as string
    );
  }, []);

  const handleRejectSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    reject({
      onSuccess: () => {
        toast({
          title: "Message Successfully",
          description: "Your message has been successfully posted.",
          duration: 2000,
        });
        navigate("/admin/hidden-gem/request");
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to post message.",
          duration: 2000,
        });
      },
      token: token as string,
      message: message,
      hiddenGemId: hiddenGemId as string,
    });
    setMessage("");
  };

  const handleApprove = () => {
    approve({
      onSuccess: () => {
        toast({
          title: "Message Successfully",
          description: "Your message has been successfully posted.",
          duration: 2000,
        });
        navigate("/admin/hidden-gem/request");
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to post message.",
          duration: 2000,
        });
      },
      token: token as string,
      hiddenGemId: hiddenGemId as string,
    });
  };

  return (
    <AdminLayout
      title="Hidden Gems Detail"
      siteName="Hidden Gems"
      siteUrl="https://hiddengems.com"
    >
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
        {!isLoading && hiddenGem && (
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
              {hiddenGem?.photos.map((photo: string, index: number) => (
                <SwiperSlide
                  key={index}
                  className="border h-full bg-black/30 !flex !justify-center !items-center w-full rounded-3xl overflow-hidden"
                >
                  <img
                    src={photo}
                    alt={hiddenGem?.title}
                    className="w-full h-full object-cover absolute top-0 left-0"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <h1 className="font-cabinet font-semibold text-5xl">
              {hiddenGem?.title}
            </h1>
            <div className="flex flex-col md:flex-row justify-between md:items-center max-md:gap-3">
              <div className="flex gap-5 items-center">
                <Avatar>
                  <AvatarImage
                    src={hiddenGem?.user.profile}
                    alt={hiddenGem?.user.fullname}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                by {hiddenGem?.user.username}
              </div>
              {hiddenGem?.created_at && (
                <div>
                  Uploaded at {new Date(hiddenGem.created_at).toDateString()}
                </div>
              )}
            </div>
            <Badge className="w-fit p-2 rounded-full bg-orange-500">
              {hiddenGem?.category.category_name}
            </Badge>
            <div className="flex gap-3">
              <div className="flex">
                <div
                  className={`icon-[iconamoon--star-fill] w-5 h-5 ${
                    hiddenGem && hiddenGem?.rating >= 1
                      ? "bg-yellow-500"
                      : "bg-gray-300"
                  }`}
                />
                <div
                  className={`icon-[iconamoon--star-fill] w-5 h-5 ${
                    hiddenGem && hiddenGem?.rating >= 2
                      ? "bg-yellow-500"
                      : "bg-gray-300"
                  }`}
                />
                <div
                  className={`icon-[iconamoon--star-fill] w-5 h-5 ${
                    hiddenGem && hiddenGem?.rating >= 3
                      ? "bg-yellow-500"
                      : "bg-gray-300"
                  }`}
                />
                <div
                  className={`icon-[iconamoon--star-fill] w-5 h-5 ${
                    hiddenGem && hiddenGem?.rating >= 4
                      ? "bg-yellow-500"
                      : "bg-gray-300"
                  }`}
                />
                <div
                  className={`icon-[iconamoon--star-fill] w-5 h-5 ${
                    hiddenGem && hiddenGem?.rating >= 5
                      ? "bg-yellow-500"
                      : "bg-gray-300"
                  }`}
                />
              </div>
              <p className="">{hiddenGem?.rating.toFixed(1)}</p>
            </div>
            <p className="text-md">
              Range Price :{" "}
              {hiddenGem?.price_start.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}{" "}
              -{" "}
              {hiddenGem?.price_end.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </p>
            <div className="w-full overflow-hidden">
              <h1 className="text-xl font-semibold">Operational Days</h1>
              <div className="overflow-auto">
                <div className="flex gap-5 w-max mt-3">
                  {hiddenGem?.operation_days.map(
                    (operational: HiddenGemsOperationDay) => (
                      <OperationalDayCard
                        key={operational.day}
                        day={operational.day}
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
              <p>{hiddenGem?.description}</p>
            </div>
            <div className="flex gap-5 justify-end">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    type="button"
                    variant={"ghost"}
                    className="hover:bg-transparent"
                  >
                    Reject
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Give a message</DialogTitle>
                  </DialogHeader>
                  <DialogDescription>
                    <DialogDescription>
                      {token && (
                        <form
                          onSubmit={handleRejectSubmit}
                          className="flex w-full flex-col items-center space-x-2"
                        >
                          <Textarea
                            placeholder="Message"
                            onChange={(
                              e: React.ChangeEvent<HTMLTextAreaElement>
                            ) => setMessage(e.target.value)}
                            value={message}
                          />
                          <div className="flex gap-3 w-full justify-end mt-3">
                            <Button className="bg-orange-500 text-white hover:bg-orange-400">
                              Submit
                            </Button>
                          </div>
                        </form>
                      )}
                    </DialogDescription>
                  </DialogDescription>
                </DialogContent>
              </Dialog>
              <Button
                type="button"
                onClick={handleApprove}
                className="bg-orange-500 text-white hover:bg-orange-400"
              >
                Approve
              </Button>
            </div>
          </>
        )}
      </section>
    </AdminLayout>
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
            <p className="text-md font-semibold">
              {day.charAt(0).toUpperCase() + day.slice(1).toLowerCase()}
            </p>
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

export default HiddenGemsDetail;
