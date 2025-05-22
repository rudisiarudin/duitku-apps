// src/pages/EditTransaction.tsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

interface Transaction {
  id: string;
  title: string;
  subtitle: string;
  amount: number;
  date: string;
  category: string;
  type: "income" | "expense";
  icon?: string;
}

const EditTransaction = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const stored = localStorage.getItem("transactions");
    if (!stored) return;

    const transactions: Transaction[] = JSON.parse(stored);
    const transaction = transactions.find((t) => t.id === id);
    if (transaction) {
      setForm(transaction);
    }
    setLoading(false);
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!form) return;
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "amount" ? Number(value) : value,
    });
  };

  const handleTypeChange = (newType: "income" | "expense") => {
    if (!form) return;
    setForm({ ...form, type: newType });
  };

  const handleCategoryChange = (catId: string) => {
    if (!form) return;
    setForm({ ...form, category: catId });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;

    if (!form.title.trim()) {
      alert("Judul harus diisi");
      return;
    }
    if (form.amount <= 0) {
      alert("Nominal harus lebih dari 0");
      return;
    }
    if (!form.date) {
      alert("Tanggal harus diisi");
      return;
    }

    const stored = localStorage.getItem("transactions");
    const transactions: Transaction[] = stored ? JSON.parse(stored) : [];

    const updated = transactions.map((t) => (t.id === form.id ? form : t));
    localStorage.setItem("transactions", JSON.stringify(updated));
    alert("Transaksi berhasil diperbarui");
    navigate("/");
  };

  const handleDelete = () => {
    if (!form) return;

    if (!window.confirm("Yakin ingin menghapus transaksi ini?")) return;

    const stored = localStorage.getItem("transactions");
    const transactions: Transaction[] = stored ? JSON.parse(stored) : [];

    const updated = transactions.filter((t) => t.id !== form.id);
    localStorage.setItem("transactions", JSON.stringify(updated));
    alert("Transaksi berhasil dihapus");
    navigate("/");
  };

  if (loading) return <p className="p-4">Memuat data...</p>;
  if (!form) return <p className="p-4">Transaksi tidak ditemukan</p>;

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

      <h2 className="text-lg font-semibold text-gray-800 mb-4">Edit Transaksi</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Judul"
          value={form.title}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800"
          required
        />

        <input
          type="text"
          name="subtitle"
          placeholder="Deskripsi (opsional)"
          value={form.subtitle}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800"
        />

        <input
          type="number"
          name="amount"
          placeholder="Jumlah (Rp)"
          value={form.amount}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800"
          required
          min={0}
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800"
          required
        />

        {/* Type selector soft buttons */}
        <div className="flex gap-4 justify-center mb-4">
          <button
            type="button"
            onClick={() => handleTypeChange("income")}
            className={clsx(
              "flex items-center gap-2 px-6 py-2 rounded-full border font-semibold text-sm",
              form.type === "income"
                ? "bg-green-100 border-green-400 text-green-700 shadow"
                : "bg-white border-gray-300 text-gray-600 hover:bg-green-50"
            )}
          >
            <ArrowUpCircle
              className={clsx(
                "w-5 h-5",
                form.type === "income" ? "text-green-600" : "text-gray-400"
              )}
            />
            Income
          </button>

          <button
            type="button"
            onClick={() => handleTypeChange("expense")}
            className={clsx(
              "flex items-center gap-2 px-6 py-2 rounded-full border font-semibold text-sm",
              form.type === "expense"
                ? "bg-red-100 border-red-400 text-red-700 shadow"
                : "bg-white border-gray-300 text-gray-600 hover:bg-red-50"
            )}
          >
            <ArrowDownCircle
              className={clsx(
                "w-5 h-5",
                form.type === "expense" ? "text-red-600" : "text-gray-400"
              )}
            />
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
                  form.category === cat.id
                    ? "border-blue-500 ring-2 ring-blue-200"
                    : "border-gray-200"
                )}
                onClick={() => handleCategoryChange(cat.id)}
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
          Simpan Perubahan
        </button>

        {/* Button Hapus */}
        <button
          type="button"
          onClick={handleDelete}
          className="w-full mt-2 bg-red-600 text-white rounded-lg px-4 py-2 font-semibold hover:bg-red-700 transition"
        >
          Hapus Transaksi
        </button>
      </form>
    </div>
  );
};

export default EditTransaction;
