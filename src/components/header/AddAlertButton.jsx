import React from "react";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { LanguageContext } from "../../i18n/LanguageProvider";
import t from "../../i18n/t";
import { useAuthUser } from "../../utils/useAuthUser";

const AddAlertButton = () => {
  const { lang } = useContext(LanguageContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { user } = useAuthUser();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="" style={{ display: windowWidth < 768 ? "none" : "block" }}>
      <Link
        to={user ? "/alerts/add" : "/login"}
        style={{
          background: "#fff",
          color: "var(--color-dark-3)",
          fontWeight: 600,
          borderRadius: 6,
          margin: "4px 0",
          padding: windowWidth < 768 ? "6px 12px" : "6px 40px",
          fontSize: windowWidth < 768 ? "13px" : "16px",
        }}
        className="btn btn-outline-light addalert-hover-switch d-flex align-items-center"
      >
        {t[lang].header.ajouterAlerte}
        <i
          className="bi bi-bell"
          style={{
            fontSize: "15px",
            marginLeft: lang === "ar" ? undefined : "5px",
            marginRight: lang === "ar" ? "5px" : undefined,
            display: windowWidth < 768 ? "none" : "block",
          }}
        ></i>
      </Link>
    </div>
  );
};

export default AddAlertButton;
