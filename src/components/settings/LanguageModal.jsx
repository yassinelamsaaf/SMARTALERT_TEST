import { useState, useContext, useEffect } from "react";
import LanguageMegaMenu from "@/components/header/S_LanguageMegaMenu";
import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";

const LanguageModal = () => {
  const { lang } = useContext(LanguageContext);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const open = () => setShow(true);
    window.addEventListener("openLangModal", open);
    return () => window.removeEventListener("openLangModal", open);
  }, []);
  if (!show) return null;
  return (
    <div className="settings-lang-modal">
      <div className="settings-lang-modal-bg" onClick={() => setShow(false)} />
      <div className="settings-lang-modal-content">
        <LanguageMegaMenu />
        <button className="btn btn-sm btn-secondary mt-3" onClick={() => setShow(false)}>
          {t[lang].header.close || "Fermer"}
        </button>
      </div>
    </div>
  );
};
export default LanguageModal;
