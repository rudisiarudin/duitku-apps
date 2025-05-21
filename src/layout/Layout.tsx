// src/layout/Layout.tsx
import { Outlet, useLocation } from "react-router-dom";
import BottomNavBar from "../components/BottomNavBar";

const Layout = () => {
  const location = useLocation();
  const hideNavbarOn = ["/splash", "/login"]; // atau halaman lain yg kamu inginkan

  return (
    <div className="min-h-screen bg-white">
      <Outlet />
      {!hideNavbarOn.includes(location.pathname) && <BottomNavBar />}
    </div>
  );
};

export default Layout;
