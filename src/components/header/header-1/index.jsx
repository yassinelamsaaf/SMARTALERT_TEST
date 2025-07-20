import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";
import MainMenu from "../S_MainMenu";
import MobileMenu from "../S_MobileMenu";
import LanguageMegaMenu from "../S_LanguageMegaMenu";
import LoginMenu from "../../header/LoginMenu";
import t from "../../../i18n/t";
import { LanguageContext } from "../../../i18n/LanguageProvider";
import AddAlertButton from "../AddAlertButton";
import NotificationButton from "../../header/NotificationButton";
import { useAuthUser } from "@/utils/useAuthUser";


const Header1 = () => {
  const { lang } = useContext(LanguageContext);
  const [navbar, setNavbar] = useState(false);
  // Use useAuthUser for user state, like LoginMenu
  const { user } = useAuthUser();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header className={`header ${navbar ? "bg-dark-3 is-sticky" : " bg-dark-3"}`}>
        <div className="header__container px-30 sm:px-20">
          <div className="row justify-between items-center">
            <div className="col-auto">
              <div className="d-flex items-center">
                <Link to="/" className="header-logo mr-20">
                  <img
                    style={{ height: 39 }}
                    src={`${import.meta.env.BASE_URL}/img/general/logo-light.png`} alt="logo icon" />
                </Link>
                {/* End logo */}

                <div className="header-menu">
                  <div className="header-menu__content">
                    <MainMenu style="text-white" />
                  </div>
                </div>
                {/* End header-menu */}

              </div>
              {/* End d-flex */}
            </div>
            {/* End col */}
            <div className="col-auto">
              <div className="d-flex items-center">
                <div className="row x-gap-20 items-end" style={{ gap: 8 }}>
                  {/* Login button and language selector area, styled for better contrast and spacing */}
                  <div className="d-flex align-items-center" style={{ gap: 20 }}>
                    <div className="d-block lg:d-none" style={{ marginRight: 12 }}>
                      <LoginMenu btnClass="btn btn-outline-light" />
                    </div>

                    {user && (
                      <div style={{ marginRight: 1 }}>
                        <NotificationButton />
                      </div>
                    )}
                    <LanguageMegaMenu textClass="text-white" />
                  </div>
                  {/* End Megamenu for Language */}
                </div>
                {/* Start mobile menu icon */}
                <div className="d-none lg:d-flex x-gap-20 items-center pl-30 text-white">
                  {/* <div>
                    <Link
                      to="/login"
                      className="d-flex items-center icon-user text-inherit text-22"
                    />
                  </div> */}
                  <div>
                    <button
                      className="d-flex items-center icon-menu text-inherit text-20"
                      data-bs-toggle="offcanvas"
                      aria-controls="mobile-sidebar_menu"
                      data-bs-target="#mobile-sidebar_menu"
                    />

                    <div
                      className="offcanvas offcanvas-start  mobile_menu-contnet "
                      tabIndex="-1"
                      id="mobile-sidebar_menu"
                      aria-labelledby="offcanvasMenuLabel"
                      data-bs-scroll="true"
                    >
                      <MobileMenu />
                      {/* End MobileMenu */}
                    </div>
                  </div>
                </div>
                {/* End mobile menu icon */}
              </div>
            </div>
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
