import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import myaxios from "@/utils/myaxios";
import {
  Navbar,
  Typography,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Button,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setOpenSidenav,
} from "@/context";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");

  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      myaxios
        .get("users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    window.location.href = "/auth/sign-in"; // Redirect to sign-in page
  };

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${
        fixedNavbar
          ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${
              fixedNavbar ? "mt-1" : ""
            }`}
          >
            <Typography variant="small" color="blue-gray">
              {layout}
            </Typography>
            <Typography variant="small" color="blue-gray">
              {page}
            </Typography>
          </Breadcrumbs>
          <Typography variant="h6" color="blue-gray">
            {page}
          </Typography>
        </div>
        <div className="flex items-center">
          <div className="mr-auto md:mr-4 md:w-56">
            <Input label="Search" />
          </div>
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>

          {/* User Dropdown */}
          <Menu>
            <MenuHandler>
              <div className="flex items-center cursor-pointer">
                <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
                <Typography variant="small" color="blue-gray" className="ml-2">
                  {user ? user.name : "Loading..."}
                </Typography>
              </div>
            </MenuHandler>
            <MenuList className="w-64 border-0 shadow-md p-2">
              {user ? (
                <>
                  <MenuItem className="flex flex-col items-start">
                    <Typography variant="small" color="blue-gray" className="font-bold">
                      {user.name}
                    </Typography>
                    <Typography variant="small" color="gray">
                      {user.email}
                    </Typography>
                    <Typography variant="small" color="gray">
                      {user.phone_number}
                    </Typography>
                    <Typography variant="small" color="blue-gray">
                      Role: <strong>{user.role}</strong>
                    </Typography>
                  </MenuItem>
                  <hr className="my-2" />
                  <MenuItem>
                    <Button
                      color="red"
                      size="sm"
                      fullWidth
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </MenuItem>
                </>
              ) : (
                <MenuItem>
                  <Typography variant="small" color="gray">
                    Loading user details...
                  </Typography>
                </MenuItem>
              )}
            </MenuList>
          </Menu>

          <IconButton variant="text" color="blue-gray">
            <BellIcon className="h-5 w-5 text-blue-gray-500" />
          </IconButton>

          <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => setOpenConfigurator(dispatch, true)}
          >
            <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
          </IconButton>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
