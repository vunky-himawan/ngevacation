import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetArticles } from "@/hooks/article/useGetArticles";
import MainLayout from "@/layouts/MainLayout";
import { SEOModel } from "@/models/SEO";
import { Article } from "@/types/Article";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const ArticleSearchResult = () => {
  const [searchParams] = useSearchParams();
  const getArticles = useGetArticles();
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    getArticles(
      (articles: Article[]) => {
        setArticles(articles);
      },
      () => {
        console.log("error");
      },
      `s=${searchParams.get("s")}`
    );
  });

  const SEO: SEOModel = {
    title: "Articles",
    description:
      "Explore a variety of captivating articles that uncover hidden destinations and unique experiences for travelers. Find inspiration for your next journey on Hidden Gems.",
    siteName: "Hidden Gems",
    siteUrl: "https://hiddengames.com/articles",
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
      <MainLayout withSearch={true} SEO={SEO}>
        <div className="w-full max-w-7xl mx-auto pt-28 px-5">
          <section className="flex gap-5 w-full max-w-7xl mx-auto">
            <h1 className="font-cabinet text-4xl md:text-5xl font-semibold text-gray-500">
              Search Result{" "}
              <span className="text-black">{searchParams.get("s")}</span>
            </h1>
          </section>
          <section>
            {articles &&
              articles.map((article: Article) => (
                <ArticleSearchResultCard
                  key={article.article_id}
                  article={article}
                />
              ))}
          </section>
        </div>
      </MainLayout>
    </>
  );
};

const ArticleSearchResultCard = ({ article }: { article: Article }) => {
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

export default ArticleSearchResult;
