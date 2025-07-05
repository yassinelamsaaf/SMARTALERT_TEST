import { Link } from "react-router-dom";

import { isActiveLink } from "@/utils/linkActiveChecker";
import { useLocation } from "react-router-dom";
import { getImgPath } from "../../../../utils/imageUtils";

const Sidebar = () => {
  const { pathname } = useLocation();

  const sidebarContent = [
    {
      id: 1,
      icon: getImgPath("dashboard/sidebar/compass.svg"),
      name: "Dashboard",
      routePath: "/dashboard/db-dashboard",
    },
    {
      id: 2,
      icon: getImgPath("dashboard/sidebar/booking.svg"),
      name: " Booking History",
      routePath: "/dashboard/db-booking",
    },
    {
      id: 3,
      icon: getImgPath("dashboard/sidebar/bookmark.svg"),
      name: "Wishlist",
      routePath: "/dashboard/db-wishlist",
    },
    {
      id: 4,
      icon: getImgPath("dashboard/sidebar/gear.svg"),
      name: " Settings",
      routePath: "/dashboard/db-settings",
    },
    {
      id: 5,
      icon: getImgPath("dashboard/sidebar/log-out.svg"),
      name: " Logout",
      routePath: "/login",
    },
  ];
  return (
    <div className="sidebar -dashboard">
      {sidebarContent.map((item) => (
        <div className="sidebar__item" key={item.id}>
          <div
            className={`${
              isActiveLink(item.routePath, pathname) ? "-is-active" : ""
            } sidebar__button `}
          >
            <Link
              to={item.routePath}
              className="d-flex items-center text-15 lh-1 fw-500"
            >
              <img src={item.icon} alt="image" className="mr-15" />
              {item.name}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
