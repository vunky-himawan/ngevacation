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
import { useDeleteArticle } from "@/hooks/article/useDeleteArticle";
import { useGetArticles } from "@/hooks/article/useGetArticles";
import { useGetUser } from "@/hooks/useGetUser";
import MainLayout from "@/layouts/MainLayout";
import { SEOModel } from "@/models/SEO";
import { Article } from "@/types/Article";
import { User } from "@/types/User";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SEO: SEOModel = {
  title: "Articles",
  description:
    "Explore a variety of captivating articles that uncover hidden destinations and unique experiences for travelers. Find inspiration for your next journey on Hidden Gems.",
  siteName: "Hidden Gems",
  siteUrl: "https://hiddengems.com/articles",
  keywords: [
    "hidden gems",
    "travel articles",
    "hidden destinations",
    "travel tips",
    "travel experiences",
  ],
  type: "website",
};

const TravelerArticles = () => {
  const { token } = useAuth();
  const getUser = useGetUser();
  const [user, setUser] = useState<User | undefined>(undefined);
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">("PUBLISHED");
  const [search, setSearch] = useState("");
  const getArticles = useGetArticles();
  const [articles, setArticles] = useState<Article[]>([]);

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
      getArticles(
        (data: Article[]) => {
          setArticles(data);
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
            <div className="flex justify-between items-center">
              <h1 className="font-cabinet font-semibold text-5xl">
                Your Articles
              </h1>
              <Link to={"/traveler/write"}>
                <Button className="bg-orange-500 rounded-full hover:bg-orange-400">
                  Write Article
                </Button>
              </Link>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-5 items-center">
                <button
                  onClick={() => setStatus("PUBLISHED")}
                  className={`p-3 ${
                    status === "PUBLISHED" ? "border-b border-black" : ""
                  }`}
                >
                  Publised
                </button>
                <button
                  onClick={() => setStatus("DRAFT")}
                  className={`p-3 ${
                    status === "DRAFT" ? "border-b border-black" : ""
                  }`}
                >
                  Draft
                </button>
              </div>
              <Input
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search Articles"
                className="w-[20rem]"
              />
            </div>
            <div className="flex flex-col gap-5 mt-5">
              {articles.length === 0 && (
                <p className="text-center text-gray-500">No articles found</p>
              )}
              {articles.map((article: Article) => (
                <Card
                  key={article.article_id}
                  article={article}
                  setArticles={setArticles}
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
  article,
  setArticles,
}: {
  article: Article;
  setArticles: React.Dispatch<React.SetStateAction<Array<Article>>>;
}) => {
  const del = useDeleteArticle(article.article_id);

  const handleDelete = () => {
    del({
      onSuccess: () =>
        setArticles((prev) =>
          prev.filter(
            (prevArticle) => prevArticle.article_id !== article.article_id
          )
        ),
    });
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-5 pb-5 border-b">
        <Link to={`/article/${article.article_id}`}>
          <div className="w-full lg:max-w-[200px] md:max-w-[200px] md:max-h-[130px]">
            <img
              src={article.cover}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
        <div className="flex flex-col gap-2">
          <Link to={`/article/${article.article_id}`}>
            <h1 className="font-cabinet text-2xl font-semibold">
              {article.title}
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
              saepe eos unde, ea vitae accusantium doloribus? Minus ut quibusdam
              quae!
            </p>
          </Link>
          <p className="text-left text-sm">
            {new Date(article.created_at).toDateString()}
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
            <DropdownMenu>
              <div className="flex gap-2 items-center cursor-pointer">
                <DropdownMenuTrigger asChild>
                  <span className="icon-[iconamoon--menu-kebab-horizontal] w-5 h-5"></span>
                </DropdownMenuTrigger>
              </div>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link
                    to={`/traveler/article/${article.article_id}/edit`}
                    className="w-full p-1 text-left"
                  >
                    Edit
                  </Link>
                </DropdownMenuItem>
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
export default TravelerArticles;
