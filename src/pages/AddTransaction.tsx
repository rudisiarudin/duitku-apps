// src/pages/AddTransaction.tsx
import { useState } from "react";
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

const categoryIcons = [
  { id: "food", label: "Food", icon: <Utensils className="w-5 h-5" /> },
  { id: "salary", label: "Salary", icon: <Briefcase className="w-5 h-5" /> },
  { id: "subscription", label: "Subscription", icon: <CreditCard className="w-5 h-5" /> },
  { id: "transport", label: "Transport", icon: <TrainFront className="w-5 h-5" /> },
  { id: "shopping", label: "Shopping", icon: <ShoppingBag className="w-5 h-5" /> },
  { id: "uncategorized", label: "Other", icon: <HelpCircle className="w-5 h-5" /> },
];

const AddTransaction = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("uncategorized");
  const [type, setType] = useState<"income" | "expense">("expense");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Judul harus diisi");
      return;
    }
    if (!amount || amount <= 0) {
      alert("Nominal harus lebih dari 0");
      return;
    }
    if (!date) {
      alert("Tanggal harus diisi");
      return;
    }

    const newTransaction = {
      id: Date.now().toString(),
      title,
      subtitle,
      amount: Math.abs(Number(amount)),
      date,
      category,
      type,
      icon: category,
    };

    const existing = JSON.parse(localStorage.getItem("transactions") || "[]");
    const updated = [newTransaction, ...existing];

    localStorage.setItem("transactions", JSON.stringify(updated));
    alert("Transaksi berhasil ditambahkan");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 pt-6 pb-28 max-w-md mx-auto">
      {/* Tombol kembali icon */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:text-blue-800 flex items-center"
        aria-label="Kembali"
        type="button"
      >
        <ArrowLeft size={24} />
      </button>

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
          placeholder="Deskripsi (opsional)"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800"
        />

        <input
          type="number"
          placeholder="Jumlah (Rp)"
          value={amount}
          onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800"
          required
          min={0}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800"
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
                : "bg-white border-gray-300 text-gray-600 hover:bg-green-50"
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
                : "bg-white border-gray-300 text-gray-600 hover:bg-red-50"
            )}
          >
            <ArrowDownCircle className={clsx("w-5 h-5", type === "expense" ? "text-red-600" : "text-gray-400")} />
            Expense
          </button>
        </div>

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
          className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 font-semibold hover:bg-blue-700 transition"
        >
          Simpan Transaksi
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;
