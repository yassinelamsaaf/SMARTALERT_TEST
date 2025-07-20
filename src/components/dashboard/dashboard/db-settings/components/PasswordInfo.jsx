

import React, { useState, useContext } from "react";
import t from "@/i18n/t";
import { LanguageContext } from "@/i18n/LanguageProvider";

const PasswordInfo = () => {
  const { lang } = useContext(LanguageContext);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      <form className="col-xl-9">
        <div className="row x-gap-20 y-gap-20" style={{ justifyContent: 'center', alignItems: 'center' }}>
          <div className="col-12">
            <div className="form-input" style={{ position: "relative" }}>
              <input
                type={showCurrent ? "text" : "password"}
                required
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
              />
              <label className="lh-1 text-16 text-light-1">
                {t[lang].accountSettings.passwordInfo.current}
              </label>
              <span
                onClick={() => setShowCurrent(v => !v)}
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
                title={showCurrent ? t[lang].accountSettings.passwordInfo.hide : t[lang].accountSettings.passwordInfo.show}
              >
                <i className={!showCurrent ? "bi bi-eye-slash" : "bi bi-eye"}></i>
              </span>
            </div>
          </div>
          {/* End col-12 */}

          <div className="col-12">
            <div className="form-input" style={{ position: "relative" }}>
              <input
                type={showNew ? "text" : "password"}
                required
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
              />
              <label className="lh-1 text-16 text-light-1">{t[lang].accountSettings.passwordInfo.new}</label>
              <span
                onClick={() => setShowNew(v => !v)}
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
                title={showNew ? t[lang].accountSettings.passwordInfo.hide : t[lang].accountSettings.passwordInfo.show}
              >
                <i className={!showNew ? "bi bi-eye-slash" : "bi bi-eye"}></i>
              </span>
            </div>
          </div>
          {/* End col-12 */}

          <div className="col-12">
            <div className="form-input" style={{ position: "relative" }}>
              <input
                type={showConfirm ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
              <label className="lh-1 text-16 text-light-1">
                {t[lang].accountSettings.passwordInfo.confirm}
              </label>
              <span
                onClick={() => setShowConfirm(v => !v)}
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
                title={showConfirm ? t[lang].accountSettings.passwordInfo.hide : t[lang].accountSettings.passwordInfo.show}
              >
                <i className={!showConfirm ? "bi bi-eye-slash" : "bi bi-eye"}></i>
              </span>
            </div>
          </div>
          {/* End col-12 */}

          <div className="col-12">
            <div className="row x-gap-10 y-gap-10" style={{ justifyContent: 'center', alignItems: 'center' }}>
              <div className="col-auto">
                <button
                  type="submit"
                  className="button h-50 px-24 mc-to-w-btn"
                >
                  {t[lang].accountSettings.passwordInfo.save} <div className="icon-arrow-top-right ml-15" />
                </button>
              </div>
            </div>
          </div>
          {/* End col-12 */}
        </div>
      </form>
    </div>
  );
};

export default PasswordInfo;
