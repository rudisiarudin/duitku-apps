import React, { useState } from "react";
import {
  Utensils,
  Briefcase,
  CreditCard,
  TrainFront,
  ShoppingBag,
  HelpCircle,
  ArrowUpCircle,
  ArrowDownCircle,
  X,
} from "lucide-react";
import clsx from "clsx";
import { toast } from "react-toastify";

const categoryIcons = [
  { id: "food", label: "Food", icon: <Utensils className="w-5 h-5" /> },
  { id: "salary", label: "Salary", icon: <Briefcase className="w-5 h-5" /> },
  { id: "subscription", label: "Subscription", icon: <CreditCard className="w-5 h-5" /> },
  { id: "transport", label: "Transport", icon: <TrainFront className="w-5 h-5" /> },
  { id: "shopping", label: "Shopping", icon: <ShoppingBag className="w-5 h-5" /> },
  { id: "uncategorized", label: "Other", icon: <HelpCircle className="w-5 h-5" /> },
];

const formatNumberWithDots = (value: string) => {
  const digits = value.replace(/\D/g, "");
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const parseNumberFromDots = (value: string) => {
  return Number(value.replace(/\./g, ""));
};

const AddTransactionModal = ({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("uncategorized");
  const [type, setType] = useState<"income" | "expense">("expense");

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
    onSuccess();
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNumberWithDots(e.target.value);
    setAmount(formatted);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/30 backdrop-blur-md flex items-center justify-center"
      style={{ WebkitBackdropFilter: "blur(8px)" }}
    >
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-white"
          aria-label="Tutup"
        >
          <X size={24} />
        </button>

        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Tambah Transaksi
        </h2>

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
              <ArrowUpCircle
                className={clsx(
                  "w-5 h-5",
                  type === "income" ? "text-green-600" : "text-gray-400"
                )}
              />
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
              <ArrowDownCircle
                className={clsx(
                  "w-5 h-5",
                  type === "expense" ? "text-red-600" : "text-gray-400"
                )}
              />
              Expense
            </button>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Pilih Kategori
            </p>
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

          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 font-semibold hover:bg-blue-700 transition"
          >
            Simpan Transaksi
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
