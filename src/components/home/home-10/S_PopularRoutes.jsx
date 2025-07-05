// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { LanguageContext } from "@/i18n/LanguageProvider";

const PopularRoutes = ({ cars, condition, tag }) => {

  const { lang } = useContext(LanguageContext)

  return (
    <>
      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        loop={true}
        navigation={{
          nextEl: ".js-routes-routes_next_"+condition,
          prevEl: ".js-routes-routes_prev_"+condition,
        }}
        breakpoints={{
          500: {
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
            slidesPerView: 4,
          },
        }}
      >
        {cars.map((item, index) => (
          <SwiperSlide key={index}>
            <Link
              to={`/${(condition == "used" ? "occasion" : "neuve") + "/" + item.id}`}
              className="rentalCard -type-2"
              data-aos="fade"
            // data-aos-delay={item.delayAnimation}
            >
              <div className="rentalCard__image">
                <div className="cardImage ratio ratio-6:5">
                  <div className="cardImage__content">
                    <img
                      className="rounded-4 col-12"
                      src={item.slideImg[0]}
                      alt="image"
                    />
                  </div>
                </div>
              </div>
              {item.tag && (
                <div className="cardImage__leftBadge">
                  <div
                    className={`py-5 px-15 rounded-right-4 text-12 lh-16 fw-500 uppercase bg-blue-1 text-white`}
                  >
                    {tag}
                  </div>
                </div>
              )}
              <div className="rentalCard__content mt-10">
                <h4 className="rentalCard__title text-dark-1 text-18 lh-16 fw-500">
                  <span>{item.location}</span>
                </h4>
                <div className="d-flex items-center text-light-1">
                  <div className="text-14">{item.time}</div>
                </div>
                <div className="text-light-1  mt-5">
                  <span className="fw-500 text-dark-1">{item.title}</span>
                </div>
                <div className="text-light-1  mt-5">
                  <span className="fw-500 text-dark-1">{item.price}</span>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* start navigation pagination */}
      {
        lang == "ar" ? (
          <>
            <button className={`section-slider-nav -prev flex-center button -brown-2 bg-white text-dark-1 size-40 rounded-full shadow-1 sm:d-none js-routes-routes_next_${condition}`}>
              <i className="icon icon-chevron-left text-12" />
            </button>
            <button className={`section-slider-nav -next flex-center button -brown-2 bg-white text-dark-1 size-40 rounded-full shadow-1 sm:d-none js-routes-routes_prev_${condition}`}>
              <i className="icon icon-chevron-right text-12" />
            </button>
          </>
        ) :
          (
            <>
              <button className={`section-slider-nav -prev flex-center button -brown-2 bg-white text-dark-1 size-40 rounded-full shadow-1 sm:d-none js-routes-routes_prev_${condition}`}>
              <i className="icon icon-chevron-left text-12" />
            </button>
            <button className={`section-slider-nav -next flex-center button -brown-2 bg-white text-dark-1 size-40 rounded-full shadow-1 sm:d-none js-routes-routes_next_${condition}`}>
              <i className="icon icon-chevron-right text-12" />
            </button>
            </>
          )
      }

      {/* end navigation pagination */}
    </>
  );
};

export default PopularRoutes;
