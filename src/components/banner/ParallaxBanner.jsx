import { Parallax } from "react-parallax";
import { Link } from "react-router-dom";
import { getImgPath } from "../../utils/imageUtils";

const ParallaxBanner = () => {
  return (
    <Parallax
      strength={200}
      bgImage=getImgPath("backgrounds/4.png")
      bgImageAlt="amazing place"
      bgClassName="object-fit-cover"
    >
      <div className="section-bg layout-pt-xl layout-pb-xl">
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-auto" data-aos="fade">
              <div className="text-white mb-10">Happy Holiday</div>
              <h2 className="text-40 text-white">
                Get Amazing Rates at Hotels Worldwide
              </h2>
              <div className="d-inline-block mt-30">
                <Link
                  to="/hotel-list-v5"
                  className="button -md -blue-1 bg-white text-dark-1"
                >
                  Find Deals
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Parallax>
  );
};

export default ParallaxBanner;
