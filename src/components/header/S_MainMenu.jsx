import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";
import { useContext } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { useLocation } from "react-router-dom";

const MainMenu = ({ style = "" }) => {
  const { pathname } = useLocation();
  const { lang } = useContext(LanguageContext);
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <nav className="menu js-navList">
      <ul className={`menu__nav ${style} -is-active`}>
        <li className={pathname === "/" ? "current" : ""}>
          <Link to="/">{t[lang].header.home}</Link>
        </li>
        <li className={pathname === "/occasion" ? "current" : ""}>
          <Link onClick={() => {
            if (pathname === "/occasion") {
              searchParams.delete("alert")
              searchParams.delete("page")
              setSearchParams(searchParams)
              window.location.reload()
            }
          }} to="/occasion">{t[lang].header.usedCars}</Link>
        </li>
        <li className={pathname === "/neuve" ? "current" : ""}>
          <Link onClick={() => {
            if (pathname === "/neuve") {
              searchParams.delete("alert")
              searchParams.delete("page")
              setSearchParams(searchParams)
              window.location.reload()
            }
          }} to="/neuve">{t[lang].header.newCars}</Link>
        </li>
        <li className={pathname === "/about" ? "current" : ""}>
          <Link to="/about">{t[lang].header.about}</Link>
        </li>
        <li className={pathname === "/terms" ? "current" : ""}>
          <Link to="/terms">{t[lang].header.terms}</Link>
        </li>
      </ul>
    </nav>
  );
};

export default MainMenu;
