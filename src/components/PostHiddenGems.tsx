import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const PostHiddenGems = () => {
  return (
    <>
      <section className="p-5 w-screen max-w-7xl md:h-[40vh] lg:h-[80vh] 2xl:h-[50vh] mx-auto">
        <div className="w-full border h-full rounded-3xl bg-orange-500 text-white grid max-md:grid-cols-1 max-md:grid-rows-2 md:grid-cols-2 md:grid-rows-1 overflow-hidden">
          <div className="relative">
            <img
              src="/images/antonino-visalli-RNiBLy7aHck-unsplash.webp"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-5 flex flex-col gap-2 md:justify-center">
            <p className="md:text-xl 2xl:text-2xl">
              Discover hidden gems waiting to be explored!
            </p>
            <h1 className="font-cabinet font-bold text-3xl md:text-5xl 2xl:text-7xl">
              Know a secret spot? Share it with the world.
            </h1>
            <p>
              Help others find unique places and boost local tourism. Upload
              your hidden gem today and make it known!
            </p>
            <Link to={"/hidden-gems/post"} className="w-fit">
              <Button className="bg-white rounded-full text-orange-500 hover:bg-gray-100 hover:text-orange-500">
                Upload
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default PostHiddenGems;
