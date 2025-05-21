// src/pages/AddTransaction.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Utensils,
  Briefcase,
  CreditCard,
  TrainFront,
  ShoppingBag,
  HelpCircle,
} from "lucide-react";
import clsx from "clsx";

const categoryIcons = [
  { id: "food", label: "Food", icon: <Utensils className="w-5 h-5" /> },
  { id: "salary", label: "Salary", icon: <Briefcase className="w-5 h-5" /> },
  { id: "subscription", label: "Subscription", icon: <CreditCard className="w-5 h-5" /> },
  { id: "transport", label: "Transport", icon: <TrainFront className="w-5 h-5" /> },
  { id: "shopping", label: "Shopping", icon: <ShoppingBag className="w-5 h-5" /> },
  { id: "uncategories", label: "Other", icon: <HelpCircle className="w-5 h-5" /> },
];

const AddTransaction = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("uncategories");
  const [type, setType] = useState<"income" | "expense">("expense");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTransaction = {
      id: Date.now(),
      title,
      subtitle,
      amount: Math.abs(amount),
      date,
      category,
      type,
      icon: category,
    };

    const existing = JSON.parse(localStorage.getItem("transactions") || "[]");
    const updated = [newTransaction, ...existing];

    localStorage.setItem("transactions", JSON.stringify(updated));
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 pt-6 pb-28 max-w-md mx-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Tambah Transaksi</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Judul"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800"
          required
        />
        <input
          type="text"
          placeholder="Deskripsi"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800"
        />
        <input
          type="number"
          placeholder="Jumlah (Rp)"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800"
          required
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value as "income" | "expense")}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800"
        >
          <option value="expense">Pengeluaran</option>
          <option value="income">Pemasukan</option>
        </select>

        {/* Kategori visual grid */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Pilih Kategori</p>
          <div className="grid grid-cols-3 gap-3">
            {categoryIcons.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={clsx(
                  "flex flex-col items-center justify-center p-3 rounded-lg border text-gray-700 bg-white",
                  category === cat.id
                    ? "border-blue-500 ring-2 ring-blue-200"
                    : "border-gray-200"
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
          className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 font-semibold hover:bg-blue-700"
        >
          Simpan Transaksi
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;
