import Loading from "@/components/Skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useArticleBookmark } from "@/hooks/article/useArticleBookmark";
import { useGetBookmarks } from "@/hooks/article/useGetBookmarks";
import MainLayout from "@/layouts/MainLayout";
import { SEOModel } from "@/models/SEO";
import { Article } from "@/types/Article";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SEO: SEOModel = {
  title: "Library",
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

const TravelerLibrary = () => {
  const [bookmarks, setBookmarks] = useState<Article[]>([]);
  const getData = useGetBookmarks();

  useEffect(() => {
    getData({
      onSuccess: (response) => {
        setBookmarks(response.data.data);
      },
      onError: () => {
        console.log("Error");
      },
    });
  }, []);

  if (bookmarks.length === 0) {
    return <Loading />;
  }

  return (
    <>
      <MainLayout SEO={SEO}>
        <section className="w-full max-w-7xl mx-auto mt-28 p-5">
          <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center">
              <h1 className="font-cabinet font-semibold text-5xl">
                Your Bookmarks
              </h1>
            </div>
            <div className="flex flex-col gap-5 mt-5">
              {bookmarks.length === 0 && (
                <p className="text-center text-gray-500">No articles found</p>
              )}
              {bookmarks.map((article: Article) => (
                <Card
                  key={article.article_id}
                  article={article}
                  setBookmarks={setBookmarks}
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
  setBookmarks,
}: {
  article: Article;
  setBookmarks: React.Dispatch<React.SetStateAction<Array<Article>>>;
}) => {
  const del = useArticleBookmark(article.article_id);

  const handleDeleteBookmark = () => {
    del();
    setBookmarks((prev) =>
      prev.filter(
        (prevArticle) => prevArticle.article_id !== article.article_id
      )
    );
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
                  <button
                    type="button"
                    onClick={handleDeleteBookmark}
                    className="w-full text-red-500 p-1 text-left"
                  >
                    Delete Bookmark
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

export default TravelerLibrary;
