import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PostEvent = () => {
  return (
    <>
      <section className="p-5 w-screen max-w-7xl md:h-[40vh] lg:h-[80vh] 2xl:h-[50vh] mx-auto">
        <div className="w-full border h-full rounded-3xl bg-gray-100 grid max-md:grid-cols-1 max-md:grid-rows-2 md:grid-cols-2 md:grid-rows-1 overflow-hidden p-5">
          <div className="relative">
            <img
              src="/images/pablo-heimplatz-ZODcBkEohk8-unsplash.webp"
              alt=""
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="py-5 md:px-5 flex flex-col gap-2 md:justify-center">
            <h1 className="font-semibold text-2xl md:text-5xl">
              Promote your event and get more visitors!
            </h1>
            <p>
              Get Maximum Exposure by Posting Events on Our Platform. Post Event
              Now and Get Your Event Recognized!
            </p>
            <Link to={"/event/post"} className="w-fit">
              <Button className="bg-orange-500 hover:bg-orange-400 ">
                Share
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default PostEvent;
