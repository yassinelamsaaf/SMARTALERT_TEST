import "photoswipe/dist/photoswipe.css";
import Header1 from "@/components/header/header-1";
import Overview from "@/components/car-single/S_Overview";
import PropertyHighlights from "@/components/car-single/S_PropertyHighlights";
import Footer2 from "@/components/footer/footer-2";
import { useParams } from "react-router-dom";

import MetaComponent from "@/components/common/MetaComponent";
import { useContext, useEffect, useState } from "react";
import UsedCarsApi from "@/apis/UsedCarsApi";
import { LoadingAnimation } from "@/components/animation/LoadingAnimation";
import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";
import GalleryCruiseSlider from "@/components/cruise-single/S_GalleryCruiseSlider";
import constants from "@/utils/constants";

const metadata = {
  title: "Details voiture || SmartAlert",
  // description: "GoTrip - Travel & Tour ReactJs Template",
};

const CarSingleV1Dynamic = () => {
  const { lang } = useContext(LanguageContext);
  let params = useParams();
  const id = params.id;
  const [loadingCar, setLoadingCar] = useState(true);
  const [car, setCar] = useState({});


  useEffect(function getUsedCar() {
    UsedCarsApi.getCar(id, lang).then(carDetails => {
      setCar(carDetails);
      setLoadingCar(false);
    });
  }, [])

  return (
    <>
      <MetaComponent meta={metadata} />
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <Header1 />
      {/* End Header 1 */}
      {
        loadingCar ? (
          <LoadingAnimation />
        )
          : (
            <>
              <section className="pt-40">
                <div className="container">
                  <div className="row y-gap-30">
                    <div className="col-lg-8">
                      <div className="row y-gap-20 justify-between items-end">
                        <div className="col-auto">
                          <h1 className="text-30 sm:text-24 fw-600">{car?.title}</h1>
                          <div className="row x-gap-10 items-center pt-10">
                            <div className="col-auto">
                              <div className="d-flex x-gap-5 items-center">
                                <i className="icon-location text-16 text-light-1" />
                                <div className="text-15 text-light-1">
                                  {car?.location}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* End title and other info */}

                      </div>
                      {/* End .row */}

                      <div className="mt-40">
                        <GalleryCruiseSlider slides={car.slideImg} />
                      </div>
                    </div>
                    {/* End col-lg-8 left car gallery */}

                    <div className="col-lg-4">
                      <div className="d-flex justify-end">
                        <div className="px-30 py-30 rounded-4 border-light shadow-4 bg-white w-360 lg:w-full">
                          <div className="row y-gap-15 items-center justify-between">
                            <div className="col-auto">
                              <div className="text-14 text-light-1">
                                {/* Prix */}
                                <span className="text-20 fw-500 text-dark-1 ml-5">
                                  {car?.price}
                                </span>
                              </div>
                            </div>
                            {/* End .col-auto */}

                            <div className="col-auto">
                              <div className="d-flex items-center">
                                <div className="px-3 flex-center rounded-4" style={{ backgroundColor: car?.source?.color }}>
                                  <div className="text-14 fw-600 text-white">
                                    {car?.source?.label}
                                  </div>
                                </div>
                                {/* End div */}
                              </div>
                            </div>
                            {/* End .col-auto */}
                            {car?.source?.label !== constants.smartalert && (
                              <div className="col-12">
                                <button
                                  className="button -dark-2 py-15 px-35 h-60 col-12 rounded-4 bg-brown-2 text-white"
                                >
                                  <a href={car.carUri}>
                                    <i className="icon-search text-20 mr-10" />
                                    {t[lang].usedCars.details}
                                  </a>
                                </button>
                                {/* End search button_item */}
                              </div>
                            )}
                          </div>
                          {/* End .row */}
                        </div>
                        {/* End px-30 */}
                      </div>
                      {/* End d-flex */}
                    </div>
                    {/* End col right car sidebar filter box */}
                  </div>
                  {/* End .row */}
                </div>
                {/* End .containar */}
              </section>
              {/* End Galler single */}

              <section className="pt-40">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-8">
                      <div>
                        <h3 className="text-22 fw-500">{t[lang].usedCars.essential}</h3>
                        <PropertyHighlights car={car} />
                        <Overview car={car} />
                      </div>
                    </div>
                    {/* End .col-lg-8 */}
                  </div>
                  {/* End .row */}
                </div>
                {/* End container */}
              </section>
              {/* End pt-40 */}

              {/* End main content section */}
            </>
          )
      }

      <Footer2 />
    </>
  );
};

export default CarSingleV1Dynamic;
