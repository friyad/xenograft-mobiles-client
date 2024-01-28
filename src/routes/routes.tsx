import App from "@/App";
import Home from "@/pages/Home";
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
        element: <Home />,
      },
      {
        path: "dashboard",
        element: <Inventory />,
      },
      {
        path: "dashboard/sell",
        element: <Sell />,
      },
      {
        path: "dashboard/sell-history",
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
