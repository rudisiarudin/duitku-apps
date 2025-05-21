import { TrendingUp, TrendingDown } from "lucide-react";

type BalanceCardProps = {
  label: "Income" | "Expense";
  amount: number;
  type: "income" | "expense";
};

const BalanceCard = ({ label, amount, type }: BalanceCardProps) => {
  const isIncome = type === "income";

  const icon = isIncome ? (
    <TrendingUp className="text-green-500 w-5 h-5" />
  ) : (
    <TrendingDown className="text-red-500 w-5 h-5" />
  );

  const cardColor = isIncome ? "bg-green-50" : "bg-red-50";
  const textColor = isIncome ? "text-green-600" : "text-red-600";

  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-xl shadow-sm ${cardColor}`}
    >
      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-sm text-gray-500">{label}</span>
        <span className={`text-base font-bold ${textColor}`}>
          Rp{amount.toLocaleString("id-ID")}
        </span>
      </div>
    </div>
  );
};

export default BalanceCard;
