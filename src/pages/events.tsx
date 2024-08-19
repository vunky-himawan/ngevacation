import EventHero from "@/components/event/EventHero";
import ListOfEvent from "@/components/event/ListOfEvent";
import MainLayout from "@/layouts/MainLayout";
import { SEOModel } from "@/models/SEO";

const SEO: SEOModel = {
  title: "Events",
  description:
    "Explore a variety of captivating events that uncover hidden destinations and unique experiences for travelers. Find inspiration for your next adventure on Hidden Gems.",
  siteName: "Hidden Gems",
  siteUrl: "https://hiddengames.com/events",
  keywords: [
    "hidden gems",
    "travel events",
    "hidden destinations",
    "travel tips",
    "travel experiences",
  ],
  type: "website",
};

const Events = () => {
  return (
    <>
      <MainLayout SEO={SEO}>
        <EventHero />
        <ListOfEvent />
      </MainLayout>
    </>
  );
};

export default Events;
