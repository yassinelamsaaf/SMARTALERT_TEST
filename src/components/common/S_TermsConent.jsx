import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";
import { useContext } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

const TermsConent = () => {
  const { lang } = useContext(LanguageContext)
  return (
    <Tabs>
      <div className="row y-gap-30">
        <div className="col-lg-3">
          <div className="px-30 py-30 rounded-4 border-light">
            <TabList className="tabs__controls row y-gap-10 js-tabs-controls">
              {t[lang].terms.map((term, index) => {
                return (
                  <Tab key={index} className="col-12 tabs__button js-tabs-button">
                    {term.tab_title}
                  </Tab>
                );
              })}
            </TabList>
          </div>
        </div>
        {/* End .col-lg-3 */}

        <div className="col-lg-9">
          {t[lang].terms.map((term, index) => {
            return (
              <TabPanel key={index}>
                <div className="tabs__content js-tabs-content" data-aos="fade">
                  <h1 className="text-30 fw-600 mb-15">{term.title}</h1>
                  {term.content.map((content, index2) => {
                    return (
                      <div key={index2}>
                        <h2 className="text-16 fw-600">{content.title}</h2>
                        <p className="text-15 text-dark-1 mt-5" dangerouslySetInnerHTML={{__html: content.body}}/>
                      </div>
                    );
                  })}
                </div>
              </TabPanel>
            );
          })}

        </div>
        {/* End col-lg-9 */}
      </div >
    </Tabs >
  );
};

export default TermsConent;
