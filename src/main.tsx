import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { routes } from "@/routes/routes";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./index.scss";
import { Toaster } from "./components/ui/toaster";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <main>
        <RouterProvider router={routes} />
        <Toaster />
      </main>
    </Provider>
  </React.StrictMode>
);
