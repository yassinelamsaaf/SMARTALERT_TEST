import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../i18n/LanguageProvider";
import t from "../../i18n/t";
import { useAuthUser } from "../../utils/useAuthUser";
import { getCurrentUser } from "@/apis/mockAPI/CurrentUserApi";

const LoginMenu = () => {
  const { lang } = useContext(LanguageContext);
  const { user, setUser, handleLogout } = useAuthUser();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Prefer userName from localStorage if available (social login)
    const localName = localStorage.getItem("userName");
    if (localName) {
      setUserProfile((prev) => ({ ...prev, firstName: localName }));
    } else {
      getCurrentUser().then((profile) => {
        setUserProfile(profile);
        // console.log("LoginMenu user profile:", profile);
      });
    }
  }, []);

  // console.log("LoginMenu user:", user);
  if (!user) {
    // Show login button on desktop
    return (
      <Link
        to="/login"
        className="btn ms-2 login-hover-switch"
        style={{
          background: "var(--color-dark-3)",
          color: "#fff",
          borderColor: "white",
        }}
      >
        {t[lang]?.header?.login || "Se connecter"}
      </Link>
    );
  }

  // Show dropdown menu when logged in
  return (
    <div className="dropdown ms-2">
      <button
        className="btn dropdown-toggle login-dropdown-toggle"
        type="button"
        id="userDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{
          background: "var(--color-dark-3)",
          color: "#fff",
          borderColor: "white",
        }}
      >
        {userProfile?.firstName || user?.username || "USER"}
      </button>
      <ul className="dropdown-menu" aria-labelledby="userDropdown">
        <li>
          <Link
            className="dropdown-item d-flex align-items-center gap-2"
            to="/alerts"
          >
            <i className="bi bi-bell" style={{ color: "#222" }}></i>
            {t[lang]?.header?.alert || "Alert"}
          </Link>
        </li>
        <li>
          <Link
            className="dropdown-item d-flex align-items-center gap-2"
            to="/vitrine"
          >
            <i className="bi bi-shop" style={{ color: "#222" }}></i>
            {t[lang]?.header?.vitrine || "Vitrine"}
          </Link>
        </li>
        <li>
          <Link
            className="dropdown-item d-flex align-items-center gap-2"
            to="/favoris"
          >
            <i className="bi bi-heart" style={{ color: "#222" }}></i>
            {t[lang]?.header?.favoris || "Favoris"}
          </Link>
        </li>
        <li>
          <Link
            className="dropdown-item d-flex align-items-center gap-2"
            to="/reglages"
          >
            <i className="bi bi-gear" style={{ color: "#222" }}></i>
            {t[lang]?.header?.settings || "Réglages"}
          </Link>
        </li>
        <li>
          <button
            className="dropdown-item d-flex align-items-center gap-2"
            style={{ color: "red" }}
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right"></i>
            {t[lang]?.header?.logout || "Se déconnecter"}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default LoginMenu;

/* Add this CSS to your global styles or component CSS/SCSS:
.login-hover-switch {
  transition: all 0.2s;
}
.login-hover-switch:hover, .login-hover-switch:focus {
  background: #fff !important;
  color: var(--color-dark-3) !important;
  border-color: var(--color-dark-3) !important;
}
*/
