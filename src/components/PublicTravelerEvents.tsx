import { SwiperSlide, useSwiper, Swiper } from "swiper/react";
import "swiper/css";
// import { Swiper as SwiperType } from "swiper/types";

const PublicTravelerEvents = () => {
  return (
    <>
      <section className="w-full max-w-7xl mx-auto px-4 py-10 flex flex-col gap-5">
        <a href="/" className="flex gap-5 items-center">
          <h1 className="font-semibold text-3xl font-cabinet">
            Public Traveler Events
          </h1>
          <div className="i-iconamoon:arrow-right-1-thin w-10 h-10" />
        </a>
        <div className="w-full relative">
          <Swiper
            slidesPerView={1}
            className="w-full h-70vh relative flex justify-center items-center"
          >
            <SwiperButton />
            <SwiperSlide className="border h-full bg-black/30 !flex !justify-center !items-center w-full">
              Event 1
            </SwiperSlide>
            <SwiperSlide className="border h-full bg-black/30 !flex !justify-center !items-center w-full">
              Event 2
            </SwiperSlide>
            <SwiperSlide className="border h-full bg-black/30 !flex !justify-center !items-center w-full">
              Event 3
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </>
  );
};

const SwiperButton = () => {
  const swiper = useSwiper();

  return (
    <>
      <div className="flex justify-between items-center w-full absolute z-2 top-1/2 transform -translate-y-1/2 px-5">
        <button
          onClick={() => swiper.slidePrev()}
          className="bg-black/40 rounded-full p-1"
        >
          <div className="i-iconamoon:arrow-left-2-thin w-13 h-13 text-white" />
        </button>
        <button
          onClick={() => swiper.slideNext()}
          className="bg-black/40 rounded-full p-1"
        >
          <div className="i-iconamoon:arrow-right-2-thin w-13 h-13 text-white" />
        </button>
      </div>
    </>
  );
};

export default PublicTravelerEvents;
