import { useGetArticles } from "@/hooks/article/useGetArticles";
import { Article } from "@/types/Article";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { Link } from "react-router-dom";

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
                key={article.article_id}
                article_id={article.article_id}
                title={article.title}
                author={article.user.username}
                uploadedAt={article.updated_at}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

const CardOFArticles = ({
  article_id,
  uploadedAt,
  title,
  author,
}: {
  uploadedAt: string;
  article_id: string;
  title: string;
  author: string;
}) => {
  return (
    <>
      <Link
        to={`/article/${article_id}`}
        className="w-full h-fit flex flex-col gap-2 border-b border-gray-200 pb-5 hover:bg-orange-50 p-4 rounded-xl"
      >
        <div>
          <h1 className="font-medium text-2xl">{title}</h1>
          <p>Created by {author}</p>
        </div>
        <div>{uploadedAt}</div>
      </Link>
    </>
  );
};

export default FeaturedArticles;
