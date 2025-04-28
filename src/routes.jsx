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
  FolderIcon,
  ListBulletIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";

import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import { AllUsers, AllSeller } from "@/pages/admin";
import { CategoryList } from "@/pages/category";
import Products from "@/pages/product/Products";
import Orders from "./pages/orders/Orders";

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
      {
        icon: <ShoppingBagIcon {...icon} />,
        name: "orders",
        path: "/orders",
        element: <Orders />,
      },
      {
        icon: <FolderIcon {...icon} />,
        name: "category",
        isDropdown: true,
        subPages: [
          {
            icon: <ListBulletIcon {...icon} />,
            name: "all categories",
            path: "/dashboard/category/all",
            element: <CategoryList />,
          },
        ],
      },
      {
        icon: <FolderIcon {...icon} />,
        name: "product",
        path: "/products",
        element: <Products />,
      },
      {
        icon: <Cog6ToothIcon {...icon} />,
        name: "admin",
        isDropdown: true,
        subPages: [
          {
            icon: <UserGroupIcon {...icon} />,
            name: "all users",
            path: "/dashboard/admin/all-users",
            element: <AllUsers />,
          },
          {
            icon: <UsersIcon {...icon} />,
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
