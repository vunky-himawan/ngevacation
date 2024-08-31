import PostEvent from "@/components/event/PostEvent";
import FeaturedArticles from "@/components/article/FeaturedArticles";
import FeaturedHiddenGems from "@/components/hidden-gems/FeaturedHiddenGems";
import Hero from "@/components/Hero";
import PostHiddenGems from "@/components/hidden-gems/PostHiddenGems";
import MainLayout from "@/layouts/MainLayout";
import { SEOModel } from "@/models/SEO";
import FeaturedEvents from "@/components/event/FeaturedEvents";

const Index = () => {
  const SEO: SEOModel = {
    title: "Discover Hidden Gems - Your Ultimate Travel Guide",
    description:
      "Explore lesser-known travel destinations and uncover hidden gems around the world. Share your travel stories, plan your next adventure, and connect with fellow travelers.",
    siteName: "Hidden Gems",
    siteUrl: "https://hiddengems.com",
    keywords: [
      "hidden gems",
      "travel guide",
      "undiscovered destinations",
      "travel stories",
      "adventure planning",
    ],
    type: "website",
  };

  return (
    <>
      <MainLayout SEO={SEO}>
        <Hero
          headline="Find Your Best Adventure in Hidden Gems"
          description={
            "Enjoy breathtaking views and unforgettable experiences in every corner of East Java."
          }
          withButton={true}
          buttonLabel="Explore"
        />
        <FeaturedEvents />
        <PostEvent />
        <FeaturedHiddenGems />
        <PostHiddenGems />
        <FeaturedArticles />
      </MainLayout>
    </>
  );
};

export default Index;
