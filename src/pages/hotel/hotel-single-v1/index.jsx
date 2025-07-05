import "photoswipe/dist/photoswipe.css";
import Header1 from "@/components/header/header-1";
import AvailableRooms from "@/components/hotel-single/S_AvailableRooms";
import Footer2 from "@/components/footer/footer-2";
import GalleryOne from "@/components/hotel-single/S_GalleryOneNew";
import { useParams } from "react-router-dom";

import MetaComponent from "@/components/common/MetaComponent";
import { useContext, useEffect, useState } from "react";
import NewCarsApi from "@/apis/NewCarsApi";
import { LoadingAnimation } from "@/components/animation/LoadingAnimation";
import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";

const metadata = {
  title: "Details voiture || SmartAlert",
  description: "GoTrip - Travel & Tour ReactJs Template",
};

const HotelSingleV1Dynamic = () => {
  const { lang } = useContext(LanguageContext);
  let params = useParams();
  const id = params.id;
  const [loadingCar, setLoadingCar] = useState(true);
  const [car, setCar] = useState({});

  useEffect(function getUsedCar() {
    NewCarsApi.getCar(id, lang).then(carDetails => {
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
              <GalleryOne car={car} />

              {/* End gallery grid wrapper */}

              <section id="rooms" className="pt-30">
                <div className="container">
                  <div className="row pb-20">
                    <div className="col-auto">
                      <h3 className="text-22 fw-500">{t[lang].newCars.versions}</h3>
                    </div>
                  </div>
                  {/* End .row */}
                  <AvailableRooms hotel={car} />
                </div>
                {/* End .container */}
              </section>
              {/* End Available Rooms */}

            </>
          )
      }

      <Footer2 />
    </>
  );
};

export default HotelSingleV1Dynamic;
