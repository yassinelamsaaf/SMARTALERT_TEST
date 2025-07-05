import { useContext } from "react";
import Specifications from "./S_Specifications";
import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";

const Overview = ({ car }) => {
  const { lang } = useContext(LanguageContext);
  return (
    <>

      <div className="border-top-light mt-40 pt-40 mb-40">
        <h3 className="text-22 fw-500">{t[lang].usedCars.specification}</h3>
        <div className="col-xl">
          <Specifications car={car} />
        </div>
      </div>
      {/* End specifications */}
    </>
  );
};

export default Overview;
