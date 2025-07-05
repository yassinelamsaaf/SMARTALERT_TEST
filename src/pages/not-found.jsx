import CallToActions from "@/components/common/CallToActions";
import Footer2 from "@/components/footer/footer-2";
import NotFound from "@/components/common/S_NotFound";

import MetaComponent from "@/components/common/MetaComponent";
import Header1 from "@/components/header/header-1";

const metadata = {
  title: "404 || GoTrip - Travel & Tour ReactJs Template",
  description: "GoTrip - Travel & Tour ReactJs Template",
};

const NotFoundPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <Header1 />
      {/* End Header 1 */}

      <NotFound />
      {/* End 404 section */}

      <Footer2 />
      {/* End Call To Actions Section */}
    </>
  );
};

export default NotFoundPage;
