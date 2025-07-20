import React, { useState, useRef, useEffect } from "react";
import NotificationCard from "../notifications/notificationCard";
import { useContext } from "react";
import { LanguageContext } from "../../i18n/LanguageProvider";

const NotificationButton = () => {
  const { lang } = useContext(LanguageContext);
  const [showNotifications, setShowNotifications] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };
    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifications]);

  return (
    <div style={{ position: "relative" }} ref={buttonRef}>
      <button
        className="btn btn-icon"
        style={{ border: "none", padding: 0, background: "none" }}
        aria-label="Notifications"
        onClick={() => setShowNotifications((v) => !v)}
      >
        <i
          className={showNotifications ? "bi bi-bell-fill" : "bi bi-bell"}
          style={{ fontSize: 18, color: "#fff" }}
        ></i>
      </button>
      {showNotifications && (
        <div style={{ position: "absolute", top: "100%", [lang === 'ar' ? 'left' : 'right']: 0, zIndex: 1001 }}>
          <NotificationCard />
        </div>
      )}
    </div>
  );
};

export default NotificationButton;
