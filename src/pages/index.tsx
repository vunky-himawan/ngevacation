import FeaturedArticles from "@/components/FeaturedArticles";
import FeaturedHiddenGems from "@/components/FeaturedHiddenGems";
import Hero from "@/components/Hero";
import ListOfEvent from "@/components/ListOfEvents";
import MainLayout from "@/layouts/MainLayout";
import { SEOModel } from "@/models/SEO";

const Index = () => {
  const SEO: SEOModel = {
    title: "Testing",
    description: "Testing",
    siteName: "Hidden Gems",
    siteUrl: "https://hiddengames.com",
    keywords: ["hidden", "games", "vocation", "traveler"],
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
        <ListOfEvent />
        <FeaturedHiddenGems />
        <FeaturedArticles />
      </MainLayout>
    </>
  );
};

export default Index;
