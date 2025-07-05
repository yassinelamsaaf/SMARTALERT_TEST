import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";
import { useContext } from "react";

const Specifications = ({ car }) => {
  const { lang } = useContext(LanguageContext)
  const speciContent = [
    { id: 1, name: t[lang].usedCars.brand, content: car.brand },
    { id: 2, name: t[lang].usedCars.model, content: car.model },
    { id: 3, name: t[lang].usedCars.year, content: car.year },
    { id: 4, name: t[lang].usedCars.mileageMin, content: car.mileageMin, style: { dir: "ltr" } },
    { id: 5, name: t[lang].usedCars.mileageMax, content: car.mileageMax, style: { dir: "ltr" } },
    { id: 6, name: t[lang].usedCars.transmission, content: car.transmission },
    { id: 7, name: t[lang].usedCars.doors, content: car.door },
    { id: 8, name: t[lang].usedCars.condition, content: car.condition },
    { id: 9, name: t[lang].usedCars.origin, content: car.origine },
  ];
  return (
    <div className="row y-gap-30 justify-between pt-15">
      {speciContent.map((item) => (
        <>
          {(item.id - 1) % 3 == 2 && (
            <div key={(item.id * 3) + ""} className="col-sm-1 p-0" ></div>
          )}
          <div key={(item.id * 3 + 1) + ""} className="col-sm-3">
            <div className="fw-500">{item.name}</div>
            <div className="text-15" >
              <span dir={item.style?.dir ?? ""}>
                {item.content}
              </span>
            </div>
          </div>
          {(item.id - 1) % 3 == 0 && (
            <div key={(item.id * 3 + 2) + ""} className="col-sm-1 p-0"></div>
          )}
        </>
      ))}
    </div>
  );
};

export default Specifications;
