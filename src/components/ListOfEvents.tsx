import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";

const ListOfEvent = () => {
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
            className="w-full h-70vh relative flex justify-center items-center rounded-3xl"
          >
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

export default ListOfEvent;
