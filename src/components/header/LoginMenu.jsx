import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { LanguageContext } from "../../i18n/LanguageProvider";
import t from "../../i18n/t";
import { useAuthUser } from "../../utils/useAuthUser";
import { getCurrentUser } from "@/apis/CurrentUserApi";
import LogoutModal from "../settings/LogoutModal";
import NotificationCard from "../notifications/notificationCard";

const LoginMenu = () => {
  const { lang } = useContext(LanguageContext);
  const { user, setUser, handleLogout } = useAuthUser();
  const [userProfile, setUserProfile] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // console.log("LoginMenu user:", user);
  if (!user) {
    // Show login button on desktop with icon
    return (
      <Link
        to="/login"
        className="btn ms-2 login-hover-switch d-flex align-items-center gap-2"
        style={{
          background: "var(--color-dark-3)",
          color: "#fff",
          borderColor: "white",
        }}
      >
        <i className="bi bi-box-arrow-in-right" style={{ fontSize: 18 }}></i>
        {t[lang]?.header?.login || "Se connecter"}
      </Link>
    );
  }

  // Show dropdown menu when logged in
  const handleLogoutClick = (e) => {
    e.preventDefault();
    window.dispatchEvent(new Event("openLogoutModal"));
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <>
      <div className="dropdown ms-2" style={{ position: 'relative' }} ref={dropdownRef}>
        <button
          className="btn dropdown-toggle login-dropdown-toggle d-flex align-items-center gap-2"
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
          <i className="bi bi-person-circle" style={{ fontSize: 18 }}></i>
          {userProfile?.firstName || user?.username || "USER"}
        </button>
        <ul className="dropdown-menu" aria-labelledby="userDropdown">
          <li>
            <Link
              className={`dropdown-item d-flex align-items-center gap-2${
                location.pathname === "/alerts" ? " dropdown-item-active" : ""
              }`}
              to="/alerts"
            >
              <i className="bi bi-bell" style={{ color: "#222" }}></i>
              {t[lang]?.header?.alert || "Alert"}
            </Link>
          </li>
          <li>
            <Link
              className={`dropdown-item d-flex align-items-center gap-2${
                location.pathname === "/vitrine" ? " dropdown-item-active" : ""
              }`}
              to="/vitrine"
            >
              <i className="bi bi-shop" style={{ color: "#222" }}></i>
              {t[lang]?.header?.vitrine || "Vitrine"}
            </Link>
          </li>
          {/* <li>
            <button
              className={`dropdown-item d-flex align-items-center gap-2${
                showNotifications ? " dropdown-item-active" : ""
              }`}
              onClick={toggleNotifications}
              style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left' }}
            >
              <i className="bi bi-app-indicator" style={{ color: "#222" }}></i>
              {t[lang]?.header?.notifications || "Notifications"}
            </button>
          </li> */}
          <li>
            <Link
              className={`dropdown-item d-flex align-items-center gap-2${
                location.pathname === "/favoris" ? " dropdown-item-active" : ""
              }`}
              to="/favoris"
            >
              <i className="bi bi-heart" style={{ color: "#222" }}></i>
              {t[lang]?.header?.favoris || "Favoris"}
            </Link>
          </li>
          <li>
            <Link
              className={`dropdown-item d-flex align-items-center gap-2${
                location.pathname === "/reglages" ? " dropdown-item-active" : ""
              }`}
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
              onClick={handleLogoutClick}
            >
              <i className="bi bi-box-arrow-right"></i>
              {t[lang]?.header?.logout || "Se déconnecter"}
            </button>
          </li>
        </ul>
        
        {/* {showNotifications && (
          <div style={{ position: 'absolute', top: '100%', right: 0, zIndex: 1001 }}>
            <NotificationCard />
          </div>
        )} */}
      </div>
      <LogoutModal />
    </>
  );
};

export default LoginMenu;