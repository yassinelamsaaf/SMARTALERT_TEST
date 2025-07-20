import React from "react";
import Sidebar from "../common/Sidebar";
import Header from "../../../header/header-1/index";
import SettingsTabs from "./components/index";
import Footer from "../../../footer/footer-2/index";
import t from "@/i18n/t";
import { LanguageContext } from "@/i18n/LanguageProvider";
const index = () => {
  const { lang } = React.useContext(LanguageContext);
  return (
    <>
      {/*  */}
      {/* End Page Title */}

      <div className="header-margin"></div>

      <Header />
      {/* End dashboard-header */}

      <div className="dashboard__content bg-light-2 pb-50">
        <div className="col-12 mb-15">
          <h1 className="text-30 lh-14 fw-600">
            <i className="bi bi-gear"></i> {t[lang].accountSettings.pageTitle}
          </h1>
          <div className="text-15 text-light-1 mt-5">
            {t[lang].accountSettings.pageSubtitle}
          </div>
        </div>
        <div className="py-30 px-30 rounded-4 bg-white shadow-3">
          {/* End .col-12 */}
          <SettingsTabs />
        </div>
      </div>
      {/* End .dashboard__content */}
      <Footer />
      {/* End dashbaord content */}
    </>
  );
};

export default index;
