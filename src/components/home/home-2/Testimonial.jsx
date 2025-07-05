import React, { useContext } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { testimonial } from "../../../data/S_testimonialData";
import { EffectCards } from "swiper";
import { LanguageContext } from "@/i18n/LanguageProvider";

const Testimonial = () => {
  const { lang } = useContext(LanguageContext);
  
  return (
    <>
      <div className="testimonials-slider-2 js-testimonials-slider-2">
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards, Navigation, Pagination]}
          navigation={{
            nextEl: ".js-next_active",
            prevEl: ".js-prev_active",
          }}
          pagination={{
            el: ".js-pagination",
            clickable: true,
          }}
        >
          {testimonial.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="testimonials -type-1 bg-white rounded-4 pt-40 pb-30 px-40 shadow-2">
                <div>
                  <h4 className="text-16 fw-500 text-dark-2 mb-20">
                    {item.meta[lang??"fr"]}
                  </h4>
                  <p className="testimonials__text lh-18 fw-500 text-dark-1">
                    {item.text[lang??"fr"]}
                  </p>
                  <div className="pt-20 mt-28 border-top-light">
                    <div className="row x-gap-20 y-gap-20 items-center">
                      <div className="col-auto">
                        <img src={item.avatar} alt="image" width={70} height={71} />
                      </div>
                      <div className="col-auto">
                        <div className="text-15 fw-500 lh-14">{item.name[lang??"fr"]}</div>
                        <div className="text-14 lh-14 text-light-1 mt-5">
                          {item.designation[lang??"fr"]}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* End swiper-wrapper */}

        <div className="d-flex x-gap-15 items-center justify-center pt-30">
          <div className="col-auto">
            <button className="d-flex items-center text-24 arrow-left-hover text-white js-prev_active">
              <i className="icon icon-arrow-left" />
            </button>
          </div>
          {/* End .arrow left */}

          <div className="col-auto">
            <div className="pagination -dots text-white-50 js-pagination" />
          </div>
          {/* End col-auto */}

          <div className="col-auto">
            <button className="d-flex items-center text-24 arrow-right-hover text-white js-next_active">
              <i className="icon icon-arrow-right" />
            </button>
          </div>
          {/* End .arrow right */}
        </div>
      </div>
    </>
  );
};

export default Testimonial;
