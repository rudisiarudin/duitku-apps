import DarkModeToggle from "./DarkModeToggle";
import { Bell } from "lucide-react";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-4 py-3 bg-white dark:bg-gray-900 border-b dark:border-gray-800">
      <h1 className="text-lg font-bold text-gray-800 dark:text-white">My Finance</h1>
      <div className="flex items-center gap-3">
        <button className="p-2 text-gray-700 dark:text-white">
          <Bell size={20} />
        </button>
        <DarkModeToggle />
      </div>
    </header>
  );
};

export default Header;
