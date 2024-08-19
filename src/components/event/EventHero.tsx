import { Button } from "../ui/button";

const EventHero = () => {
  return (
    <>
      <section className="w-screen min-h-screen max-md:h-[150vh] lg:max-2xl:h-[130vh] 2xl:h-screen flex flex-col justify-center items-center bg-sky-50 pt-20 max-md:pt-24">
        <div className="h-[40%] p-10 2xl:p-14 flex flex-col gap-3 items-center justify-center max-w-6xl 2xl:max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold text-center text-black font-cabinet">
            Curate the best events in every corner of the city, from the popular
            to the exclusive.
          </h1>
          <p className="text-center text-black max-w-4xl mx-auto">
            Easy access to complete information, from dates to locations, all in
            one place. Enjoy a fun and memorable experience by attending events
            that suit your interests.
          </p>
          <p>Find the nearest event and book your tickets immediately!</p>
          <Button className="bg-orange-500 rounded-full hover:bg-orange-600">
            <a href="#events">Find Events</a>
          </Button>
        </div>
        <div className="flex-1 pl-10 lg:pr-10 relative w-full 2xl:max-w-7xl max-w-6xl overflow-hidden ">
          <div className="bg-gradient-to-t from-sky-50 to-transparent h-full w-full absolute top-0 left-0 z-10"></div>
          <div className="h-full w-full border-[3px] border-gray-200 rounded-2xl overflow-hidden max-lg:absolute top-0 left-10">
            <img
              src="/images/pablo-heimplatz-ZODcBkEohk8-unsplash.webp"
              alt=""
              className="w-full h-full object-cover object-bottom"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default EventHero;
