import MainLayout from "@/layouts/MainLayout";
import { SEOModel } from "@/models/SEO";

const Index = () => {
  const SEO: SEOModel = {
    title: "Testing",
    description: "Testing",
    thumbnail: "Testing",
    siteName: "Hidden Gems",
    siteUrl: "https://hiddengames.com",
    keywords: ["hidden", "games", "vocation", "traveler"],
    type: "website",
  };

  return (
    <>
      <MainLayout SEO={SEO}>
        <h1>Testing</h1>
      </MainLayout>
    </>
  );
};

export default Index;
