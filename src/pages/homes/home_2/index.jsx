import Footer2 from "@/components/footer/footer-2";
import Header1 from "@/components/header/header-1";
import Hero2 from "@/components/hero/hero-2";
import BlockGuide from "@/components/home/home-2/BlockGuide";
import Testimonial from "@/components/home/home-2/Testimonial";
import TestimonialRating from "@/components/home/home-2/TestimonialRating";

import MetaComponent from "@/components/common/MetaComponent";
import Sources from "@/components/home/home-2/Sources";
import t from "@/i18n/t";
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "@/i18n/LanguageProvider";
import { LoadingAnimation } from "@/components/animation/LoadingAnimation";
import UsedCarsApi from "@/apis/UsedCarsApi";
import PopularRoutes from "@/components/home/home-10/S_PopularRoutes";
import { useSelector } from "react-redux";

const metadata = {
  title: "Acceuil || SmartAlert",
  description: "SmartAlert - Voitures à vendre",
};

const Home_2 = () => {
  const { lang } = useContext(LanguageContext);

  const [usedCars, setUsedCars] = useState([]);
  const [newCars, setNewCars] = useState([]);
  const [loadingUsedCars, setLoadingUsedCars] = useState(true);
  const [loadingNewCars, setLoadingNewCars] = useState(true);

  const { promoCars, loadingPromoCars, error } = useSelector((state) => state.promoCarsReducer)


  useEffect(function getUsedCars() {
    setLoadingUsedCars(true);
    setLoadingNewCars(true);
    UsedCarsApi.getUsedCars(0, null, lang)
      .then(cars => {
        setUsedCars(cars);
        setLoadingUsedCars(false);
      });
  }, [])

  useEffect(function getNewCars() {
    setLoadingNewCars(loadingPromoCars)
    setNewCars(promoCars)
  }, [loadingPromoCars])
  return (
    <>
      <MetaComponent meta={metadata} />
      {/* End Page Title */}

      <Header1 />
      {/* End Header 2 */}

      <Hero2 />
      {/* End Hero 2 */}

      <section className="layout-pt-md layout-pb-md">
        <div className="container">
          <div className="row y-gap-40 sm:y-gap-10 justify-between">
            <BlockGuide />
          </div>
        </div>
      </section>
      {/* End travel block sections */}

      {
        (loadingUsedCars || loadingNewCars) ? (
          <div className="loading-overlay">
            <LoadingAnimation />
          </div>
        ) :
          (
            <>
              <section className="layout-pt-md layout-pb-md">
                <div className="container">
                  <div className="row y-gap-20 justify-center text-center">
                    <div className="col-auto">
                      <div className="sectionTitle -md">
                        <h2 className="sectionTitle__title">
                          {t[lang].home.usedCars.title}
                        </h2>
                        <p className=" sectionTitle__text mt-5 sm:mt-0">
                          {t[lang].home.usedCars.description}
                        </p>
                      </div>
                    </div>
                    {/* End .col */}
                  </div>
                  {/* End .row */}

                  <div className="relative pt-40 ">
                    <PopularRoutes cars={usedCars} condition="used" tag={t[lang].home.usedCars.tag} />
                  </div>
                </div>
              </section>
              {/* End Travellers Section */}
              {newCars.length > 0 && (
                <section className="layout-pt-md layout-pb-md">
                  <div className="container">
                    <div className="row y-gap-20 justify-center text-center">
                      <div className="col-auto">
                        <div className="sectionTitle -md">
                          <h2 className="sectionTitle__title">
                            {t[lang].home.newCars.title}
                          </h2>
                          <p className=" sectionTitle__text mt-5 sm:mt-0">
                            {t[lang].home.newCars.description}
                          </p>
                        </div>
                      </div>
                      {/* End .col */}
                    </div>
                    {/* End .row */}

                    <div className="relative pt-40 ">
                      <PopularRoutes cars={newCars} condition="new" tag={t[lang].home.newCars.tag} />
                    </div>
                  </div>
                </section>
              )}
              {/* End Travellers Section */}
            </>
          )
      }

      <section className="layout-pt-md layout-pb-md">
        <div className="container">
          <div className="y-gap-20 text-center">
            {/* <div className=""> */}
            <div className="sectionTitle -md">
              <h2 className="sectionTitle__title">
                {t[lang].home.sources.title}
              </h2>
            </div>
            {/* </div> */}
            {/* End .col */}

            {/* <div className="col-auto"> */}
            <div dir="ltr" className="d-flex x-gap-15 items-center justify-center pt-40 sm:pt-20">
              <div className="col-auto">
                <button className="d-flex items-center text-24 arrow-left-hover js-places-prev">
                  <i className="icon icon-arrow-left" />
                </button>
              </div>
              {/* End prev */}

              <div className="col-auto">
                <div className="pagination -dots text-border js-places-pag" />
              </div>
              {/* End pagination */}

              <div className="col-auto">
                <button className="d-flex items-center text-24 arrow-right-hover js-places-next">
                  <i className="icon icon-arrow-right" />
                </button>
              </div>
              {/* End Next */}
            </div>
            {/* </div> */}
            {/* End .col for navigation and pagination */}
          </div>
          {/* End .row */}

          <Sources />
          {/* End Sources component */}
        </div>
        {/* End .container */}
      </section>
      {/* End Connect with Sources Sections */}

      <section className="layout-pt-md layout-pb-sm bg-dark-3">
        <div className="container">
          <div className="row y-gap-20">
            <div className="col-xl-5 col-lg-6">
              <TestimonialRating />
            </div>
            {/* End .col */}

            <div className="col-xl-4 offset-xl-2 col-lg-5 offset-lg-1 col-md-10">
              <Testimonial />
            </div>
            {/* End .col */}
          </div>
          {/* End .row */}
        </div>
      </section>
      {/* End testimonial and brand sections Section */}

      {/* <AppBanner /> */}
      {/* End AppBanner Section */}

      <Footer2 />
      {/* End Footer Section */}
    </>
  );
};

export default Home_2;
