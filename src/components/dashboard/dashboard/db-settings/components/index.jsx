import React, { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

import PasswordInfo from "./PasswordInfo";
import LocationInfo from "./LocationInfo";
import AccountActionsPanel from "./AccountActionsPanel";
import NotificationSettings from "./NotificationSettings";
import LanguageModal from "@/components/settings/LanguageModal";
import MoreSettingsList from "@/components/settings/MoreSettingsList";
import OtherSettings from "./OtherSettings";


import t from "@/i18n/t";
import { LanguageContext } from "@/i18n/LanguageProvider";

const tabsConfig = [
  {
    labelKey: "personalInfo",
    content: <AccountActionsPanel />,
  },
  {
    labelKey: "changePassword",
    content: <PasswordInfo />,
  },
  {
    labelKey: "notifications",
    content: <NotificationSettings />,
  },
  {
    labelKey: "other",
    content: <OtherSettings />,
  },
];

const Index = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const { lang } = React.useContext(LanguageContext);

  return (
    <Tabs
      className="tabs -underline-2 js-tabs"
      selectedIndex={tabIndex}
      onSelect={(index) => setTabIndex(index)}
    >
      <TabList className="tabs__controls row x-gap-40 y-gap-10 lg:x-gap-20" style={{ justifyContent: 'center', display: 'flex' }}>
      {/* <TabList className="tabs__controls row x-gap-40 y-gap-10 lg:x-gap-20"> */}
        {tabsConfig.map((tab, index) => (
          <Tab key={index} className="col-auto">
            <button className="tabs__button text-18 lg:text-16 text-light-1 fw-500 pb-5 lg:pb-0 js-tabs-button">
              {t[lang].accountSettings.tabs[tab.labelKey]}
            </button>
          </Tab>
        ))}
      </TabList>

      <div className="tabs__content pt-30 js-tabs-content">
        {tabsConfig.map((tab, index) => (
          <TabPanel
            key={index}
            className={`-tab-item-${index + 1} ${tabIndex === index ? "is-tab-el-active" : ""}`}
          >
            {tab.content}
          </TabPanel>
        ))}
      </div>
      {/* Render LanguageModal globally so it can be triggered from anywhere */}
      <LanguageModal />
    </Tabs>
  );
};

export default Index;
