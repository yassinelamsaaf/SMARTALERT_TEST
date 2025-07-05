import { Link } from "react-router-dom";
import footerDataContent from "../../../data/S_footerContent";
import { LanguageContext } from "@/i18n/LanguageProvider";
import { useContext } from "react";

const FooterContent = () => {
  const { lang } = useContext(LanguageContext);

  return (
    <>
      {footerDataContent.map((item) => (
        <div className="col-xl-2 col-lg-4 col-sm-6" key={item.id}>
          <h5 className="text-16 fw-500 mb-30 underline">{item.title[lang]}</h5>
          <div className="d-flex y-gap-10 flex-column">
            {item.menuList.map((menu, i) => (
              <Link to={menu.routerPath} key={i}>
                {menu.name[lang]}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default FooterContent;
