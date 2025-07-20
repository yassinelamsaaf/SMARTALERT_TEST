import React, { useContext } from "react";
import t from "@/i18n/t";
import { LanguageContext } from "@/i18n/LanguageProvider";

const LogoutPanel = () => {
  const { lang } = useContext(LanguageContext);
  const handleLogout = () => {
    window.location.href = "/";
  };
  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:'320px', textAlign:'center'}}>
      <div style={{maxWidth:400}}>
        <i className="bi bi-person-circle" style={{fontSize:48, color:'var(--color-dark-3)', marginBottom:16}}></i>
        <h2 style={{color:'var(--color-dark-3)', marginBottom:8}}>{t[lang].accountSettings.logoutPanel.title}</h2>
        <p style={{fontSize:16, marginBottom:24}}>
          {t[lang].accountSettings.logoutPanel.message}<br/>
        </p>
        <button className="btn btn-secondary r-to-w-btn" style={{margin:'0 auto', display:'block', minWidth:180, fontWeight:600}} onClick={handleLogout}>
          {t[lang].accountSettings.logoutPanel.button}
          <i className="bi bi-box-arrow-right text-15 mx-5"></i>
        </button>
      </div>
    </div>
  );
};

export default LogoutPanel;
