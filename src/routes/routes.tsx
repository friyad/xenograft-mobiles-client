import App from "@/App";
import SmartphoneCardDetails from "@/pages/SmartphoneDetails";
import Inventory from "@/pages/Inventory";
import Sell from "@/pages/Sell";
import SellsHistory from "@/pages/SellsHistory";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import SmartphoneUpdate from "@/pages/SmartphoneUpdate";
import { createBrowserRouter } from "react-router-dom";
import AddSmartphone from "@/pages/AddSmartphone";
import NotFound from "@/pages/notFound";
import DuplicateSmartphone from "@/pages/DuplicateSmartphone";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "",
        element: <Inventory />,
      },
      {
        path: "/inventory",
        element: <Inventory />,
      },
      {
        path: "/inventory/add",
        element: <AddSmartphone />,
      },
      {
        path: "/inventory/:phoneID",
        element: <SmartphoneCardDetails />,
      },
      {
        path: "/inventory/duplicate/:phoneID",
        element: <DuplicateSmartphone />,
      },
      {
        path: "/inventory/update/:phoneID",
        element: <SmartphoneUpdate />,
      },
      {
        path: "sale",
        element: <Sell />,
      },
      {
        path: "sale-history",
        element: <SellsHistory />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
