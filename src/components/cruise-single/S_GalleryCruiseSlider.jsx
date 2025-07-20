import React, { useState } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Navigation } from "swiper";
import "swiper/css/thumbs";

const GalleryCruiseSlider = ({ slides = [`${import.meta.env.BASE_URL}/img/cars/no-car.png`] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="cruiseSlider">
      <Gallery>
        <div className="cruiseSlider-slider relative">
          <div className="d-flex js-cruise-slider">
            <Swiper
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              modules={[Thumbs, Navigation]}
              navigation={{
                nextEl: ".cruiseSlider__nav.js-next",
                prevEl: ".cruiseSlider__nav.js-prev",
              }}
              lazy={true}
              loop={true}
            >
              {slides.map((item, i) => {
                let image = new Image()
                image.src = item
                let ratio = 1
                if (image.width >= 0.7 * window.innerWidth || image.height >= 0.7) {
                  ratio = 0.8
                }
                return (
                  <SwiperSlide key={i}>
                    <Item
                      width={image.width * ratio}
                      height={image.height * ratio}
                      original={item}
                      thumbnail={item}
                    >
                      {({ ref, open }) => (
                        <img
                          src={item}
                          ref={ref}
                          onClick={open}
                          alt="large slide"
                          style={{objectFit: "contain"}}
                        />
                      )}
                    </Item>
                  </SwiperSlide>
                )
              })}
            </Swiper>

            <div className="cruiseSlider__nav -prev js-prev">
              <button className="button -outline-white size-50 flex-center text-white rounded-full">
                <i className="icon-arrow-left" />
              </button>
            </div>
            <div className="cruiseSlider__nav -next js-next">
              <button className="button -outline-white size-50 flex-center text-white rounded-full">
                <i className="icon-arrow-right" />
              </button>
            </div>
          </div>
          {/* End d-flex */}
        </div>
        {/* End relative */}{" "}
      </Gallery>

      {/* <div className="cruiseSlider-slides row x-gap-10 y-gap-10 pt-10 js-cruise-slides">
        <Swiper
          onSwiper={setThumbsSwiper}
          slidesPerView={6}
          modules={[Thumbs]}
          spaceBetween={12}
        >
          {slides.map((item, i) => (
            <SwiperSlide
              key={i}
              className="cruiseSlider-slides__item  rounded-4"
            >
              <img src={item} alt="small size slide" className="h-full" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div> */}
    </div>
  );
};

export default GalleryCruiseSlider;
