import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { sources } from "../../../data/sources";

const Sources = () => {
  return (
    <div className="pt-40 overflow-hidden js-section-slider">
      <Swiper
      dir="ltr"
        spaceBetween={30}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".js-places-next",
          prevEl: ".js-places-prev",
        }}
        pagination={{
          el: ".js-places-pag",
          clickable: true,
        }}
        breakpoints={{
          540: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 22,
          },
          1024: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 5,
          },
        }}
      >
        {sources.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              className="citiesCard -type-2"
              data-aos="fade"
              data-aos-delay={item.delayAnimation}
            >
              <div className="citiesCard__image rounded-4">
                <img
                  className="rounded-4 js-lazy"
                  src={item.img}
                  alt="image"
                />
              </div>
              <div className="citiesCard__content mt-10">
                <h4 className="text-18 lh-13 fw-500 text-dark-1 text-center">
                  {item.title}
                </h4>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Sources;
