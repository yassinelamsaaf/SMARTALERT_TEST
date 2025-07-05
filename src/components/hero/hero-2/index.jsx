import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";
import { useContext } from "react";

const Index = () => {
    const { lang } = useContext(LanguageContext);
  
  return (
    <section className="masthead -type-2 z-2 mt-60">
      <div className="masthead__bg bg-dark-3">
        <img alt="image" src={`${import.meta.env.BASE_URL}/img/masthead/2/bg.png`} className="js-lazy" />
      </div>
      {/* End bg image */}

      <div className="container">
        <div className="masthead__content">
          <div className="row y-gap-0">
            <div className="col-xl-5" data-aos="fade-up" data-aos-offset="0">
              <h1 className="z-2 text-40 lg:text-30 md:text-20 sm:text-20 text-white pt-80 xl:pt-0">
                <span className="text-brown-2">{t[lang].home.hero.text_1}</span>
                <br />
                {t[lang].home.hero.text_2}
              </h1>
              <p className="z-2 text-white mt-20 pb-60">
                {t[lang].home.hero.text_3}
              </p>

              {/* End filter content */}
            </div>
            {/* End .col */}

            <div className="col-xl-7">
              <div className="masthead__images relative-1">
                <div data-aos="fade" data-aos-delay="400">
                  <img
                    src={`${import.meta.env.BASE_URL}/img/masthead/2/01.jpg`}
                    alt="image"
                    className="js-mouse-move"
                  />
                </div>
                {/* End left image */}

                <div data-aos="fade" data-aos-delay="600">
                  <img
                    src={`${import.meta.env.BASE_URL}/img/masthead/2/02.jpg`}
                    alt="image"
                    className="js-mouse-move"
                  />
                </div>
                {/* End right top image */}

                <div data-aos="fade" data-aos-delay="800">
                  <img
                    src={`${import.meta.env.BASE_URL}/img/masthead/2/03.jpg`}
                    alt="image"
                    className="js-mouse-move"
                  />
                </div>
                {/* End right bottom image */}
              </div>

              {/* End .masthead__images */}
            </div>
            {/* End .col */}
          </div>
          {/* End .row */}
        </div>
        {/* End .masthead__content */}
      </div>
      {/* End .container */}
    </section>
  );
};

export default Index;
