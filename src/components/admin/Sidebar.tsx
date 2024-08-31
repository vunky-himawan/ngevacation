import { Link, useLocation } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";

const Sidebar = ({ isMenuOpen }: { isMenuOpen: boolean }) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const location = useLocation();

  return (
    <>
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-72 bg-white border-r border-gray-200 lg:w-60 xl:w-80 ${
          isMenuOpen && !isDesktop ? "translate-x-0" : "-translate-x-full"
        } transition-all duration-300 ease-in-out ${
          isDesktop && "translate-x-0"
        }`}
      >
        <div className="flex flex-col gap-5 p-5 mt-[4.8rem] h-full">
          <ul className="flex flex-col gap-3">
            <li>
              <Link
                to="/admin"
                className={`py-3 px-5 rounded-full flex gap-5 items-center ${
                  location.pathname === "/admin"
                    ? "bg-orange-500 text-white"
                    : "hover:bg-orange-50"
                }`}
              >
                {location.pathname === "/admin" ? (
                  <span className="icon-[iconamoon--home-duotone] w-6 h-6"></span>
                ) : (
                  <span className="icon-[iconamoon--home-light] w-6 h-6"></span>
                )}
                <p>Home</p>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/hidden-gem/request"
                className={`py-3 px-5 rounded-full flex gap-5 items-center ${
                  location.pathname === "/admin/hidden-gem/request"
                    ? "bg-orange-500 text-white"
                    : "hover:bg-orange-50"
                }`}
              >
                {location.pathname === "/admin/hidden-gem/request" ? (
                  <span className="icon-[iconamoon--file-add-duotone] w-6 h-6"></span>
                ) : (
                  <span className="icon-[iconamoon--file-add-light] w-6 h-6"></span>
                )}
                <p>Hidden Gem Request</p>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/event/request"
                className={`py-3 px-5 rounded-full flex gap-5 items-center ${
                  location.pathname === "/admin/event/request"
                    ? "bg-orange-500 text-white"
                    : "hover:bg-orange-50"
                }`}
              >
                {location.pathname === "/admin/event/request" ? (
                  <span className="icon-[iconamoon--calendar-add-duotone] w-6 h-6"></span>
                ) : (
                  <span className="icon-[iconamoon--calendar-add-light] w-6 h-6"></span>
                )}
                <p>Event Request</p>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/user/report"
                className={`py-3 px-5 rounded-full flex gap-5 items-center ${
                  location.pathname === "/admin/user/report"
                    ? "bg-orange-500 text-white"
                    : "hover:bg-orange-50"
                }`}
              >
                {location.pathname === "/admin/user/report" ? (
                  <span className="icon-[iconamoon--flag-duotone] w-6 h-6"></span>
                ) : (
                  <span className="icon-[iconamoon--flag-light] w-6 h-6"></span>
                )}
                <p>User Report</p>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
