import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";
import { useContext } from "react";

const AvailableRooms = ({ hotel }) => {
  const { lang } = useContext(LanguageContext);
  return (
    <>
      <div className="border-light mb-5 rounded-4 px-30 py-30 sm:px-20 sm:py-20">
        <div className="row y-gap-20">
          <div className="col-12">
            <div className="roomGrid">
              <div className="roomGrid__header">
                <div></div>
                <div>{t[lang].newCars.versionName}</div>
                <div>{t[lang].newCars.fuel}</div>
                <div>{t[lang].newCars.power}</div>
                <div>{t[lang].newCars.price}</div>

              </div>
              {/* End .roomGrid__header */}
              {hotel.versions?.map((version, index) => {
                return (
                  <div className="roomGrid__grid" key={index}>
                    <div>
                      {version.isPromo && (
                        <div
                          className={`py-5 px-15 rounded-right-4 text-12 lh-16 fw-500 uppercase bg-dark-3 text-white`}
                        >
                          {t[lang].newCars.promo}
                        </div>
                      )}
                    </div>
                    {/* End roomgrid inner */}

                    <div className="y-gap-30">
                      <div className="roomGrid__content">
                        <div>
                          <div className="text-15 fw-500">
                            {version.label}
                          </div>
                        </div>

                        <div>
                          <div className="text-15 fw-500">
                            {version.fuel}
                          </div>
                        </div>

                        <div>
                          <div className="text-15 fw-500">
                            <span dir="ltr">
                            {version.power}
                            </span>
                          </div>

                        </div>

                        <div>
                          <div className="text-15 fw-500">
                            <span dir="ltr">
                            {version.promoPrice}
                            </span>
                            {version.isPromo && (
                              <>
                              <br />
                              <span dir="ltr" className="text-light-1 fw-300" style={{textDecoration: "line-through"}}>{version.basePrice}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* End romm Grid horizontal content */}

                    </div>
                    {/* End price features */}

                  </div>
                )
              })}
            </div>
            {/* End .roomGrid */}
          </div>
          {/* End .col-12 */}
        </div>
        {/* End .row */}
      </div>
      {/* End standard twin room */}

    </>
  );
};

export default AvailableRooms;
