import { useState, useContext, useEffect } from "react";
import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";
import { useAuthUser } from "@/utils/useAuthUser";

const LogoutModal = () => {
  const { lang } = useContext(LanguageContext);
  const { handleLogout } = useAuthUser();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const open = () => setShow(true);
    window.addEventListener("openLogoutModal", open);
    return () => window.removeEventListener("openLogoutModal", open);
  }, []);

  if (!show) return null;

  const handleLogoutAndRedirect = () => {
    handleLogout();
    setShow(false);
    window.location.href = "/";
  };

  return (
    <div className="settings-lang-modal">
      <div className="settings-lang-modal-bg" onClick={() => setShow(false)} />
      <div className="settings-lang-modal-content text-center">
        <div className="mb-3">
          <i className="bi bi-box-arrow-right text-orange" style={{ fontSize: 32 }}></i>
        </div>
        <div className="mb-3 fw-bold">
          {t[lang].settings.logoutConfirmTitle}
        </div>
        <div className="d-flex gap-2 justify-content-center">
          <button className="btn btn-danger" onClick={handleLogoutAndRedirect}>
            {t[lang].settings.logoutConfirmYes}
          </button>
          <button className="btn btn-secondary" onClick={() => setShow(false)}>
            {t[lang].settings.logoutConfirmNo}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
