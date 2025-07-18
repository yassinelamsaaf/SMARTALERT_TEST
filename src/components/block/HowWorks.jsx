import { getImgPath } from "../../utils/imageUtils";
import React from "react";

const HowWorks = () => {
  const blockContent = [
    {
      id: 1,
      icon: getImgPath("pages/become-expert/icons/1.svg"),
      no: "01",
      title: "Sign up",
      lineIcon: getImgPath("pages/become-expert/lines/1.svg"),
      isLineIcon: "yes",
    },
    {
      id: 2,
      icon: getImgPath("pages/become-expert/icons/2.svg"),
      no: "02",
      title: "Add your services",
      lineIcon: getImgPath("pages/become-expert/lines/2.svg"),
      isLineIcon: "yes",
    },
    {
      id: 3,
      icon: getImgPath("pages/become-expert/icons/3.svg"),
      no: "03",
      title: "Get bookings",
      lineIcon: "",
      isLineIcon: "no",
    },
  ];
  return (
    <>
      {blockContent.map((item) => (
        <React.Fragment key={item.id}>
          <div className="col-xl-2 col-lg-3 col-md-6">
            <div className="d-flex flex-column items-center text-center">
              <div className="relative size-120 flex-center rounded-full bg-green-1">
                <img src={item.icon} alt="image" />
                <div className="side-badge">
                  <div className="size-40 flex-center rounded-full bg-yellow-1">
                    <span className="text-15 fw-500">{item.no}</span>
                  </div>
                </div>
              </div>
              <div className="text-18 fw-500 mt-30 sm:mt-20">{item.title}</div>
            </div>
          </div>
          {/* End .col */}

          {item.isLineIcon == "yes" ? (
            <>
              <div className="col-auto xl:d-none">
                <div className="pt-30">
                  <img src={item.lineIcon} alt="icon" />
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export default HowWorks;
