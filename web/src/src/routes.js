import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLocalPolice,
  MdLock,
  MdOutlineShoppingCart,
  MdGavel,
  MdWarehouse,
} from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";

// Admin Imports
import MainDashboard from "views/admin/default";
import Police from "views/admin/police";
import Court from "views/admin/court";
import Investigation from "views/admin/investigation";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";
import RTL from "views/admin/rtl";

// Auth Imports
import SignInCentered from "views/auth/signIn";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: MainDashboard,
  },
  {
    name: "Police",
    layout: "/admin",
    path: "/police",
    icon: (
      <Icon as={MdLocalPolice} width="20px" height="20px" color="inherit" />
    ),
    component: Police,
  },
  {
    name: "Court",
    layout: "/admin",
    path: "/court",
    icon: <Icon as={MdGavel} width="20px" height="20px" color="inherit" />,
    component: Court,
  },
  {
    name: "Investigation",
    layout: "/admin",
    path: "/investigation",
    icon: <Icon as={BiSearchAlt} width="20px" height="20px" color="inherit" />,
    component: Investigation,
  },

  // {
  //   name: "NFT Marketplace",
  //   layout: "/admin",
  //   path: "/nft-marketplace",
  //   icon: (
  //     <Icon
  //       as={MdOutlineShoppingCart}
  //       width="20px"
  //       height="20px"
  //       color="inherit"
  //     />
  //   ),
  //   component: NFTMarketplace,
  //   secondary: true,
  // },
  {
    name: "Prison",
    layout: "/admin",
    icon: <Icon as={MdWarehouse} width="20px" height="20px" color="inherit" />,
    path: "/data-tables",
    component: DataTables,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: Profile,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: SignInCentered,
  },
  // {
  //   name: "RTL Admin",
  //   layout: "/rtl",
  //   path: "/rtl-default",
  //   icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  //   component: RTL,
  // },
];

export default routes;
