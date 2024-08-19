import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PostEvent = () => {
  return (
    <>
      <section className="p-5 w-screen max-w-7xl md:h-[40vh] lg:h-[80vh] 2xl:h-[50vh] mx-auto">
        <div className="w-full h-full rounded-3xl text-white grid max-md:grid-cols-1 gap-5 max-md:grid-rows-2 md:grid-cols-2 md:grid-rows-1 overflow-hidden">
          <div className="relative">
            <img
              src="/images/pablo-heimplatz-ZODcBkEohk8-unsplash.webp"
              alt=""
              className="w-full h-full object-cover rounded-3xl"
            />
          </div>
          <div className="flex flex-col gap-2 md:justify-center">
            <div className="relative w-full h-full bg-orange-500 rounded-3xl">
              <div className="w-full h-full rounded-3xl text-white p-5 flex flex-col gap-5 md:justify-center relative z-20">
                <h1 className="font-cabinet font-semibold text-3xl md:text-5xl 2xl:text-7xl">
                  Promote your event and get more visitors!
                </h1>
                <p>
                  Get Maximum Exposure by Posting Events on Our Platform. Post
                  Event Now and Get Your Event Recognized!
                </p>
                <Link to={"/event/post"} className="w-fit">
                  <Button className="bg-white rounded-full text-orange-500 hover:bg-gray-100 hover:text-orange-500">
                    Share
                  </Button>
                </Link>
              </div>
              <div className="absolute -bottom-20 left-0 rounded-3xl">
                <img
                  src="/images/scribbles-scribbles-32.svg"
                  alt=""
                  className="object-cover rounded-3xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PostEvent;
