// src/components/BottomNavBar.tsx
import { useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  BarChart2,
  PlusCircle,
  Wallet,
  User,
} from "lucide-react";

const navItems = [
  { label: "Home", icon: <Home size={24} />, path: "/" },
  { label: "Status", icon: <BarChart2 size={24} />, path: "/status" },
  { label: "Add", icon: <PlusCircle size={36} />, path: "/add", isCenter: true },
  { label: "Wallet", icon: <Wallet size={24} />, path: "/wallet" },
  { label: "Profile", icon: <User size={24} />, path: "/profile" },
];

const BottomNavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg z-50">
      <ul className="flex justify-around max-w-xl mx-auto items-center relative">
        {navItems.map(({ label, icon, path, isCenter }) => {
          const isActive = location.pathname === path;

          // Styling khusus tombol tengah (Add)
          if (isCenter) {
            return (
              <li
                key={label}
                onClick={() => navigate(path)}
                className={`relative -top-6 flex items-center justify-center cursor-pointer select-none rounded-full bg-blue-600 text-white shadow-lg transition-colors hover:bg-blue-700`}
                style={{ width: 64, height: 64 }}
                title={label}
              >
                {icon}
              </li>
            );
          }

          return (
            <li
              key={label}
              onClick={() => navigate(path)}
              className={`flex items-center justify-center cursor-pointer select-none transition-colors p-3 rounded-full ${
                isActive
                  ? "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900"
                  : "text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300"
              }`}
              title={label}
              style={{ width: 48, height: 48 }}
            >
              {icon}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default BottomNavBar;
