// src/components/AddTransactionModal.tsx
import React, { useState, } from "react";
import { toast } from "react-toastify";

interface Transaction {
  id: string;
  title: string;
  subtitle?: string;
  amount: number;
  date: string;
  category: string;
  type: "income" | "expense";
}

interface Props {
  transaction: Transaction | null;
  onClose: () => void;
  onSuccess: () => void;
}

const AddTransactionModal: React.FC<Props> = ({ transaction, onClose, onSuccess }) => {
  const [title, setTitle] = useState(transaction?.title || "");
  const [subtitle, setSubtitle] = useState(transaction?.subtitle || "");
  const [amount, setAmount] = useState(transaction ? transaction.amount.toString() : "");
  const [date, setDate] = useState(transaction?.date || "");
  const [category, setCategory] = useState(transaction?.category || "uncategorized");
  const [type, setType] = useState<"income" | "expense">(transaction?.type || "expense");

  const handleSave = () => {
    if (!title.trim()) {
      toast.error("Judul harus diisi");
      return;
    }
    if (!amount || Number(amount) <= 0) {
      toast.error("Jumlah harus lebih dari 0");
      return;
    }
    if (!date) {
      toast.error("Tanggal harus diisi");
      return;
    }

    // Simpan data ke localStorage atau API sesuai kebutuhan
    const newTransaction = {
      id: transaction?.id || Date.now().toString(),
      title,
      subtitle,
      amount: Number(amount),
      date,
      category,
      type,
    };

    const existing = JSON.parse(localStorage.getItem("transactions") || "[]");
    const filtered = transaction ? existing.filter((t: Transaction) => t.id !== transaction.id) : existing;
    const updated = [newTransaction, ...filtered];

    localStorage.setItem("transactions", JSON.stringify(updated));
    toast.success("Transaksi berhasil disimpan");
    onSuccess();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96 max-w-full mx-4">
        <h2 className="text-xl font-semibold mb-4">{transaction ? "Edit Transaksi" : "Tambah Transaksi"}</h2>

        <input
          type="text"
          placeholder="Judul"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
        />

        <input
          type="text"
          placeholder="Deskripsi (opsional)"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
        />

        <input
          type="number"
          placeholder="Jumlah"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
        >
          <option value="uncategorized">Uncategorized</option>
          <option value="food">Food</option>
          <option value="salary">Salary</option>
          <option value="subscription">Subscription</option>
          <option value="transport">Transport</option>
          <option value="shopping">Shopping</option>
        </select>

        <div className="flex justify-between mb-4">
          <label>
            <input
              type="radio"
              checked={type === "income"}
              onChange={() => setType("income")}
            />
            <span className="ml-2">Income</span>
          </label>
          <label>
            <input
              type="radio"
              checked={type === "expense"}
              onChange={() => setType("expense")}
            />
            <span className="ml-2">Expense</span>
          </label>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTransactionModal;
