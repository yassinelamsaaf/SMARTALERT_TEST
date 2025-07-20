import MetaComponent from "@/components/common/MetaComponent";
import Header1 from "@/components/header/header-1";
import Footer2 from "@/components/footer/footer-2";
import AccountSettingsList from "@/components/settings/AccountSettingsList";
import MoreSettingsList from "@/components/settings/MoreSettingsList";
import LanguageModal from "@/components/settings/LanguageModal";
import LogoutModal from "@/components/settings/LogoutModal";
import DeleteAccountModal from "@/components/settings/DeleteAccountModal";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/apis/CurrentUserApi";
import "@/../public/sass/components/settings.scss";
import ChangeAliasModal from "@/components/settings/ChangeAliasModal";
import NotificationsSettings from "./NotificationsSettings";

const metadata = {
  title: "Settings || SMARTALERT",
  description: "SMARTALERT Settings",
};

const SettingsPage = () => {
  const [showNotificationsSettings, setShowNotificationsSettings] = useState(false);
  useEffect(() => {
    getCurrentUser().then((user) => {
      console.log("Current user from DB:", user);
    });
    const openHandler = () => setShowNotificationsSettings(true);
    window.addEventListener("openNotificationsSettings", openHandler);
    return () => window.removeEventListener("openNotificationsSettings", openHandler);
  }, []);

  return (
    <>
      <MetaComponent meta={metadata} />
      <div className="header-margin"></div>
      <Header1 />
      <section className=" layout-pb-lg">
        <div
          className="container min-h-400 d-flex justify-center align-items-center"
          style={{ minHeight: 400 }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              className="px-40 py-40 sm:px-20 sm:py-20 bg-white shadow-4 rounded-4"
              style={{
                minWidth: 200,
                maxWidth: 1400,
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              <AccountSettingsList />
              <MoreSettingsList />
            </div>
          </div>
        </div>
      </section>
      <Footer2 />
      <LanguageModal />
      <LogoutModal />
      <DeleteAccountModal />
      <ChangeAliasModal/>
      {showNotificationsSettings && (
        <div className="settings-lang-modal">
          <div className="settings-lang-modal-bg" onClick={() => setShowNotificationsSettings(false)} />
          <div className="settings-lang-modal-content text-center">
            <NotificationsSettings onClose={() => setShowNotificationsSettings(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default SettingsPage;
