import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";
import { useContext } from "react";

const PropertyHighlights = ({ car }) => {
  const { lang } = useContext(LanguageContext)
  const propertyContent = [
    {
      id: 1,
      icon: "icon-car",
      name: t[lang].usedCars.brand,
      content: car.brand,
    },
    {
      id: 3,
      icon: "icon-transmission",
      name: t[lang].usedCars.transmission,
      content: car.transmission,
    },
    {
      id: 4,
      icon: "icon-speedometer",
      name: t[lang].usedCars.mileage,
      content: car.mileageMin,
      style: { dir: "ltr" },
    },
  ];
  return (
    <div className="row y-gap-30 justify-between pt-20">
      {propertyContent.map((item) => (
        <div className="col-md-3 col-6" key={item.id}>
          <div className="d-flex">
            <i className={`${item.icon} text-22 text-dark-1 mr-10`} />
            <div className="text-15 lh-15">
              {item.name}
              <br />
              <span dir={item.style?.dir ?? ""}>
                {item.content}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyHighlights;
