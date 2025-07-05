import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CurrenctyMegaMenu from "../CurrenctyMegaMenu";
import LanguageMegaMenu from "../LanguageMegaMenu";
import LocationSearch from "./LocationSearch";
import MobileMenu from "../MobileMenu";

const Header1 = () => {
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  return (
    <>
      <header className={`header ${navbar ? "bg-dark-1 is-sticky" : ""}`}>
        <div className="header__container container">
          <div className="row justify-between items-center">
            <div className="col-auto mobile-col">
              <div className="d-flex items-center">
                <div className="mr-20 d-flex items-center">

                  {/* End mobile menu icon */}

                  <button
                    className="d-flex items-center icon-menu text-white text-20"
                    data-bs-toggle="offcanvas"
                    aria-controls="mobile-sidebar_menu"
                    data-bs-target="#mobile-sidebar_menu"
                  ></button>
                  {/* Start mobile menu icon */}

                  <div
                    className="offcanvas offcanvas-start  mobile_menu-contnet"
                    tabIndex="-1"
                    id="mobile-sidebar_menu"
                    aria-labelledby="offcanvasMenuLabel"
                    data-bs-scroll="true"
                  >
                    <MobileMenu />
                    {/* End MobileMenu */}
                  </div>
                </div>
                {/* End mobile humberger menu */}

                <Link to="/" className="header-logo mr-20">
                  <img src="/img/general/logo-light-2.svg" alt="logo icon" />
                  <img src="/img/general/logo-dark.svg" alt="logo icon" />
                </Link>
                {/* End logo */}
              </div>
              {/* End d-flex */}
            </div>
            {/* End col */}

            {/* End col-auto */}
          </div>
          {/* End .row */}
        </div>
        {/* End header_container */}
      </header>
    </>
  );
};

export default Header1;
