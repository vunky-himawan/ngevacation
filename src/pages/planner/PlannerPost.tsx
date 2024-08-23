import HiddenGemsForm from "@/components/hidden-gems/HiddenGemsForm";
import MainLayout from "@/layouts/MainLayout";
import { SEOModel } from "@/models/SEO";

const SEO: SEOModel = {
  title: "Share Your Plans - Upload Your Travel Story",
  description:
    "Contribute to the Hidden Gems community by sharing your undiscovered travel destinations. Upload photos, provide tips, and inspire others with your unique travel experiences.",
  siteName: "Hidden Gems",
  siteUrl: "https://hiddengems.com/upload",
  keywords: [
    "upload hidden gem",
    "share travel stories",
    "contribute travel tips",
    "upload travel photos",
    "hidden destinations",
  ],
  type: "website",
};

const PlannerPost = () => {
  return (
    <>
      <MainLayout SEO={SEO}>
        <HiddenGemsForm />
      </MainLayout>
    </>
  );
};

export default PlannerPost;
