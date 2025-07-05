import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";
import { useContext } from "react";

const Counter2 = () => {
  const { lang } = useContext(LanguageContext)
  return (
    <div className="row y-gap-30 text-dark-1">
      <div className="col-sm-5 col-6">
        <div className="text-30 lh-15 fw-600">{t[lang].about.counter2.satisfaction._1}</div>
        <div className="lh-15">{t[lang].about.counter2.satisfaction._2}</div>
      </div>
      {/* End .col */}

      <div className="col-sm-5 col-6">
        <div className="text-30 lh-15 fw-600">{t[lang].about.counter2.note._1}</div>
        <div className="lh-15">{t[lang].about.counter2.note._2}</div>
        <div className="d-flex x-gap-5 items-center pt-10">
          <div className="icon-star text-dark-1 text-10" />
          <div className="icon-star text-dark-1 text-10" />
          <div className="icon-star text-dark-1 text-10" />
          <div className="icon-star text-dark-1 text-10" />
          <div className="icon-star text-dark-1 text-10" />
        </div>
      </div>
    </div>
  );
};

export default Counter2;
