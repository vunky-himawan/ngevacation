import EventForm from "@/components/event/EventPostForm";
import MainLayout from "@/layouts/MainLayout";
import { SEOModel } from "@/models/SEO";

const SEO: SEOModel = {
  title: "Share Your Event - Upload Your Event",
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

const EventPost = () => {
  return (
    <>
      <MainLayout SEO={SEO}>
        <EventForm />
      </MainLayout>
    </>
  );
};

export default EventPost;
