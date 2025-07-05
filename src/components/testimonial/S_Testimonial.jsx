import Slider from "react-slick";
import { testimonial } from "../../data/S_testimonialData";
import { LanguageContext } from "@/i18n/LanguageProvider";
import { useContext } from "react";

const Testimonial = () => {
  const { lang } = useContext(LanguageContext);

  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },

      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
          dots: true,
        },
      },
    ],
  };

  return (
    <>
      <Slider {...settings}>
        {testimonial.map((item) => (
          <div
            className="testimonials -type-1 bg-white rounded-4 pt-40 pb-30 px-40"
            key={item.id}
            data-aos="fade"
            data-aos-delay={item.dealyAnimation}
          >
            <h4 className="text-16 fw-500 text-dark-2 mb-20">{item.meta[lang]}</h4>
            <p className="testimonials__text lh-18 fw-500 text-dark-1">
              {item.text[lang]}
            </p>
            <div className="pt-20 mt-28 border-top-light">
              <div className="row x-gap-20 y-gap-20 items-center">
                <div className="col-auto">
                  <img src={item.avatar} alt="image" className="size-60" />
                </div>
                <div className="col-auto">
                  <div className="text-15 fw-500 lh-14">{item.name[lang]}</div>
                  <div className="text-14 lh-14 text-light-1 mt-5">
                    {item.designation[lang]}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default Testimonial;
