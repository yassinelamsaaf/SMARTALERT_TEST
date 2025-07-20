import React, { useState, useContext } from "react";
import t from "@/i18n/t";
import { LanguageContext } from "@/i18n/LanguageProvider";

const DeleteAccountForm = () => {
  const [confirm, setConfirm] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { lang } = useContext(LanguageContext);

  const handleDelete = (e) => {
    e.preventDefault();
    if (confirm !== t[lang].accountSettings.deleteAccount.confirmText) {
      setError(t[lang].accountSettings.deleteAccount.confirmError);
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1000);
  };

  return (
    <form onSubmit={handleDelete}>
      <div className="mb-20">
        <div className="alert mb-15 text-15 warning-error">
          <strong>{t[lang].accountSettings.deleteAccount.attentionTitle}</strong> {t[lang].accountSettings.deleteAccount.attentionText}
        </div>
        <div className="text-15 mb-10">
          {t[lang].accountSettings.deleteAccount.instruction}
        </div>
      </div>
      <div className="col-12 mb-15">
        <div className="form-input" style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className="lh-1 text-16 text-light-1">{t[lang].accountSettings.deleteAccount.passwordLabel}</label>
          <span
            onClick={() => setShowPassword((v) => !v)}
            style={{
              position: "absolute",
              right: lang === "ar" ? undefined : 12,
              left: lang === "ar" ? 12 : undefined,
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              fontSize: 18,
              color: "#aaa",
              userSelect: "none",
              zIndex: 2,
            }}
            title={showPassword ? t[lang].accountSettings.deleteAccount.hide : t[lang].accountSettings.deleteAccount.show}
          >
            <i className={!showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
          </span>
        </div>
      </div>
      <div className="col-12 mb-70">
        <div className="form-input" style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
          <label className="lh-1 text-16 text-light-1">
            {t[lang].accountSettings.deleteAccount.confirmLabel}
          </label>
          {/* Eye/Eye-slash icon for repeat code field */}
          <span
            onClick={() => setShowPassword((v) => !v)}
            style={{
              position: "absolute",
              right: lang === "ar" ? undefined : 12,
              left: lang === "ar" ? 12 : undefined,
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              fontSize: 18,
              color: "#aaa",
              userSelect: "none",
              zIndex: 2,
            }}
            title={showPassword ? t[lang].accountSettings.deleteAccount.hide : t[lang].accountSettings.deleteAccount.show}
          >
            <i className={!showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
          </span>
        </div>
      </div>
      <div
        className="mb-20 text-14"
        style={{ color: "#bc4800", textAlign: lang === 'fr' ? "left":"right", width: "100%" }}
      >
        {t[lang].accountSettings.deleteAccount.warning}
      </div>
      <button
        type="submit"
        className="btn btn-danger h-50 px-24 py-5 r-to-w-btn"
        disabled={loading || confirm !== t[lang].accountSettings.deleteAccount.confirmText}
      >
        {t[lang].accountSettings.deleteAccount.deleteBtn} <i className="icon-trash ml-15" />
      </button>
      {error && <div className="alert alert-danger mt-2">{error}</div>}
      {success && (
        <div className="alert alert-success mt-2">{t[lang].accountSettings.deleteAccount.success}</div>
      )}
    </form>
  );
};

export default DeleteAccountForm;
