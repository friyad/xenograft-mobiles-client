import { useAppSelector } from "@/redux/hooks";
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (isAuthenticated) {
      navigate("/", { unstable_viewTransition: true });
    }
  }, [isAuthenticated, isLoading]);

  return isLoading ? null : !isAuthenticated ? children : null;
};

export default PublicRoute;
