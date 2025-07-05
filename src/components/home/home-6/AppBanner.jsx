import AppBlock from "../../block/AppBlock";
import { getImgPath } from "../../../utils/imageUtils";

const AppBanner = () => {
  return (
    <section className="layout-pt-md layout-pb-lg">
      <div className="container">
        <div className="row y-gap-30 items-center justify-between">
          <div className="col-xl-6">
            <img src={getImgPath("app/2.svg")} alt="image" />
          </div>
          {/* End .col for image left */}

          <div className="col-xl-5">
            <AppBlock />
          </div>
          {/* End .col */}
        </div>
        {/* End .row */}
      </div>
      {/* End .container */}
    </section>
  );
};

export default AppBanner;
