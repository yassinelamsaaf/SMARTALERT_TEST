import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";
import { useContext, useState } from "react";
import { getImgPath } from "@/utils/imageUtils";

const LanguageMegaMenu = ({ textClass }) => {
  const { lang, setLang } = useContext(LanguageContext);
  const [click, setClick] = useState(false);
  const handleCurrency = () => setClick((prevState) => !prevState);

  const languageContent = [
    {
      id: 1,
      language: "Français",
      country: {
        fr: "France",
        ar: "فرنسا",
      },
      img: getImgPath("general/fr.png"),
    },
    {
      id: 2,
      language: "العربية",
      country: {
        fr: "Maroc",
        ar: "المغرب",
      },
      img: getImgPath("general/ar.png"),
    },
  ];
  const [selectedCurrency, setSelectedCurrency] = useState(
    languageContent[lang == "ar" ? 1 : 0]
  );

  const handleItemClick = (item) => {
    if (selectedCurrency.id != item.id) {
      setSelectedCurrency(item);
      let newLang = item.id == 2 ? "ar" : "fr";
      setLang(newLang);

      document.location.reload();
    }
    setClick(false);
  };

  return (
    <>
      {/* Start language currency Selector */}
      <div className="col-auto">
        <button
          className={`d-flex items-center text-14 ${textClass}`}
          onClick={handleCurrency}
        >
          <img
            src={selectedCurrency.img}
            alt="image"
            className="rounded-full mr-10"
          />
          <span className="js-language-mainTitle mx-1">
            {selectedCurrency.id === 1 ? "Fr" : "ع"}
          </span>
          <i className="icon-chevron-sm-down text-7 ml-15" />
        </button>
      </div>
      {/* End language currency Selector */}

      <div className={`langMenu js-langMenu ${click ? "" : "is-hidden"}`}>
        <div className="currencyMenu__bg" onClick={handleCurrency}></div>
        <div className="langMenu__content bg-white rounded-4">
          <div className="d-flex items-center justify-between px-30 py-20 sm:px-15 border-bottom-light">
            <div className="text-20 fw-500 lh-15">
              {t[lang].header.selectLanguage}
            </div>
            {/* End title */}
            <button className="pointer" onClick={handleCurrency}>
              <i className="icon-close" />
            </button>
            {/* End colse button */}
          </div>
          {/* Emd flex-wrapper */}
          <ul className="modalGrid px-30 py-30 sm:px-15 sm:py-15">
            {languageContent.map((item) => (
              <li
                className={`modalGrid__item js-item ${
                  selectedCurrency.country[lang] === item.country[lang]
                    ? "active"
                    : ""
                }`}
                key={item.id}
                onClick={() => handleItemClick(item)}
              >
                <div className="py-10 px-15 sm:px-5 sm:py-5">
                  <div className="text-15 lh-15 fw-500 text-dark-1">
                    {item.language}
                  </div>
                  <div className="text-14 lh-15 mt-5 js-title">
                    {item.country[lang]}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* End langMenu */}
      </div>
    </>
  );
};

export default LanguageMegaMenu;
