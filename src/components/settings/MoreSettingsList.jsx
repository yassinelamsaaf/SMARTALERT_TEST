import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";

const MoreSettingsList = () => {
  const { lang } = useContext(LanguageContext);
  const navigate = useNavigate();
  const moreSettings = [
    {
      icon: <i className="bi bi-book me-2 text-orange" />,
      label: t[lang].settings.about,
      onClick: () => navigate("/about"),
    },
    {
      icon: <i className="bi bi-book me-2 text-orange" />,
      label: t[lang].settings.terms,
      onClick: () => navigate("/terms"),
    },
  ];
  return (
    <>
      <h4 className="settings-section-title text-orange mb-3">
        {t[lang].settings.more}
      </h4>
      <ul className="settings-list list-unstyled mb-0">
        {moreSettings.map((item, idx) => (
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

export default MoreSettingsList;
