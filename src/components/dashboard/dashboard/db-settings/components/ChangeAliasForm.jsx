import React, { useState, useContext } from "react";
import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";

const ChangeAliasForm = () => {
  const [alias, setAlias] = useState("Yassine");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { lang } = useContext(LanguageContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-20">
        <div className="text-16 text-dark-3 fw-500 mb-5">{t[lang].accountSettings.changeAlias.current}</div>
        <div className="current-alias-box mb-15" style={{background:'#f5f5f5',borderRadius:8,padding:'10px 16px',fontWeight:500}}>{alias}</div>
        <div className="text-15 text-light-1 mb-15">{t[lang].accountSettings.changeAlias.instruction}</div>
      </div>
      <div className="col-12">
        <div className="form-input">
          <input type="text" value={alias} onChange={e => setAlias(e.target.value)} required />
          <label className="lh-1 text-16 text-light-1">{t[lang].accountSettings.changeAlias.label}</label>
        </div>
      </div>
      <button
        type="submit"
        className="button h-50 px-24 py-5 mt-20 mc-to-w-btn"
      >
        {t[lang].accountSettings.changeAlias.saveBtn}
        <div className={
          lang === "ar"
            ? "bi bi-check text-25 mr-15"
            : "bi bi-check text-25 ml-15"
        } />
      </button>
      {error && <div className="alert alert-danger mt-2">{t[lang].accountSettings.changeAlias.error}</div>}
      {success && <div className="alert alert-success mt-2">{t[lang].accountSettings.changeAlias.success}</div>}
    </form>
  );
};

export default ChangeAliasForm;
