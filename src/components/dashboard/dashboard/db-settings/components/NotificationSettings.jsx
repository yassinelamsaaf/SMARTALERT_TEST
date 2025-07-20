import React, { useState, useContext } from "react";
import t from "@/i18n/t";
import { LanguageContext } from "@/i18n/LanguageProvider";

const NotificationSettings = () => {
  const { lang } = useContext(LanguageContext);
  const [phoneEnabled, setPhoneEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <form
      style={{
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
        textAlign: "left",
      }}
      onSubmit={handleSave}
    >
      <div className="text-15 mb-30" style={{ maxWidth: 700 }}>
        {t[lang].accountSettings.notificationSettings.instruction}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          width: "100%",
        }}
      >
        <div
        style={{
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          padding: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "calc(100% - 20px)",
          margin: "0 10px",
        }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <i
              className="icon-mobile"
              style={{ color: "#f45c3b", fontSize: 28 }}
            />
            <span style={{ fontSize: 20, fontWeight: 500 }}>{t[lang].accountSettings.notificationSettings.phone}</span>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={phoneEnabled}
              onChange={() => setPhoneEnabled((v) => !v)}
            />
            <span
              className="slider round"
              style={{ background: phoneEnabled ? "#f45c3b" : "#eee" }}
            ></span>
          </label>
        </div>
        <div
        style={{
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          padding: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "calc(100% - 20px)",
          margin: "0 10px",
        }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <i
              className="icon-mail"
              style={{ color: "#f45c3b", fontSize: 28 }}
            />
            <span style={{ fontSize: 20, fontWeight: 500 }}>{t[lang].accountSettings.notificationSettings.email}</span>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={emailEnabled}
              onChange={() => setEmailEnabled((v) => !v)}
            />
            <span
              className="slider round"
              style={{ background: emailEnabled ? "#f45c3b" : "#eee" }}
            ></span>
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="button h-50 px-24 mc-to-w-btn"
        style={{ fontWeight: 600, minWidth: 180, marginTop: 32 }}
      >
        {t[lang].accountSettings.notificationSettings.save}
      </button>
      {saved && (
        <div className="alert alert-success mt-2" style={{ marginTop: 16 }}>
          {t[lang].accountSettings.notificationSettings.success}
        </div>
      )}
    </form>
  );
};

export default NotificationSettings;
