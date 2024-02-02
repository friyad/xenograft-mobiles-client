import { useAppSelector } from "@/redux/hooks";
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface PrivetRouteProps {
  children: ReactNode;
}

const PrivetRoute = ({ children }: PrivetRouteProps) => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (!isAuthenticated) {
      navigate("/signin", { unstable_viewTransition: true });
    }
  }, [isAuthenticated, isLoading]);

  return isLoading ? null : isAuthenticated ? children : null;
};

export default PrivetRoute;
