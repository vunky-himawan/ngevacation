import { useGetHiddenGemById } from "@/hooks/hidden-gems/useGetHiddenGemById";
import MainLayout from "@/layouts/MainLayout";
import { SEOModel } from "@/models/SEO";
import { HiddenGem as HiddenGemModel } from "@/types/HiddenGem/HiddenGems";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { HiddenGemsComment } from "@/types/HiddenGem/HiddenGemComment";
import { HiddenGemsCommentReplies } from "@/types/HiddenGem/HiddenGemCommentReply";
import { usePostComment } from "@/hooks/hidden-gems/comment/usePostComment";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { usePostReplyComment } from "@/hooks/hidden-gems/comment/usePostReplyComment";
import { usePostReplyCommentReply } from "@/hooks/hidden-gems/reply/usePostReplyCommentReply";
import { Skeleton } from "@/components/ui/skeleton";
import { HiddenGemsOperationDay } from "@/types/HiddenGem/HiddenGemOperationDay";

const HiddenGem = () => {
  const { token } = useAuth();
  const { hiddenGemId } = useParams<{ hiddenGemId: string }>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<HiddenGemModel>();
  const [rating, setRating] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const sendComment = usePostComment();
  const getHiddenGem = useGetHiddenGemById();

  const handleReplySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendComment(
      () => {
        toast({
          title: "Comment Successfully",
          description: "Your comment has been successfully posted.",
          duration: 2000,
        });
      },
      () => {
        toast({
          title: "Error",
          description: "Failed to post comment.",
          duration: 2000,
        });
      },
      {
        comment: message,
        hidden_gems_id: hiddenGemId as string,
        token: token as string,
        rating: rating,
      }
    );
    setMessage("");
  };

  const SEO: SEOModel = {
    title: "Hidden Gems",
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
    getHiddenGem(
      hiddenGemId as string,
      (data: HiddenGemModel) => {
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

  useEffect(() => {
    if (isModalOpen) {
      setRating(rating);
    } else {
      setRating(0);
    }
  }, [isModalOpen, rating]);

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
              <div className="flex gap-3">
                <div className="flex">
                  <div
                    className={`icon-[iconamoon--star-fill] w-5 h-5 ${
                      data?.rating >= 1 ? "bg-yellow-500" : "bg-gray-300"
                    }`}
                  />
                  <div
                    className={`icon-[iconamoon--star-fill] w-5 h-5 ${
                      data?.rating >= 2 ? "bg-yellow-500" : "bg-gray-300"
                    }`}
                  />
                  <div
                    className={`icon-[iconamoon--star-fill] w-5 h-5 ${
                      data?.rating >= 3 ? "bg-yellow-500" : "bg-gray-300"
                    }`}
                  />
                  <div
                    className={`icon-[iconamoon--star-fill] w-5 h-5 ${
                      data?.rating >= 4 ? "bg-yellow-500" : "bg-gray-300"
                    }`}
                  />
                  <div
                    className={`icon-[iconamoon--star-fill] w-5 h-5 ${
                      data?.rating >= 5 ? "bg-yellow-500" : "bg-gray-300"
                    }`}
                  />
                </div>
                <p className="">{data?.rating.toFixed(1)}</p>
              </div>
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
                <p>{data?.description}</p>
              </div>
              {!data?.isRated && (
                <div className="w-full h-[20vh] lg:h-[40vh] p-5 flex flex-col justify-center items-center gap-5">
                  <h1 className="text-xl font-semibold">
                    Do you like this hidden gem?
                  </h1>
                  <div className="flex gap-3 items-center">
                    {!token && (
                      <Link
                        to="/auth/login"
                        className="flex gap-3 items-center"
                      >
                        <Button className="bg-orange-500 text-white hover:bg-orange-400">
                          Login to rate
                        </Button>
                      </Link>
                    )}
                    {token && (
                      <Dialog
                        onOpenChange={() => {
                          setIsModalOpen(!isModalOpen);
                        }}
                        open={data?.isRated ? false : isModalOpen}
                      >
                        <DialogTrigger disabled={true} asChild>
                          <div
                            onClick={() => setRating(rating == 1 ? 0 : 1)}
                            className={`icon-[iconamoon--star-fill] w-8 h-8 ${
                              rating >= 1 ? "bg-yellow-500" : "bg-gray-300"
                            }`}
                          />
                        </DialogTrigger>
                        <DialogTrigger disabled={true} asChild>
                          <div
                            onClick={() => setRating(rating == 2 ? 0 : 2)}
                            className={`icon-[iconamoon--star-fill] w-8 h-8 ${
                              rating >= 2 ? "bg-yellow-500" : "bg-gray-300"
                            }`}
                          />
                        </DialogTrigger>
                        <DialogTrigger disabled={true} asChild>
                          <div
                            onClick={() => setRating(rating == 3 ? 0 : 3)}
                            className={`icon-[iconamoon--star-fill] w-8 h-8 ${
                              rating >= 3 ? "bg-yellow-500" : "bg-gray-300"
                            }`}
                          />
                        </DialogTrigger>
                        <DialogTrigger disabled={true} asChild>
                          <div
                            onClick={() => setRating(rating == 4 ? 0 : 4)}
                            className={`icon-[iconamoon--star-fill] w-8 h-8 ${
                              rating >= 4 ? "bg-yellow-500" : "bg-gray-300"
                            }`}
                          />
                        </DialogTrigger>
                        <DialogTrigger disabled={true} asChild>
                          <div
                            onClick={() => setRating(rating == 5 ? 0 : 5)}
                            className={`icon-[iconamoon--star-fill] w-8 h-8 ${
                              rating == 5 ? "bg-yellow-500" : "bg-gray-300"
                            }`}
                          />
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              Do you like this hidden gem?
                            </DialogTitle>
                          </DialogHeader>
                          <DialogDescription>
                            <DialogDescription>
                              {token && (
                                <form
                                  onSubmit={handleReplySubmit}
                                  className="flex w-full flex-col items-center space-x-2"
                                >
                                  <Textarea
                                    placeholder="Comment"
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
                    )}
                  </div>
                </div>
              )}

              {data && data?.comment.length > 0 && (
                <>
                  <Comment
                    hiddenGemId={hiddenGemId as string}
                    comments={data?.comment}
                  />
                </>
              )}
            </>
          )}
        </section>
      </MainLayout>
    </>
  );
};

const Comment = ({
  comments,
  hiddenGemId,
}: {
  comments: HiddenGemsComment[];
  hiddenGemId: string;
}) => {
  const { token } = useAuth();

  return (
    <>
      <section>
        <div className="flex justify-between items-center">
          <h1 className="font-cabinet font-semibold text-2xl">Reviews</h1>
          <p>{comments.length} Reviews</p>
        </div>
        <div className="flex flex-col gap-5 mt-5">
          {comments.map((comment) => (
            <CommentItem
              key={comment.comment_id}
              comment={comment}
              token={token as string}
              hiddenGemId={hiddenGemId}
            />
          ))}
        </div>
      </section>
    </>
  );
};

const CommentItem = ({
  comment,
  hiddenGemId,
  token,
}: {
  hiddenGemId: string;
  comment: HiddenGemsComment;
  token: string;
}) => {
  const [replyIsOpen, setReplyIsOpen] = useState<boolean>(false);

  return (
    <div className="relative">
      <CommentCard
        hiddenGemId={hiddenGemId}
        replyIsOpen={replyIsOpen}
        setReplyIsOpen={setReplyIsOpen}
        comment={comment}
        token={token}
      />
      <div className="ml-10 md:ml-20 mt-3 flex flex-col gap-5">
        {replyIsOpen &&
          comment?.replies?.map((reply) => (
            <ReplyCard
              key={reply.reply_id}
              comment={reply}
              parentId={reply.reply_id}
              commentId={comment.comment_id}
              hiddenGemId={hiddenGemId}
              token={token}
            />
          ))}
      </div>
    </div>
  );
};

const CommentCard = ({
  hiddenGemId,
  comment,
  setReplyIsOpen,
  replyIsOpen,
  token,
}: {
  comment: HiddenGemsComment;
  hiddenGemId: string;
  token: string;
  replyIsOpen: boolean;
  setReplyIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isOpenReply, setIsOpenReply] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const sendReplyComment = usePostReplyComment();

  const handleReplySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendReplyComment(
      () => {
        toast({
          title: "Comment Successfully",
          description: "Your comment has been successfully posted.",
          duration: 2000,
        });
      },
      () => {
        toast({
          title: "Error",
          description: "Failed to post comment.",
          duration: 2000,
        });
      },
      {
        comment: message,
        hidden_gems_id: hiddenGemId as string,
        token: token as string,
        parent_id: comment.comment_id,
      }
    );
    setMessage("");
    setIsOpenReply(false);
  };

  return (
    <>
      <div className="flex flex-col gap-5 p-5 border rounded-md">
        <div className="flex gap-5 justify-between items-center">
          <div className="flex gap-5 items-center text-gray-500 text-sm">
            <Avatar className="w-10 h-10">
              <AvatarImage
                src={comment.user.profile}
                alt={comment.user.fullname}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <p>{comment.user.username}</p>
              <p>{new Date(comment.created_at).toDateString()}</p>
            </div>
          </div>
          <button>
            <span className="icon-[iconamoon--menu-kebab-horizontal] w-8 h-8"></span>
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex">
            <div
              className={`icon-[iconamoon--star-fill] w-5 h-5 ${
                comment.rating >= 1 ? "bg-yellow-500" : "bg-gray-300"
              }`}
            />
            <div
              className={`icon-[iconamoon--star-fill] w-5 h-5 ${
                comment.rating >= 2 ? "bg-yellow-500" : "bg-gray-300"
              }`}
            />
            <div
              className={`icon-[iconamoon--star-fill] w-5 h-5 ${
                comment.rating >= 3 ? "bg-yellow-500" : "bg-gray-300"
              }`}
            />
            <div
              className={`icon-[iconamoon--star-fill] w-5 h-5 ${
                comment.rating >= 4 ? "bg-yellow-500" : "bg-gray-300"
              }`}
            />
            <div
              className={`icon-[iconamoon--star-fill] w-5 h-5 ${
                comment.rating >= 5 ? "bg-yellow-500" : "bg-gray-300"
              }`}
            />
          </div>
          <p>{comment.comment}</p>
        </div>
        <div className="flex gap-10 items-center">
          <div className="flex gap-3 items-center">
            <button onClick={() => setReplyIsOpen(!replyIsOpen)}>
              <span className="icon-[iconamoon--comment-dots-light] w-6 h-6"></span>
            </button>
            {comment?.replies?.length}
          </div>
          <div className="flex gap-3 items-center">
            {token && (
              <button onClick={() => setIsOpenReply(!isOpenReply)}>
                Reply
              </button>
            )}
          </div>
        </div>
        {isOpenReply && (
          <form
            onSubmit={handleReplySubmit}
            className="flex w-full  items-center space-x-2"
          >
            <Input
              type="text"
              placeholder="Reply"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              type="submit"
              className="bg-transparent shadow-none text-black p-0 flex items-center gap-2 justify-center text-sm hover:bg-transparent"
            >
              <span className="icon-[iconamoon--send-light] w-6 h-6"></span>
            </Button>
          </form>
        )}
      </div>
    </>
  );
};

const ReplyCard = ({
  comment,
  hiddenGemId,
  token,
  parentId,
  commentId,
}: {
  comment: HiddenGemsCommentReplies;
  hiddenGemId: string;
  token: string;
  parentId: string;
  commentId: string;
}) => {
  const [isOpenReply, setIsOpenReply] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const postReplyCommentReply = usePostReplyCommentReply();

  const handleReplySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postReplyCommentReply(
      () => {
        toast({
          title: "Comment Successfully",
          description: "Your comment has been successfully posted.",
          duration: 2000,
        });
      },
      () => {
        toast({
          title: "Error",
          description: "Failed to post comment.",
          duration: 2000,
        });
      },
      {
        comment: message,
        hidden_gems_id: hiddenGemId as string,
        token: token as string,
        parent_id: parentId,
        comment_id: commentId,
      }
    );
    setMessage("");
    setIsOpenReply(false);
  };

  return (
    <>
      <div className="flex flex-col gap-5 p-5 border rounded-md">
        <div className="flex gap-5 justify-between items-center">
          <div className="flex gap-5 items-center text-gray-500 text-sm">
            <Avatar className="w-10 h-10">
              <AvatarImage
                src={comment.user.profile}
                alt={comment.user.fullname}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <p>{comment.user.username}</p>
              <p>{new Date(comment.created_at).toDateString()}</p>
            </div>
          </div>
          <button>
            <span className="icon-[iconamoon--menu-kebab-horizontal] w-8 h-8"></span>
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <p>{comment.comment}</p>
        </div>
        <div className="flex gap-10 items-center">
          <div className="flex gap-3 items-center">
            <button onClick={() => setIsOpenReply(!isOpenReply)}>Reply</button>
          </div>
        </div>
        {isOpenReply && (
          <form
            onSubmit={handleReplySubmit}
            className="flex w-full  items-center space-x-2"
          >
            <Input
              type="text"
              placeholder="Reply"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              type="submit"
              className="bg-transparent shadow-none text-black p-0 flex items-center gap-2 justify-center text-sm hover:bg-transparent"
            >
              <span className="icon-[iconamoon--send-light] w-6 h-6"></span>
            </Button>
          </form>
        )}
      </div>
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

export default HiddenGem;
