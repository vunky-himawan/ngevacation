import HiddenGemsHero from "@/components/hidden-gems/HiddenGemsHero";
import ListOfHiddenGems from "@/components/hidden-gems/ListOfHiddenGems";
import MainLayout from "@/layouts/MainLayout";
import { SEOModel } from "@/models/SEO";

const SEO: SEOModel = {
  title: "Hidden Gems",
  description:
    "Discover hidden gems and lesser-known destinations around the world. Unveil unique travel spots that offer unforgettable experiences for adventurous travelers.",
  siteName: "Hidden Gems",
  siteUrl: "https://hiddengems.com/hidden-gems",
  keywords: [
    "hidden gems",
    "undiscovered destinations",
    "off the beaten path",
    "secret travel spots",
    "unique experiences",
  ],
  type: "website",
};

const HiddenGems = () => {
  return (
    <>
      <MainLayout
        SEO={SEO}
        withSearch={true}
        searchPlaceholder="Search Hidden Gems"
      >
        <HiddenGemsHero />
        <ListOfHiddenGems />
      </MainLayout>
    </>
  );
};

export default HiddenGems;
