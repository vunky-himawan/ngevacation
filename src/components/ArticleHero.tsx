import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const ArticleHero = () => {
  return (
    <>
      <section className="w-screen h-screen max-md:h-[120vh] lg:max-2xl:h-[130vh] flex flex-col justify-center items-center bg-sky-50 pt-20">
        <div className="h-[40%] p-10 2xl:p-14 flex flex-col gap-5 items-center justify-center max-w-6xl 2xl:max-w-7xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold text-center text-black font-cabinet">
            Explore the World Through Stories and Tips from Fellow Travelers!
          </h1>
          <p className="text-center text-black">
            Read authentic travel experiences or contribute your own insights.
            Join a community where every adventure is a story waiting to be
            told.
          </p>
          <div className="flex gap-5 justify-center items-center">
            <Button className="bg-orange-500 px-10 rounded-full hover:bg-orange-600">
              <a href="#read">Read</a>
            </Button>
            <Button className="bg-transparent border border-orange-500 text-black px-10 rounded-full hover:bg-orange-500 hover:text-white">
              <Link to="/traveler/write">Write</Link>
            </Button>
          </div>
        </div>
        <div className="flex-1 pl-10 lg:pr-10 relative w-full 2xl:max-w-7xl max-w-6xl overflow-hidden ">
          <div className="bg-gradient-to-t from-sky-50 to-transparent h-full w-full absolute top-0 left-0 z-10"></div>
          <div className="h-full w-full border-[3px] border-gray-200 rounded-2xl overflow-hidden max-lg:absolute top-0 left-10">
            <img
              src="/images/article-hero-1.png"
              alt=""
              className="w-full h-full object-cover object-left-top"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default ArticleHero;
