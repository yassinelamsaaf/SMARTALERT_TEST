import Header1 from "@/components/header/header-1";
import Footer2 from "@/components/footer/footer-2";
import TermsConent from "@/components/common/S_TermsConent";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Termes & Conditions || SmartAlert",
  // description: "GoTrip - Travel & Tour ReactJs Template",
};

const Terms = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <Header1 />
      {/* End Header 1 */}

      <section className="layout-pt-lg layout-pb-lg">
        <div className="container">
          <div className="tabs js-tabs">
            <TermsConent />
          </div>
        </div>
      </section>
      {/* End terms section */}


      <Footer2 />
      {/* End Call To Actions Section */}
    </>
  );
};

export default Terms;
