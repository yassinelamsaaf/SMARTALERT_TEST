import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";
import "@/../public/sass/components/settings.scss";

const AccountSettingsList = () => {
  const { lang } = useContext(LanguageContext);
  const navigate = useNavigate();
  const accountSettings = [
    {
      icon: <i className="bi bi-person-circle me-2 text-orange" />,
      label: t[lang].settings.changeAlias,
      onClick: () => window.dispatchEvent(new CustomEvent("openAliasModal")),
    },
    {
      icon: <i className="bi bi-phone me-2 text-orange" />,
      label: t[lang].settings.addPhone,
      onClick: () => navigate("/PhoneVerification"),
    },
    {
      icon: <i className="bi bi-bell me-2 text-orange" />,
      label: t[lang].settings.notifications,
      onClick: () => navigate("/settings/notifications"),
    },
    {
      icon: <i className="bi bi-translate me-2 text-orange" />,
      label: t[lang].settings.language,
      onClick: () => window.dispatchEvent(new CustomEvent("openLangModal")),
    },
    {
      icon: <i className="bi bi-trash me-2 text-orange" />,
      label: t[lang].settings.deleteAccount,
      onClick: () => window.dispatchEvent(new CustomEvent("openDeleteModal")),
    },
    {
      icon: <i className="bi bi-box-arrow-right me-2 text-orange" />,
      label: t[lang].settings.logout,
      onClick: () => window.dispatchEvent(new CustomEvent("openLogoutModal")),
    },
  ];
  return (
    <>
      <h2 className="settings-section-title text-orange mb-3">
        {t[lang].settings.accountTitle}
      </h2>
      <ul className="settings-list list-unstyled mb-4">
        {accountSettings.map((item, idx) => (
          <li
            key={idx}
            className="settings-item d-flex align-items-center justify-content-between py-2"
            onClick={item.onClick}
          >
            <span>
              {item.icon}
              {item.label}
            </span>
            <i className="bi bi-chevron-right"></i>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AccountSettingsList;
