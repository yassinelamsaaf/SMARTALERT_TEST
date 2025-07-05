import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";
import { useContext } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const { lang } = useContext(LanguageContext);

  const data = {
    imageSrc: `${import.meta.env.BASE_URL}/img/general/404.svg`,
    title: t[lang].notFound.title,
    description: t[lang].notFound.description,
    buttonLabel: t[lang].notFound.buttonLabel,
    buttonUrl: "/",
  };

  return (
    <section className="layout-pt-lg layout-pb-lg">
      <div className="container">
        <div className="row y-gap-30 justify-between items-center">
          <div className="col-lg-6">
            <img src={data.imageSrc} alt="image" />
          </div>
          <div className="col-lg-5">
            <div className="no-page">
              <div className="no-page__title">
                40<span className="text-dark-2">4</span>
              </div>
              <h2 className="text-30 fw-600">{data.title}</h2>
              <div className="pr-30 mt-5">{data.description}</div>
              <div className="d-inline-block mt-40 md:mt-20">
                <Link
                  to={data.buttonUrl}
                  className="button -md -dark-2 bg-brown-2 text-white"
                >
                  {data.buttonLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
