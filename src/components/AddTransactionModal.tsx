import { useState } from "react";

const AddTransactionModal = ({ onClose }: { onClose: () => void }) => {
  const [form, setForm] = useState({
    id: crypto.randomUUID(),
    title: "",
    subtitle: "",
    amount: 0,
    type: "expense",
    date: new Date().toISOString().split("T")[0],
    category: "uncategories",
  });

  const handleSubmit = () => {
    if (!form.title.trim()) {
      alert("Title wajib diisi");
      return;
    }

    const stored = localStorage.getItem("transactions");
    const existing = stored ? JSON.parse(stored) : [];
    const updated = [form, ...existing];

    localStorage.setItem("transactions", JSON.stringify(updated));
    onClose(); // tutup modal
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-[90%] max-w-md">
        <h3 className="text-lg font-semibold mb-4">Tambah Transaksi</h3>
        <div className="space-y-3">
          <input
            className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700"
            placeholder="Subtitle"
            value={form.subtitle}
            onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
          />
          <input
            type="number"
            className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: parseInt(e.target.value || "0") })}
          />
          <select
            className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value as "income" | "expense" })}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select
            className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option value="food">Food</option>
            <option value="salary">Salary</option>
            <option value="subscription">Subscription</option>
            <option value="transport">Transport</option>
            <option value="shopping">Shopping</option>
            <option value="uncategories">Uncategories</option>
          </select>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700">Batal</button>
          <button onClick={handleSubmit} className="px-4 py-2 rounded bg-blue-600 text-white">Simpan</button>
        </div>
      </div>
    </div>
  );
};

export default AddTransactionModal;
