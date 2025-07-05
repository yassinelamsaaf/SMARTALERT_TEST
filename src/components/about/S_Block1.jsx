import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";
import { useContext } from "react";

const Block1 = () => {
  const { lang } = useContext(LanguageContext);

  return (
    <>
      <div className="col-lg-5">
        <h2 className="text-30 fw-600">{t[lang].about.description.title}</h2>
        <p className="mt-5">{t[lang].about.description.sub}</p>
        <p className="text-dark-1 mt-60 lg:mt-40 md:mt-20">
        {t[lang].about.description.text}
        </p>
      </div>
      {/* End .col */}

      <div className="col-lg-6">
        <img
          src={`${import.meta.env.BASE_URL}/img/pages/about/about.png`}
          alt="image"
          className="rounded-4 w-100"
        />
      </div>
      {/* End .col */}
    </>
  );
};

export default Block1;
