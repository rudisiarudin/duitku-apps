// src/components/BottomNavBar.tsx
import { Home, PlusCircle, Wallet, User, BarChart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BottomNavBar = () => {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path ? "text-blue-500" : "text-gray-400";

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t px-6 py-2 flex justify-between items-center max-w-md mx-auto">
      <Link to="/" className={isActive("/")}>
        <Home />
      </Link>
      <Link to="/laporan" className={isActive("/laporan")}>
        <BarChart />
      </Link>
      <Link to="/add" className="bg-blue-500 text-white rounded-full p-3 -mt-8 shadow">
        <PlusCircle />
      </Link>
      <Link to="/dompet" className={isActive("/dompet")}>
        <Wallet />
      </Link>
      <Link to="/profil" className={isActive("/profil")}>
        <User />
      </Link>
    </nav>
  );
};

export default BottomNavBar;
