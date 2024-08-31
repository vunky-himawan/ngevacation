import { useGetArticles } from "@/hooks/article/useGetArticles";
import { Article } from "@/types/Article";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const FeaturedArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const getArticles = useGetArticles();

  useEffect(() => {
    getArticles(
      (data: Article[]) => {
        setArticles(
          data
            .sort(
              (a, b) =>
                new Date(b.updated_at).getTime() -
                new Date(a.updated_at).getTime()
            )
            .splice(0, 5)
        );
        setIsLoading(false);
      },
      () => {
        console.log("error");
      }
    );
  }, []);

  return (
    <>
      <section className="w-full max-w-7xl mx-auto py-10 flex flex-col gap-5">
        <a href="/" className="flex gap-5 items-center justify-between px-4">
          <h1 className="font-semibold text-3xl font-cabinet">Articles</h1>
          <div className="icon-[iconamoon--arrow-right-1-thin] w-7 h-7" />
        </a>
        {isLoading && (
          <Skeleton className="w-full h-[50vh] relative flex justify-center items-center rounded-3xl" />
        )}
        {!isLoading && articles.length > 0 && (
          <div className="w-full relative h-fit 2xl:h-[50vh] flex flex-col gap-5">
            {articles.map((article: Article) => (
              <CardOFArticles
                key={article.article_id + article.title}
                article={article}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

const CardOFArticles = ({ article }: { article: Article }) => {
  return (
    <>
      <Link
        to={`/article/${article.article_id}`}
        className="flex flex-col md:flex-row gap-5 p-5 border-b py-10 my-10"
      >
        <div className="w-full lg:max-w-[200px] md:max-w-[200px] md:max-h-[130px]">
          <img
            src={article.cover}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-cabinet text-2xl font-semibold">
            {article.title}
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            saepe eos unde, ea vitae accusantium doloribus? Minus ut quibusdam
            quae!
          </p>
          <div className="flex gap-8 items-center">
            <div className="flex gap-2 items-center">
              <span className="icon-[ion--sparkles-outline] w-5 h-5"></span>
              <span>{article.count_likes}</span>
            </div>
            <div className="flex gap-2 items-center">
              <span className="icon-[iconamoon--bookmark-light] w-5 h-5"></span>
              <span>{article.count_bookmarks}</span>
            </div>
            <div className="flex gap-2 items-center">
              <span className="icon-[iconamoon--comment-dots-light] w-5 h-5"></span>
              <span>{article.count_comments}</span>
            </div>
          </div>
          <p className="text-left text-sm">
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

export default FeaturedArticles;
