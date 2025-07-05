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
import { isInWishlist, toggleWishlist } from "@/utils/wishlist";

const metadata = {
  title: "Details voiture || SmartAlert",
};

const CarSingleV1Dynamic = () => {
  const { lang } = useContext(LanguageContext);
  const { id } = useParams();
  const [loadingCar, setLoadingCar] = useState(true);
  const [car, setCar] = useState(null);
  const [wishlisted, setWishlisted] = useState(false);

  // Chargement des données
  useEffect(() => {
    const fetchCar = async () => {
      const carDetails = await UsedCarsApi.getCar(id, lang);
      setCar(carDetails);
      setWishlisted(isInWishlist(carDetails.id));
      setLoadingCar(false);
    };

    fetchCar();
  }, [id, lang]);

  const handleWishlist = (e) => {
    e.preventDefault();
    if (!car) return;
    const newState = toggleWishlist(car);
    setWishlisted(newState);
  };

  if (loadingCar) return <LoadingAnimation />;

  return (
    <>
      <MetaComponent meta={metadata} />
      <div className="header-margin"></div>
      <Header1 />

      <section className="pt-40">
        <div className="container">
          <div className="row y-gap-30">
            <div className="col-lg-8">
              <div className="row y-gap-20">
                <div className="col-12">
                  <div className="d-flex align-items-center justify-between">
                    <h1 className="text-30 sm:text-24 fw-600 mb-0">{car?.title}</h1>
                    <button
                      onClick={handleWishlist}
                      className="btn p-0 border-0 bg-transparent"
                      title="Ajouter aux favoris"
                    >
                      <i className={`bi ${wishlisted ? "bi-heart-fill text-danger" : "bi-heart"} fs-4`}></i>
                    </button>
                  </div>

                  <div className="row x-gap-10 items-center pt-10">
                    <div className="col-auto">
                      <div className="d-flex x-gap-5 items-center">
                        <i className="icon-location text-16 text-light-1" />
                        <div className="text-15 text-light-1">{car?.location}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-40">
                {car?.slideImg?.length > 0 && (
                  <GalleryCruiseSlider slides={car.slideImg} />
                )}
              </div>
            </div>

            <div className="col-lg-4">
              <div className="d-flex justify-end">
                <div className="px-30 py-30 rounded-4 border-light shadow-4 bg-white w-360 lg:w-full">
                  <div className="row y-gap-15 items-center justify-between">
                    <div className="col-auto">
                      <div className="text-14 text-light-1">
                        <span className="text-20 fw-500 text-dark-1 ml-5">
                          {car?.price}
                        </span>
                      </div>
                    </div>

                    <div className="col-auto">
                      <div className="d-flex items-center">
                        <div
                          className="px-3 flex-center rounded-4"
                          style={{ backgroundColor: car?.source?.color }}
                        >
                          <div className="text-14 fw-600 text-white">
                            {car?.source?.label}
                          </div>
                        </div>
                      </div>
                    </div>

                    {car?.source?.label !== constants.smartalert && (
                      <div className="col-12">
                        <a
                          href={car.carUri}
                          className="button -dark-2 py-15 px-35 h-60 col-12 rounded-4 bg-brown-2 text-white d-flex items-center justify-center"
                        >
                          <i className="icon-search text-20 mr-10" />
                          {t[lang].usedCars.details}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-40">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h3 className="text-22 fw-500">{t[lang].usedCars.essential}</h3>
              <PropertyHighlights car={car} />
              <Overview car={car} />
            </div>
          </div>
        </div>
      </section>

      <Footer2 />
    </>
  );
};

export default CarSingleV1Dynamic;
