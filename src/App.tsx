import { Outlet } from "react-router-dom";
import { checkAuth } from "./components/checkAuth";

function App() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default checkAuth(App);
