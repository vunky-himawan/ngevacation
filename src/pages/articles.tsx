import ArticleHero from "@/components/ArticleHero";
import ListOfArticle from "@/components/ListOfArticle";
import MainLayout from "@/layouts/MainLayout";
import { SEOModel } from "@/models/SEO";

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

const Articles = () => {
  return (
    <>
      <MainLayout withSearch={true} SEO={SEO}>
        <ArticleHero />
        <ListOfArticle />
      </MainLayout>
    </>
  );
};

export default Articles;
