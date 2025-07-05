import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";
import { useContext } from "react";

const TestimonialRating = () => {
  const { lang } = useContext(LanguageContext);
  return (
    <>
      <h2 className="text-30 text-white">
        {t[lang].home.rating.title._1}
        <br />
        {t[lang].home.rating.title._2}
      </h2>

      <div className="row y-gap-30 text-white pt-60 lg:pt-40">
        <div className="col-sm-5 col-6">
          <div className="text-30 lh-15 fw-600">
            {t[lang].home.rating.satisfaction._1}
          </div>
          <div className="lh-15">
            {t[lang].home.rating.satisfaction._2}
          </div>
        </div>
        {/* End .col */}

        <div className="col-sm-5 col-6">
          <div className="text-30 lh-15 fw-600">
            {t[lang].home.rating.note._1}
          </div>
          <div className="lh-15">
            {t[lang].home.rating.note._2}
          </div>
          <div className="d-flex x-gap-5 items-center pt-10">
            <div className="icon-star text-white text-10" />
            <div className="icon-star text-white text-10" />
            <div className="icon-star text-white text-10" />
            <div className="icon-star text-white text-10" />
            <div className="icon-star text-white text-10" />
          </div>
        </div>
        {/* End .col */}
      </div>
    </>
  );
};

export default TestimonialRating;
