// src/components/EditTransaction.tsx
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { NumericFormat } from "react-number-format";

export type Transaction = {
  id: string;
  title: string;
  subtitle: string;
  amount: number;
  type: "income" | "expense";
  date: string;
  category: string;
};

type Props = {
  transaction: Transaction | null;
  onClose: () => void;
  onSave: (tx: Transaction) => void;
  onDelete: (id: string) => void;
};

const categories = [
  { label: "Food", value: "food" },
  { label: "Salary", value: "salary" },
  { label: "Subscription", value: "subscription" },
  { label: "Transport", value: "transport" },
  { label: "Shopping", value: "shopping" },
  { label: "Uncategorized", value: "uncategorized" },
];

const EditTransaction = ({ transaction, onClose, onSave, onDelete }: Props) => {
  const [form, setForm] = useState<Transaction>({
    id: transaction?.id || Date.now().toString(),
    title: transaction?.title || "",
    subtitle: transaction?.subtitle || "",
    amount: transaction?.amount || 0,
    type: transaction?.type || "expense",
    date: transaction?.date || new Date().toISOString().slice(0, 10),
    category: transaction?.category || "uncategorized",
  });

  useEffect(() => {
    if (transaction) {
      setForm({
        id: transaction.id,
        title: transaction.title,
        subtitle: transaction.subtitle,
        amount: transaction.amount,
        type: transaction.type,
        date: transaction.date,
        category: transaction.category,
      });
    }
  }, [transaction]);

  const handleChange = (field: keyof Transaction, value: string | number) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      Swal.fire("Error", "Judul harus diisi", "error");
      return;
    }
    if (form.amount <= 0) {
      Swal.fire("Error", "Jumlah harus lebih dari 0", "error");
      return;
    }
    if (!form.date) {
      Swal.fire("Error", "Tanggal harus diisi", "error");
      return;
    }
    onSave(form);
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Yakin ingin menghapus transaksi ini?",
      text: "Data yang dihapus tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed && form.id) {
        onDelete(form.id);
        Swal.fire("Terhapus!", "Transaksi sudah dihapus.", "success");
        onClose();
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-96 shadow-lg space-y-4">
        <h2 className="text-lg font-bold">{transaction ? "Edit Transaksi" : "Tambah Transaksi"}</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="w-full px-3 py-2 border rounded dark:bg-gray-700"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Judul"
            required
          />
          <input
            className="w-full px-3 py-2 border rounded dark:bg-gray-700"
            value={form.subtitle}
            onChange={(e) => handleChange("subtitle", e.target.value)}
            placeholder="Deskripsi"
          />
          <NumericFormat
            thousandSeparator="."
            decimalSeparator=","
            decimalScale={0}
            allowNegative={false}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700"
            value={form.amount}
            onValueChange={(values) => {
              handleChange("amount", Number(values.value));
            }}
            placeholder="Jumlah"
            required
          />
          <input
            className="w-full px-3 py-2 border rounded dark:bg-gray-700"
            type="date"
            value={form.date}
            onChange={(e) => handleChange("date", e.target.value)}
            required
          />

          {/* Type Toggle */}
          <div className="flex items-center justify-between text-sm">
            <label className="font-medium">Tipe Transaksi:</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handleChange("type", "income")}
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  form.type === "income"
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                Income
              </button>
              <button
                type="button"
                onClick={() => handleChange("type", "expense")}
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  form.type === "expense"
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                Expense
              </button>
            </div>
          </div>

          {/* Category Select */}
          <div className="text-sm">
            <label className="block mb-1 font-medium">Kategori:</label>
            <select
              value={form.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className="w-full px-3 py-2 border rounded dark:bg-gray-700"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-between pt-3">
            {transaction && (
              <button
                type="button"
                onClick={handleDelete}
                className="text-red-600 text-sm font-semibold"
              >
                Hapus
              </button>
            )}

            <div className="flex gap-2 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="text-sm text-gray-500 dark:text-gray-300"
              >
                Batal
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
              >
                Simpan
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTransaction;
