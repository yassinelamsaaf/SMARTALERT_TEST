import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import ContactInfo from "./S_ContactInfo";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "@/i18n/LanguageProvider";
import { useContext } from "react";
import t from "@/i18n/t";
import { useAuthUser } from "../../utils/useAuthUser";
import { getImgPath } from "../../utils/imageUtils";

const MobileMenu = () => {
  const { pathname } = useLocation();
  const { lang } = useContext(LanguageContext);
  const navigate = useNavigate();

  const { user, setUser, handleLogout } = useAuthUser();

  // Helper: render user menu items for mobile
  const renderUserMenuItems = (closeOnClick = false) => [
    <hr
      key="separator"
      style={{ border: 0, borderTop: "1px solid black", margin: "8px 0" }}
    />,

    <MenuItem
      key="alert"
      onClick={() => navigate("/alert")}
      style={{
        color: "black",
        borderRadius: 8,
        margin: "4px 0",
      }}
      data-bs-dismiss={closeOnClick ? "offcanvas" : undefined}
      aria-label={closeOnClick ? "Close" : undefined}
    >
      {t[lang]?.header?.alert || "Alert"}
    </MenuItem>,
    <MenuItem
      key="vitrine"
      onClick={() => navigate("/vitrine")}
      style={{
        color: "black",
        borderRadius: 8,
        margin: "4px 0",
      }}
      data-bs-dismiss={closeOnClick ? "offcanvas" : undefined}
      aria-label={closeOnClick ? "Close" : undefined}
    >
      {t[lang]?.header?.vitrine || "Vitrine"}
    </MenuItem>,
    <MenuItem
      key="favoris"
      onClick={() => navigate("/favoris")}
      style={{
        color: "black",
        borderRadius: 8,
        margin: "4px 0",
      }}
      data-bs-dismiss={closeOnClick ? "offcanvas" : undefined}
      aria-label={closeOnClick ? "Close" : undefined}
    >
      {t[lang]?.header?.favoris || "Favoris"}
    </MenuItem>,
    <MenuItem
      key="reglages"
      onClick={() => navigate("/reglages")}
      style={{
        color: "black",
        borderRadius: 8,
        margin: "4px 0",
      }}
      data-bs-dismiss={closeOnClick ? "offcanvas" : undefined}
      aria-label={closeOnClick ? "Close" : undefined}
    >
      {t[lang]?.header?.settings || "Réglages"}
    </MenuItem>,
    <MenuItem
      key="logout"
      onClick={handleLogout}
      style={{
        color: "red",
        borderRadius: 8,
        margin: "4px 0",
      }}
      data-bs-dismiss={closeOnClick ? "offcanvas" : undefined}
      aria-label={closeOnClick ? "Close" : undefined}
    >
      {t[lang]?.header?.logout || "Se déconnecter"}
    </MenuItem>,
  ];

  return (
    <>
      <div className="pro-header d-flex align-items-center justify-between border-bottom-light">
        <Link to="/">
          <img
            style={{ height: 39 }}
            src={getImgPath("general/logo-dark.png")}
            alt="brand"
          />
        </Link>
        {/* End logo */}

        <div
          className="fix-icon"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        >
          <i className="icon icon-close"></i>
        </div>
        {/* icon close */}
      </div>
      {/* End pro-header */}

      <Sidebar width="400" backgroundColor="#fff">
        <Menu>
          <MenuItem
            onClick={() => navigate("/")}
            className={pathname === "/" ? "menu-active-link" : ""}
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            {t[lang].header.home}
          </MenuItem>
          {/* End  Accueil Menu */}

          <MenuItem
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={() => navigate("/occasion")}
            className={pathname === "/occasion" ? "menu-active-link" : ""}
          >
            {t[lang].header.usedCars}
          </MenuItem>
          {/* End  Occasion Menu */}

          <MenuItem
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={() => navigate("/neuve")}
            className={pathname === "/neuve" ? "menu-active-link" : ""}
          >
            {t[lang].header.newCars}
          </MenuItem>
          {/* End  Accueil Menu */}

          <MenuItem
            onClick={() => navigate("/about")}
            className={pathname === "/about" ? "menu-active-link" : ""}
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            {t[lang].header.about}
          </MenuItem>
          {/* End  Desitinations Menu */}

          <MenuItem
            onClick={() => navigate("/terms")}
            className={pathname === "/terms" ? "menu-active-link" : ""}
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            {t[lang].header.terms}
          </MenuItem>
          {/* End Termes & Conditions Menu */}

          {/* Render login or user menu after terms */}
          {!user ? (
            <MenuItem
              key="login"
              onClick={() => navigate("/login")}
              style={{
                background: "var(--color-dark-3)",
                color: "#fff",
                fontWeight: 600,
                borderRadius: 0,
                margin: "4px 0",
              }}
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              {t[lang]?.header?.login || "Se connecter"}
            </MenuItem>
          ) : (
            renderUserMenuItems(true)
          )}
        </Menu>
      </Sidebar>

      <div className="mobile-footer px-20 py-5 border-top-light"></div>

      <div className="pro-footer">
        <ContactInfo />
      </div>
      {/* End pro-footer */}
    </>
  );
};

export default MobileMenu;
