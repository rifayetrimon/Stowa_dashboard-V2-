"use client"

import { useLocation } from "react-router-dom"
import { Navbar, Typography, IconButton, Breadcrumbs, Input } from "@material-tailwind/react"
import { Cog6ToothIcon, BellIcon, Bars3Icon } from "@heroicons/react/24/solid"
import { useMaterialTailwindController, setOpenConfigurator, setOpenSidenav } from "@/context"
import { UserProfileMenu } from "@/components/navbar/profilePop"

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController()
  const { fixedNavbar, openSidenav } = controller
  const { pathname } = useLocation()
  const [layout, page] = pathname.split("/").filter((el) => el !== "")

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${
        fixedNavbar ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5" : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs className={`bg-transparent p-0 transition-all ${fixedNavbar ? "mt-1" : ""}`}>
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

          {/* User Profile Menu Component */}
          <UserProfileMenu />

          <IconButton variant="text" color="blue-gray">
            <BellIcon className="h-5 w-5 text-blue-gray-500" />
          </IconButton>

          <IconButton variant="text" color="blue-gray" onClick={() => setOpenConfigurator(dispatch, true)}>
            <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
          </IconButton>
        </div>
      </div>
    </Navbar>
  )
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx"

export default DashboardNavbar
