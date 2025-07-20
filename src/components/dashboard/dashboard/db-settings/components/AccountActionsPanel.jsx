
import React, { useState, useContext } from "react";
import ChangeAliasForm from "./ChangeAliasForm";
import DeleteAccountForm from "./DeleteAccountForm";
import AddPhoneForm from "./AddPhoneForm";
import LogoutPanel from "./LogoutPanel";
import t from "@/i18n/t";
import { LanguageContext } from "@/i18n/LanguageProvider";
import "@/../public/sass/components/AccountActions.scss";

const actions = [
  { key: "alias", labelKey: "alias" },
  { key: "phone", labelKey: "phone" },
  { key: "logout", labelKey: "logout" },
  { key: "delete", labelKey: "delete" },
];

const AccountActionsPanel = () => {
  const { lang } = useContext(LanguageContext);
  const [selected, setSelected] = useState("alias");
  const isRTL = lang === "ar";
  const [animKey, setAnimKey] = useState(0);

  // Animation direction
  const animationClass = isRTL ? "account-actions-anim fadeInLeft" : "account-actions-anim fadeInRight";

  // When menu changes, trigger animation
  const handleMenuClick = (key) => {
    setSelected(key);
    setAnimKey(prev => prev + 1); // force remount for animation
  };


  const accountActionsMenu = () => (
    <div className="account-actions-menu">
      <ul>
        {actions.map((action) => (
          <li key={action.key}>
            <div
              className={`account-action-item${selected === action.key ? " selected" : ""}`}
              onClick={() => handleMenuClick(action.key)}
            >
              <span>{t[lang].accountSettings.menu[action.labelKey]}</span>
              <i className={`bi bi-chevron-${isRTL ? "left" : "right"}${selected === action.key ? " selected" : ""}`}></i>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )

  const accountActionsContent = () => (
    <div className="account-actions-content">
      {/* Use inline style for animation to ensure it triggers on key change */}
      <div
        key={animKey}
        style={{
          animation: `${isRTL ? "fadeInRight" : "fadeInLeft"} 0.35s cubic-bezier(.4,0,.2,1)`,
          animationFillMode: "both"
        }}
      >
        {selected === "alias" && <ChangeAliasForm />}
        {selected === "delete" && <DeleteAccountForm />}
        {selected === "phone" && <AddPhoneForm />}
        {selected === "logout" && <LogoutPanel />}
      </div>
    </div>
  )
  return (
    <div className={`account-actions-panel${isRTL ? " rtl" : ""}`}>
        {isRTL
        ? <>
            {accountActionsContent()}
            {accountActionsMenu()}
            </>
        : <>
            {accountActionsMenu()}
            {accountActionsContent()}
            </>
        }
      
    </div>
  );
};

export default AccountActionsPanel;
