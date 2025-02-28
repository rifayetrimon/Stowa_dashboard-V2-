import { useState } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";

export function Sidenav({ brandImg, brandName, routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const [dropdownOpen, setDropdownOpen] = useState({}); // ✅ State for multiple dropdowns

  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };

  // ✅ Function to toggle each dropdown separately
  const toggleDropdown = (menuName) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [menuName]: !prev[menuName], // Toggle only the clicked menu
    }));
  };

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
    >
      {/* Brand Logo and Name */}
      <div className="relative flex items-center py-6 px-8">
        <img src={brandImg} alt="Brand Logo" className="h-6 w-auto" />
        <Typography
          variant="h6"
          color={sidenavType === "dark" ? "blue-gray" : "white"}
          className="ml-3"
        >
          {brandName || "Brand Name"} {/* Fallback for brandName */}
        </Typography>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>

      {/* Sidebar Navigation Links */}
      <div className="m-4">
        {routes.map(({ layout, title, pages }, key) => (
          <ul key={key} className="mb-4 flex flex-col gap-1">
            {title && (
              <li className="mx-3.5 mt-4 mb-2">
                <Typography
                  variant="small"
                  color={sidenavType === "dark" ? "white" : "blue-gray"}
                  className="font-black uppercase opacity-75"
                >
                  {title || "Title"} {/* Fallback for title */}
                </Typography>
              </li>
            )}
            {pages.map(({ icon, name, path, isDropdown, subPages }) => (
              <li key={name}>
                {isDropdown ? (
                  // Dropdown Menu (Category/Admin)
                  <div>
                    <Button
                      variant="text"
                      color={sidenavType === "dark" ? "white" : "blue-gray"}
                      className="flex items-center justify-between gap-4 px-4 w-full"
                      fullWidth
                      onClick={() => toggleDropdown(name)} // ✅ Toggle each menu separately
                    >
                      <div className="flex items-center gap-4">
                        {icon}
                        <Typography color="inherit" className="font-medium capitalize">
                          {name || "Menu Item"} {/* Fallback for name */}
                        </Typography>
                      </div>
                      <ChevronDownIcon
                        className={`h-4 w-4 transition-transform ${
                          dropdownOpen[name] ? "rotate-180" : ""
                        }`}
                      />
                    </Button>
                    {dropdownOpen[name] && (
                      <ul className="ml-8 mt-2">
                        {subPages.map(({ icon, name, path }) => (
                          <li key={name}>
                            <NavLink to={path}>
                              {({ isActive }) => (
                                <Button
                                  variant={isActive ? "gradient" : "text"}
                                  color={
                                    isActive
                                      ? sidenavColor
                                      : sidenavType === "dark"
                                      ? "white"
                                      : "blue-gray"
                                  }
                                  className="flex items-center gap-4 px-4 capitalize"
                                  fullWidth
                                >
                                  {icon}
                                  <Typography color="inherit" className="font-medium capitalize">
                                    {name || "Sub Menu Item"} {/* Fallback for name */}
                                  </Typography>
                                </Button>
                              )}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  // Normal Sidebar Menu
                  <NavLink to={`/${layout}${path}`}>
                    {({ isActive }) => (
                      <Button
                        variant={isActive ? "gradient" : "text"}
                        color={
                          isActive
                            ? sidenavColor
                            : sidenavType === "dark"
                            ? "white"
                            : "blue-gray"
                        }
                        className="flex items-center gap-4 px-4 capitalize"
                        fullWidth
                      >
                        {icon}
                        <Typography color="inherit" className="font-medium capitalize">
                          {name || "Menu Item"} {/* Fallback for name */}
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </aside>
  );
}

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;