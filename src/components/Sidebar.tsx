// Sidebar.tsx
import { Home, CreditCard, Settings, User } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col fixed top-0 left-0 h-full w-64 bg-gray-100 dark:bg-gray-900 border-r border-gray-300 dark:border-gray-700 p-6">
      <h2 className="text-2xl font-bold mb-8 text-blue-600 dark:text-blue-400">DuitKu</h2>

      <nav className="flex flex-col space-y-4">
        <a
          href="#"
          className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          <Home className="w-5 h-5" />
          Dashboard
        </a>
        <a
          href="#"
          className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          <CreditCard className="w-5 h-5" />
          Transactions
        </a>
        <a
          href="#"
          className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          <User className="w-5 h-5" />
          Profile
        </a>
        <a
          href="#"
          className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          <Settings className="w-5 h-5" />
          Settings
        </a>
      </nav>
    </aside>
  );
}
