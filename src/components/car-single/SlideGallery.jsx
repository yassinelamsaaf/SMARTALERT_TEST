import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Mousewheel } from "swiper";
import { useState, useEffect } from "react";

// const slides = [
//   "/img/cars/slides/1.png",
//   "/img/cars/slides/2.png",
//   "/img/cars/slides/3.png",
//   "/img/cars/slides/4.png",
// ];

export default function SlideGallery({ slides }) {
  // const [imagesNavSlider, setImagesNavSlider] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [showSwiper, setShowSwiper] = useState(false);
  useEffect(() => {
    setShowSwiper(true);

    return () => { };
  }, []);

  return (
    <section className="slider">
      <div className="carsSlider mt-40">
        <div className="carsSlider-slides js-cars-slides">
          <div className="slider__thumbs">
            {showSwiper && (
              <Swiper
                onSwiper={setThumbsSwiper}
                direction="vertical"
                spaceBetween={10}
                slidesPerView={4}
                className="swiper-container1"
                breakpoints={{
                  0: {
                    direction: "horizontal",
                  },
                  768: {
                    direction: "vertical",
                  },
                }}
                modules={[Navigation, Thumbs]}
              >
                {slides.map((slide, index) => {
                  return (
                    <SwiperSlide
                      zoom={`true`}
                      key={index}>
                      <div className="slider__image">
                        <img src={slide} alt="" />
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            )}
          </div>
        </div>

        <div className="carsSlider-slider">
          {showSwiper && (
            <Swiper
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              direction="horizontal"
              slidesPerView={1}
              spaceBetween={0}
              mousewheel={true}
              breakpoints={{
                0: {
                  direction: "horizontal",
                },
                768: {
                  direction: "horizontal",
                },
              }}
              className="swiper-container2"
              modules={[Navigation, Thumbs, Mousewheel]}
            >
              {slides.map((slide, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="slider__image">
                      <img src={slide} alt="" />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  );
}
