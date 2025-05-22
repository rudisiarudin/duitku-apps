// src/pages/AddTransaction.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Utensils,
  Briefcase,
  CreditCard,
  TrainFront,
  ShoppingBag,
  HelpCircle,
  ArrowDownCircle,
  ArrowUpCircle,
} from "lucide-react";
import clsx from "clsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const categoryIcons = [
  { id: "food", label: "Food", icon: <Utensils className="w-5 h-5" /> },
  { id: "salary", label: "Salary", icon: <Briefcase className="w-5 h-5" /> },
  { id: "subscription", label: "Subscription", icon: <CreditCard className="w-5 h-5" /> },
  { id: "transport", label: "Transport", icon: <TrainFront className="w-5 h-5" /> },
  { id: "shopping", label: "Shopping", icon: <ShoppingBag className="w-5 h-5" /> },
  { id: "uncategorized", label: "Other", icon: <HelpCircle className="w-5 h-5" /> },
];

const formatNumberWithDots = (value: string) => {
  // Hilangkan semua karakter bukan digit
  const digits = value.replace(/\D/g, "");
  // Tambahkan titik sebagai pemisah ribuan
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const parseNumberFromDots = (value: string) => {
  // Hilangkan titik
  return Number(value.replace(/\./g, ""));
};

const AddTransaction = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("uncategorized");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Judul harus diisi");
      return;
    }
    const numericAmount = parseNumberFromDots(amount);
    if (!numericAmount || numericAmount <= 0) {
      toast.error("Nominal harus lebih dari 0");
      return;
    }
    if (!date) {
      toast.error("Tanggal harus diisi");
      return;
    }

    const newTransaction = {
      id: Date.now().toString(),
      title,
      subtitle,
      amount: numericAmount,
      date,
      category,
      type,
    };

    const existing = JSON.parse(localStorage.getItem("transactions") || "[]");
    const updated = [newTransaction, ...existing];

    localStorage.setItem("transactions", JSON.stringify(updated));
    toast.success("Transaksi berhasil ditambahkan!");
    setTimeout(() => {
      navigate("/");
    }, 1500); // Delay sedikit supaya toast kelihatan dulu
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNumberWithDots(e.target.value);
    setAmount(formatted);
  };

  // Dark mode toggle
  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 pt-6 pb-28 max-w-md mx-auto transition-colors duration-300">
      {/* Tombol kembali icon */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:text-blue-800 flex items-center"
        aria-label="Kembali"
        type="button"
      >
        <ArrowLeft size={24} />
      </button>

      {/* Toggle Dark Mode */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Tambah Transaksi</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Judul"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800"
          required
        />

        <input
          type="text"
          placeholder="Deskripsi (opsional)"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800"
        />

        <input
          type="text"
          placeholder="Jumlah (Rp)"
          value={amount}
          onChange={handleAmountChange}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800"
          required
          inputMode="numeric"
          pattern="[0-9.]*"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800"
          required
        />

        {/* Type selector dengan soft buttons */}
        <div className="flex gap-4 justify-center mb-4">
          <button
            type="button"
            onClick={() => setType("income")}
            className={clsx(
              "flex items-center gap-2 px-6 py-2 rounded-full border font-semibold text-sm",
              type === "income"
                ? "bg-green-100 border-green-400 text-green-700 shadow"
                : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900"
            )}
          >
            <ArrowUpCircle className={clsx("w-5 h-5", type === "income" ? "text-green-600" : "text-gray-400")} />
            Income
          </button>

          <button
            type="button"
            onClick={() => setType("expense")}
            className={clsx(
              "flex items-center gap-2 px-6 py-2 rounded-full border font-semibold text-sm",
              type === "expense"
                ? "bg-red-100 border-red-400 text-red-700 shadow"
                : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900"
            )}
          >
            <ArrowDownCircle className={clsx("w-5 h-5", type === "expense" ? "text-red-600" : "text-gray-400")} />
            Expense
          </button>
        </div>

        {/* Kategori visual grid */}
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pilih Kategori</p>
          <div className="grid grid-cols-3 gap-3">
            {categoryIcons.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={clsx(
                  "flex flex-col items-center justify-center p-3 rounded-lg border text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800",
                  category === cat.id
                    ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-700"
                    : "border-gray-200 dark:border-gray-700"
                )}
                onClick={() => setCategory(cat.id)}
              >
                {cat.icon}
                <span className="text-xs mt-1">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Button Simpan */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 font-semibold hover:bg-blue-700 transition"
        >
          Simpan Transaksi
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;
