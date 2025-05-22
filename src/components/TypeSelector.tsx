import React from "react";
import clsx from "clsx";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";

interface TypeSelectorProps {
  value: "income" | "expense";
  onChange: (value: "income" | "expense") => void;
}

const TypeSelector: React.FC<TypeSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="flex gap-4 mb-4">
      <button
        type="button"
        onClick={() => onChange("income")}
        className={clsx(
          "flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors",
          value === "income"
            ? "bg-green-100 border-green-400 text-green-700 shadow"
            : "bg-white border-gray-300 text-gray-700 hover:bg-green-50"
        )}
      >
        <ArrowUpCircle size={20} className={value === "income" ? "text-green-600" : "text-green-400"} />
        <span>Income</span>
      </button>

      <button
        type="button"
        onClick={() => onChange("expense")}
        className={clsx(
          "flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors",
          value === "expense"
            ? "bg-red-100 border-red-400 text-red-700 shadow"
            : "bg-white border-gray-300 text-gray-700 hover:bg-red-50"
        )}
      >
        <ArrowDownCircle size={20} className={value === "expense" ? "text-red-600" : "text-red-400"} />
        <span>Expense</span>
      </button>
    </div>
  );
};

export default TypeSelector;
