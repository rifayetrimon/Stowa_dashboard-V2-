import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  Cog6ToothIcon,
  UserGroupIcon,
  UsersIcon,
  FolderIcon, // Icon for Category
  PlusCircleIcon, // Icon for Create Category
  ListBulletIcon, // Icon for All Categories
} from "@heroicons/react/24/solid";

import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import { AllUsers, AllSeller } from "@/pages/admin";
import { CategoryList, CreateCategory } from "@/pages/category";


const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "tables",
        path: "/tables",
        element: <Tables />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "notifications",
        path: "/notifications",
        element: <Notifications />,
      },
      // ✅ Category is added here, above Admin
      {
        icon: <FolderIcon className="w-5 h-5 text-inherit" />,
        name: "category",
        isDropdown: true,
        subPages: [
          {
            icon: <ListBulletIcon className="w-5 h-5 text-inherit" />,
            name: "all categories",
            path: "/dashboard/category/all",
            element: <CategoryList />,
          },
        ],
      },
      // ✅ Admin remains below Category
      {
        icon: <Cog6ToothIcon className="w-5 h-5 text-inherit" />,
        name: "admin",
        isDropdown: true,
        subPages: [
          {
            icon: <UserGroupIcon className="w-5 h-5 text-inherit" />,
            name: "all users",
            path: "/dashboard/admin/all-users",
            element: <AllUsers />,
          },
          {
            icon: <UsersIcon className="w-5 h-5 text-inherit" />,
            name: "all sellers",
            path: "/dashboard/admin/all-sellers",
            element: <AllSeller />,
          },
        ],
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
