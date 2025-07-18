import { Link } from "react-router-dom";
import { getImgPath } from "../../../../utils/imageUtils";

const Sidebar = () => {
  const sidebarData = [
    {
      icon: getImgPath("dashboard/sidebar/booking.svg"),
      title: "Manage Hotel",
      links: [
        { title: "All Hotel", href: "#" },
        { title: "Add Hotel", href: "#" },
        { title: "Recovery", href: "#" },
      ],
    },
    {
      icon: getImgPath("dashboard/sidebar/map.svg"),
      title: "Manage Tour",
      links: [
        { title: "All Tour", href: "#" },
        { title: "Add Tour", href: "#" },
        { title: "Recovery", href: "#" },
      ],
    },
    {
      icon: getImgPath("dashboard/sidebar/sneakers.svg"),
      title: "Manage Activity",
      links: [
        { title: "All Activity", href: "#" },
        { title: "Add Activity", href: "#" },
        { title: "Recovery", href: "#" },
      ],
    },
    {
      icon: getImgPath("dashboard/sidebar/house.svg"),
      title: "Manage Holiday Rental",
      links: [
        {
          title: "All Holiday Rental",
          href: "#",
        },
        {
          title: "Add Holiday Rental",
          href: "#",
        },
        {
          title: "Recovery",
          href: "#",
        },
      ],
    },
    {
      icon: getImgPath("dashboard/sidebar/taxi.svg"),
      title: "Manage Car",
      links: [
        {
          title: "All Car",
          href: "#",
        },
        {
          title: "Add Car",
          href: "#",
        },
        {
          title: "Recovery",
          href: "#",
        },
      ],
    },
    {
      icon: getImgPath("dashboard/sidebar/canoe.svg"),
      title: "Manage Cruise",
      links: [
        {
          title: "All Cruise",
          href: "#",
        },
        {
          title: "Add Cruise",
          href: "#",
        },
        {
          title: "Recovery",
          href: "#",
        },
      ],
    },
    {
      icon: getImgPath("dashboard/sidebar/airplane.svg"),
      title: "Manage Flights",
      links: [
        {
          title: "All Flights",
          href: "#",
        },
        {
          title: "Add Flights",
          href: "#",
        },
        {
          title: "Recovery",
          href: "#",
        },
      ],
    },
  ];

  return (
    <>
      <div className="sidebar -dashboard" id="vendorSidebarMenu">
        <div className="sidebar__item ">
          <Link
            to="/dashboard/db-dashboard"
            className="sidebar__button d-flex items-center text-15 lh-1 fw-500"
          >
            <img
              src={getImgPath("dashboard/sidebar/compass.svg")}
              alt="image"
              className="mr-15"
            />
            Dashboard
          </Link>
        </div>
        {/* End accordion__item */}

        <div className="sidebar__item ">
          <a
            href="#"
            className="sidebar__button d-flex items-center text-15 lh-1 fw-500"
          >
            <img
              src={getImgPath("dashboard/sidebar/booking.svg")}
              alt="image"
              className="mr-15"
            />
            Booking Manager
          </a>
        </div>
        {/* End accordion__item */}

        {sidebarData.map((item, index) => (
          <div className="sidebar__item" key={index}>
            <div className="accordion -db-sidebar js-accordion">
              <div className="accordion__item">
                <div
                  className="accordion__button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#sidebarItem${index}`}
                >
                  <div className="sidebar__button col-12 d-flex items-center justify-between">
                    <div className="d-flex items-center text-15 lh-1 fw-500">
                      <img src={item.icon} alt="image" className="mr-10" />
                      {item.title}
                    </div>
                    <div className="icon-chevron-sm-down text-7" />
                  </div>
                </div>
                <div
                  id={`sidebarItem${index}`}
                  className="collapse"
                  data-bs-parent="#vendorSidebarMenu"
                >
                  <ul className="list-disc pt-15 pb-5 pl-40">
                    {item.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a href={link.href} className="text-15">
                          {link.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="sidebar__item ">
          <a
            href="#"
            className="sidebar__button d-flex items-center text-15 lh-1 fw-500"
          >
            <img
              src={getImgPath("dashboard/sidebar/log-out.svg")}
              alt="image"
              className="mr-15"
            />
            Logout
          </a>
        </div>
        {/* End accordion__item */}
      </div>
    </>
  );
};

export default Sidebar;
