import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  Bell,
  Moon,
  Sun,
  ArrowDownCircle,
  ArrowUpCircle,
  Utensils,
  Briefcase,
  CreditCard,
  TrainFront,
  ShoppingBag,
  HelpCircle,
  Home,
  Settings,
  User,
} from "lucide-react";
import clsx from "clsx";
import BottomNavBar from "../components/BottomNavBar";
import EditTransaction from "./EditTransaction";

type Transaction = {
  id: string;
  title: string;
  subtitle: string;
  amount: number;
  type: "income" | "expense";
  date: string;
  category: string;
};

interface DashboardProps {
  onAddClick: () => void;
}

const categoryIcons: Record<string, ReactNode> = {
  food: <Utensils className="w-5 h-5 text-gray-500 dark:text-gray-300" />,
  salary: <Briefcase className="w-5 h-5 text-gray-500 dark:text-gray-300" />,
  subscription: <CreditCard className="w-5 h-5 text-gray-500 dark:text-gray-300" />,
  transport: <TrainFront className="w-5 h-5 text-gray-500 dark:text-gray-300" />,
  shopping: <ShoppingBag className="w-5 h-5 text-gray-500 dark:text-gray-300" />,
  uncategorized: <HelpCircle className="w-5 h-5 text-gray-500 dark:text-gray-300" />,
};

const Sidebar = () => (
  <aside className="hidden lg:flex flex-col w-64 h-screen bg-gray-100 dark:bg-gray-900 p-6 space-y-8">
    <h2 className="text-2xl font-bold text-indigo-600">DuitKu</h2>
    <nav className="flex flex-col space-y-4">
      <a href="#" className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-indigo-600">
        <Home size={20} /> Dashboard
      </a>
      <a href="#" className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-indigo-600">
        <User size={20} /> Profile
      </a>
      <a href="#" className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-indigo-600">
        <Settings size={20} /> Settings
      </a>
    </nav>
  </aside>
);

const Dashboard: React.FC<DashboardProps> = ({ onAddClick }) => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editTx, setEditTx] = useState<Transaction | null>(null);
  const [greeting, setGreeting] = useState("Good day");
  const name = "Rudi !";

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("transactions");
    if (stored) setTransactions(JSON.parse(stored));
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expense;

  const handleDelete = (id: string) => {
    const updatedList = transactions.filter((t) => t.id !== id);
    setTransactions(updatedList);
    localStorage.setItem("transactions", JSON.stringify(updatedList));
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Sidebar />

      <main className="flex-1 flex flex-col pb-20 lg:pb-0">
        <header className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <h1 className="text-lg font-bold lg:hidden">
            <span className="text-blue-500">Duit</span>
            <span className="text-purple-500">Ku</span>
          </h1>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
              <Bell size={20} className="text-gray-700 dark:text-white" />
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {darkMode ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} className="text-gray-600" />
              )}
            </button>
          </div>
        </header>

        <div className="mx-4 my-5 rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-600 text-white p-6 shadow-lg relative overflow-hidden">
          <div className="absolute top-4 left-6 text-sm text-white/90 font-medium">Welcome back</div>
          <div className="mt-3">
            <p className="text-base font-light text-white/90 mb-1">
              {greeting}, <span className="font-medium">{name}</span>
            </p>
          </div>
          <div className="flex flex-col items-center justify-center mt-8">
            <p className="text-3xl font-bold tracking-wide">Rp {balance.toLocaleString()}</p>
            <p className="text-xs uppercase text-white/80 mt-1 tracking-widest">Total Balance</p>
          </div>
        </div>

        <div className="px-4 flex justify-between items-center mb-3">
          <h3 className="text-base font-semibold">Recent Transactions</h3>
          <button
            onClick={onAddClick}
            className="text-sm bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700 transition"
          >
            + Add
          </button>
        </div>

        <div className="px-4">
          <ul className="space-y-3">
            {transactions.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">Belum ada transaksi.</p>
            ) : (
              transactions.slice(0, 5).map((tx) => (
                <li
                  key={tx.id}
                  onClick={() => setEditTx(tx)}
                  className="flex justify-between items-center p-4 rounded-xl bg-white dark:bg-gray-800 shadow cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    {categoryIcons[tx.category] || categoryIcons["uncategorized"]}
                    <div>
                      <p className="text-sm font-semibold">{tx.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{tx.subtitle}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={clsx(
                        "text-sm font-semibold",
                        tx.type === "income" ? "text-green-500" : "text-red-500"
                      )}
                    >
                      {tx.type === "income" ? "+" : "-"} Rp {tx.amount.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400">{tx.date}</p>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>

        {editTx && (
          <EditTransaction
            transaction={editTx}
            onClose={() => setEditTx(null)}
            onSave={(updatedTx) => {
              const updatedList = transactions.map((t) =>
                t.id === updatedTx.id ? updatedTx : t
              );
              setTransactions(updatedList);
              localStorage.setItem("transactions", JSON.stringify(updatedList));
              setEditTx(null);
            }}
            onDelete={handleDelete}
          />
        )}
      </main>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
        <BottomNavBar onAddClick={onAddClick} />
      </div>
    </div>
  );
};

export default Dashboard;
