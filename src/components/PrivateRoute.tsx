import React, { ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  // Bypass langsung render children tanpa cek user
  return <>{children}</>;
};

export default PrivateRoute;
