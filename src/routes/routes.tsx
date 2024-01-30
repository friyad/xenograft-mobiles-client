import App from "@/App";
import SmartphoneCardDetails from "@/pages/SmartphoneDetails";
import Inventory from "@/pages/Inventory";
import Sell from "@/pages/Sell";
import SellsHistory from "@/pages/SellsHistory";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import { createBrowserRouter } from "react-router-dom";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Inventory />,
      },
      {
        path: "/inventory",
        element: <Inventory />,
      },
      {
        path: "/inventory/:phoneID",
        element: <SmartphoneCardDetails />,
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
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);
