import React, { useContext } from "react";
import MoreSettingsList from "@/components/settings/MoreSettingsList";
import LanguageMegaMenu from "@/components/header/S_LanguageMegaMenu";
import t from "@/i18n/t";
import { LanguageContext } from "@/i18n/LanguageProvider";

const OtherSettings = () => {
  const { lang } = useContext(LanguageContext);
  return (
    <>
      <ul className="settings-list list-unstyled mb-4">
        <li className="settings-item d-flex align-items-center justify-content-between py-2">
          <span>
            <i className="bi bi-translate me-2 text-orange" />
            {t[lang].accountSettings.otherSettings.language}
          </span>
          {/* Render the language selector button exactly as in the header */}
          <LanguageMegaMenu textClass="" />
        </li>
      </ul>
      <MoreSettingsList />
    </>
  );
};

export default OtherSettings;
