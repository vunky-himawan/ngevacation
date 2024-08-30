import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { useArticleBookmark } from "@/hooks/article/useArticleBookmark";
import { useArticleLike } from "@/hooks/article/useArticleLike";
import { useCommentLike } from "@/hooks/article/comment/useCommentLike";
import { useGetArticle } from "@/hooks/article/useGetArticle";
import { useReplyCommentLike } from "@/hooks/article/reply/useReplyCommentLike";
import { useReplyCommentReply } from "@/hooks/article/comment/useReplyCommentReply";
import { useReplyCommentReplyTheReply } from "@/hooks/article/reply/useReplyCommentReplyTheReply";
import MainLayout from "@/layouts/MainLayout";
import { SEOModel } from "@/models/SEO";
import { Article } from "@/types/Article";
import { Comment } from "@/types/Comment";
import { ReplyComment } from "@/types/ReplyComment";
import { decode } from "@/utils/decode";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCommentArticle } from "@/hooks/article/comment/useComment";
import { Skeleton } from "@/components/ui/skeleton";
import { toast as sooner } from "sonner";

interface ArticleDetail extends Article {
  count_views: number;
  count_likes: number;
  marked_bookmark: boolean;
  marked_like: boolean;
  comment: Array<Comment>;
}

const ArticleDetail = () => {
  const { token } = useAuth();
  const { articleId } = useParams();
  const getArticle = useGetArticle();
  const [articleData, setArticleData] = useState<ArticleDetail>();
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const [bookmarks, setBookmarks] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(0);
  const [comments, setComments] = useState<Array<Comment>>([]);
  const [onSendComment, setOnSendComment] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getArticle(
      (data: ArticleDetail) => {
        setArticleData(data);
        setBookmarked(data.marked_bookmark);
        setLiked(data.marked_like);
        setLikes(data.count_likes);
        setComments(data.comment);
        setBookmarks(data.count_bookmarks);
        setOnSendComment(false);
        setIsLoading(false);
      },
      () => {},
      articleId as string,
      token as string
    );
  }, [onSendComment]);

  const handleLike = useArticleLike(
    articleData?.article_id as string,
    token as string
  );

  const handleBookmark = useArticleBookmark(articleData?.article_id as string);

  const SEO: SEOModel = {
    title: articleData?.title || "",
    description: decode(articleData?.content || ""),
    siteName: "Hidden Gems",
    siteUrl: `https://hiddengems.com/article/${articleData?.article_id}`,
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
      <MainLayout SEO={SEO} withSearch={true}>
        {isLoading && (
          <div className="mx-auto w-full lg:max-w-6xl 2xl:max-w-7xl mt-24 p-5 flex flex-col gap-5">
            <div className="w-full relative flex flex-col gap-5 justify-center rounded-3xl">
              <Skeleton className="w-full h-[50vh] relative flex justify-center items-center rounded-3xl" />
              <Skeleton className="w-full h-[1rem] relative flex justify-center items-center rounded-3xl" />
              <Skeleton className="w-full h-[1rem] relative flex justify-center items-center rounded-3xl" />
              <Skeleton className="w-full h-[1rem] relative flex justify-center items-center rounded-3xl" />
              <Skeleton className="w-full h-[1rem] relative flex justify-center items-center rounded-3xl" />
            </div>
          </div>
        )}
        {!isLoading && articleData && (
          <article className="mx-auto w-full lg:max-w-6xl 2xl:max-w-7xl mt-24 p-5 flex flex-col gap-5">
            <img
              src={articleData.cover}
              alt=""
              className="w-full h-full rounded-3xl"
            />
            <h1 className="font-cabinet font-semibold text-5xl">
              {articleData.title}
            </h1>
            <div>{new Date(articleData.created_at).toDateString()}</div>
            <div className="flex gap-5 items-center">
              <Avatar>
                <AvatarImage
                  src={articleData.user.profile}
                  alt={articleData.user.fullname}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              by {articleData.user.username}
            </div>
            <div className="border-b border-yellow-500 pb-5 flex gap-10">
              <Button
                onClick={() => {
                  setLikes(liked ? likes - 1 : likes + 1);
                  setLiked(!liked);
                  handleLike();
                }}
                className="bg-transparent shadow-none text-black p-0 flex items-center gap-2 justify-center text-sm hover:bg-transparent"
              >
                {liked ? (
                  <span className="icon-[ion--sparkles] w-6 h-6"></span>
                ) : (
                  <span className="icon-[ion--sparkles-outline] w-6 h-6"></span>
                )}
                {likes}
              </Button>
              <Button
                onClick={handleBookmark}
                className="bg-transparent shadow-none text-black p-0 flex items-center gap-2 justify-center text-sm hover:bg-transparent"
              >
                {bookmarked ? (
                  <span className="icon-[iconamoon--bookmark-fill] w-7 h-7"></span>
                ) : (
                  <span className="icon-[iconamoon--bookmark-light] w-7 h-7"></span>
                )}
                {bookmarks}
              </Button>
              {/* <div className="bg-transparent shadow-none text-black p-0 flex items-center gap-2 justify-center text-sm">
              <span className="icon-[iconamoon--eye-light] w-7 h-7"></span>
              {articleData.count_views}
            </div> */}
            </div>
            <div
              className="prose prose-xl mx-auto w-full max-w-7xl"
              dangerouslySetInnerHTML={{ __html: articleData.content }}
            ></div>
            <div>
              <h1 className="font-cabinet font-semibold text-2xl">Tags</h1>
              <div className="flex gap-5 items-center flex-wrap mt-2">
                {articleData.tag.map((tag: string) => (
                  <Link to={`/articles/tag/${tag}`} key={tag}>
                    <Badge
                      key={tag}
                      className="text-black bg-muted font-normal hover:bg-gray-200"
                    >
                      #{tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
            <hr />
            <ArticleComment
              setOnSendComment={setOnSendComment}
              articleId={articleId as string}
              comments={comments}
            />
          </article>
        )}
      </MainLayout>
    </>
  );
};

const ArticleComment = ({
  comments,
  articleId,
  setOnSendComment,
}: {
  comments: Array<Comment>;
  articleId: string;
  setOnSendComment: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { token } = useAuth();
  const [message, setMessage] = useState<string>("");
  const sendComment = useCommentArticle();

  const handleReplySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendComment({
      onSuccess: () => {
        sooner("Comment Successfully sent!", {
          duration: 1000,
        });
        setOnSendComment(true);
        setMessage("");
      },
      onError: (message: string) => {
        sooner(message, {
          duration: 1000,
        });
      },
      data: {
        articleId,
        comment: message,
        token: token as string,
      },
    });
  };

  return (
    <>
      <section>
        <div className="flex justify-between items-center">
          <h1 className="font-cabinet font-semibold text-2xl">Comments</h1>
          <p>{comments.length} Comments</p>
        </div>
        <div className="flex flex-col gap-5 mt-5">
          {token && (
            <form
              onSubmit={handleReplySubmit}
              className="flex w-full  items-center space-x-2"
            >
              <Input
                type="text"
                placeholder="Comment"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setMessage(e.target.value)
                }
                value={message}
              />
              <Button
                type="submit"
                className="bg-transparent shadow-none text-black p-0 flex items-center gap-2 justify-center text-sm hover:bg-transparent"
              >
                <span className="icon-[iconamoon--send-light] w-6 h-6"></span>
              </Button>
            </form>
          )}
          {comments.map((comment) => (
            <ArticleCommentItem
              key={comment.comment_id}
              comment={comment}
              token={token as string}
              articleId={articleId}
            />
          ))}
        </div>
      </section>
    </>
  );
};

const ArticleCommentItem = ({
  comment,
  articleId,
  token,
}: {
  articleId: string;
  comment: Comment;
  token: string;
}) => {
  const [replyIsOpen, setReplyIsOpen] = useState<boolean>(false);

  return (
    <div className="relative">
      <CommentCard
        articleId={articleId}
        replyIsOpen={replyIsOpen}
        setReplyIsOpen={setReplyIsOpen}
        comment={comment}
        token={token}
      />
      <div className="ml-10 md:ml-20 mt-3 flex flex-col gap-5">
        {replyIsOpen &&
          comment.replies.map((reply) => (
            <ReplyCard
              key={reply.reply_id}
              comment={reply}
              parentId={reply.reply_id}
              commentId={comment.comment_id}
              articleId={articleId}
              token={token}
            />
          ))}
      </div>
    </div>
  );
};

const CommentCard = ({
  articleId,
  comment,
  setReplyIsOpen,
  replyIsOpen,
  token,
}: {
  comment: Comment;
  articleId: string;
  token: string;
  replyIsOpen: boolean;
  setReplyIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isOpenReply, setIsOpenReply] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isLiked, setIsLiked] = useState<boolean>(comment.marked_like);
  const [countLike, setCountLike] = useState<number>(comment.count_like);

  const handleCommentLike = useCommentLike();

  const sendReplyComment = useReplyCommentReply();

  const handleReplySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendReplyComment({
      onSuccess: () => {
        sooner("Comment Successfully sent!", {
          duration: 1000,
        });
      },
      onError: (message: string) => {
        sooner(message, {
          duration: 1000,
        });
      },
      data: {
        articleId,
        comment: message,
        commentId: comment.comment_id,
      },
    });
    setMessage("");
    setIsOpenReply(false);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setCountLike(isLiked ? countLike - 1 : countLike + 1);
    handleCommentLike({
      onSuccess: () => {
        sooner("Comment Successfully liked!", {
          duration: 1000,
        });
      },
      onError: (message: string) => {
        sooner(message, {
          duration: 1000,
        });
      },
      data: {
        articleId,
        commentId: comment.comment_id,
      },
    });
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
            <button onClick={handleLike}>
              {isLiked ? (
                <span className="icon-[ion--sparkles] w-6 h-6"></span>
              ) : (
                <span className="icon-[ion--sparkles-outline] w-6 h-6"></span>
              )}
            </button>
            <p>{countLike}</p>
          </div>
          <div className="flex gap-3 items-center">
            <button onClick={() => setReplyIsOpen(!replyIsOpen)}>
              <span className="icon-[iconamoon--comment-dots-light] w-6 h-6"></span>
            </button>
            {comment.replies.length}
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
  articleId,
  parentId,
  commentId,
}: {
  comment: ReplyComment;
  articleId: string;
  token: string;
  parentId: string;
  commentId: string;
}) => {
  const [isOpenReply, setIsOpenReply] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isLiked, setIsLiked] = useState<boolean>(comment.marked_like);
  const [countLike, setCountLike] = useState<number>(comment.count_like);

  const handleReplyLike = useReplyCommentLike();

  const sendReplyComment = useReplyCommentReplyTheReply();

  const handleReplySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendReplyComment({
      onSuccess: () => {
        sooner("Comment Successfully sent!", {
          duration: 1000,
        });
      },
      onError: (message: string) => {
        sooner(message, {
          duration: 1000,
        });
      },
      data: {
        articleId,
        comment: message,
        commentId: commentId,
        parentId: parentId,
      },
    });
    setMessage("");
    setIsOpenReply(false);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setCountLike(isLiked ? countLike - 1 : countLike + 1);
    handleReplyLike({
      onSuccess: () => {
        sooner("Comment Successfully liked!", {
          duration: 1000,
        });
      },
      onError: (message: string) => {
        sooner(message, {
          duration: 1000,
        });
      },
      data: {
        articleId,
        parentId,
        replyId: comment.reply_id,
      },
    });
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
            <button onClick={handleLike}>
              {isLiked ? (
                <span className="icon-[ion--sparkles] w-6 h-6"></span>
              ) : (
                <span className="icon-[ion--sparkles-outline] w-6 h-6"></span>
              )}
            </button>
            <p>{countLike}</p>
          </div>
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

export default ArticleDetail;
