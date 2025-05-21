import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { categoryOptions } from "../data/categoryOptions";
import { ArrowLeft } from "lucide-react";

type Transaction = {
  id: string;
  title: string;
  subtitle: string;
  amount: number;
  date: string;
  type: "income" | "expense";
  category: string;
};

const EditTransaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<Transaction | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("transactions");
    if (!stored) return;

    const transactions: Transaction[] = JSON.parse(stored);
    const transaction = transactions.find((t) => t.id === id);
    if (transaction) setForm(transaction);
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!form) return;
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "amount" ? Number(value) : value });
  };

  const handleSubmit = () => {
    if (!form) return;

    const stored = localStorage.getItem("transactions");
    const transactions: Transaction[] = stored ? JSON.parse(stored) : [];

    const updated = transactions.map((t) => (t.id === form.id ? form : t));
    localStorage.setItem("transactions", JSON.stringify(updated));
    navigate("/");
  };

  if (!form) return <p className="p-4">Loading...</p>;

  return (
    <div className="min-h-screen bg-white px-4 pt-6 pb-28">
      <button onClick={() => navigate("/")} className="mb-4 text-sm text-blue-500 flex items-center gap-1">
        <ArrowLeft size={18} /> Kembali
      </button>

      <h2 className="text-lg font-bold text-gray-800 mb-4">Edit Transaksi</h2>

      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Judul"
        className="w-full border p-2 rounded mb-3 text-sm"
      />

      <input
        name="subtitle"
        value={form.subtitle}
        onChange={handleChange}
        placeholder="Deskripsi"
        className="w-full border p-2 rounded mb-3 text-sm"
      />

      <input
        type="number"
        name="amount"
        value={form.amount}
        onChange={handleChange}
        placeholder="Nominal"
        className="w-full border p-2 rounded mb-3 text-sm"
      />

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3 text-sm"
      />

      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3 text-sm"
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-6 text-sm"
      >
        {categoryOptions.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white p-2 rounded text-sm"
      >
        Simpan Perubahan
      </button>
    </div>
  );
};

export default EditTransaction;
