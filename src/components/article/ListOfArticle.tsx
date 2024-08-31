import { useGetArticles } from "@/hooks/article/useGetArticles";
import { Article } from "@/types/Article";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const ListOfArticle = () => {
  const getArticles = useGetArticles();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<Article[]>([]);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    getArticles(
      (articles: Article[]) => {
        setData(articles);
        setIsLoading(false);
      },
      () => {
        console.log("error");
      },
      "page=1&limit=10"
    );
  }, []);

  const fetchMoreData = () => {
    try {
      const newQuery = `page=${page}&limit=10`;

      getArticles(
        (articles: Article[]) => {
          if (articles.length === 0) {
            setHasMore(false);
          }
          setData((prevArticles) => [...prevArticles, ...articles]);
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
      <div
        id="read"
        className="flex flex-col gap-5 w-full max-w-7xl mx-auto px-4"
      >
        {isLoading && <h4 style={{ textAlign: "center" }}>Loading...</h4>}
        {!isLoading && (
          <InfiniteScroll
            dataLength={data.length}
            next={fetchMoreData}
            loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
            hasMore={hasMore}
            scrollThreshold={1}
          >
            <section className="w-full max-w-7xl mx-auto pt-28 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {data.map((article: Article) => (
                <ArticleCard key={article.article_id} article={article} />
              ))}
            </section>
          </InfiniteScroll>
        )}
      </div>
    </>
  );
};

const ArticleCard = ({ article }: { article: Article }) => {
  return (
    <>
      <Link
        to={`/article/${article.article_id}`}
        className="flex flex-col gap-5 rounded-3xl p-5"
      >
        <div>
          <img
            src={article.cover}
            alt=""
            className="w-full h-full max-h-[11rem] object-cover"
          />
        </div>
        <div className="flex flex-col gap-2 ">
          <h2 className="font-semibold text-2xl font-cabinet">
            {article.title}
          </h2>
          <p className="text-left">
            {new Date(article.created_at).toDateString()}
          </p>
          <div className="flex gap-5 items-center">
            <Avatar>
              <AvatarImage
                src={article.user.profile}
                alt={article.user.fullname}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            by {article.user.username}
          </div>
        </div>
      </Link>
    </>
  );
};

export default ListOfArticle;
