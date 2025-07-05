import MetaComponent from "@/components/common/MetaComponent";
import Header1 from "@/components/header/header-1";
import Footer2 from "@/components/footer/footer-2";
import AccountSettingsList from "@/components/settings/AccountSettingsList";
import MoreSettingsList from "@/components/settings/MoreSettingsList";
import LanguageModal from "@/components/settings/LanguageModal";
import LogoutModal from "@/components/settings/LogoutModal";
import DeleteAccountModal from "@/components/settings/DeleteAccountModal";
import { useEffect } from "react";
import { getCurrentUser } from "@/apis/mockAPI/CurrentUserApi";
import "@/../public/sass/components/settings.scss";
import ChangeAliasModal from "@/components/settings/ChangeAliasModal";

const metadata = {
  title: "Settings || SMARTALERT",
  description: "SMARTALERT Settings",
};

const SettingsPage = () => {
  useEffect(() => {
    getCurrentUser().then((user) => {
      console.log("Current user from DB:", user);
    });
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
    </>
  );
};

export default SettingsPage;
