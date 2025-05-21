import {
  Shirt,
  ShoppingBag,
  TrainFront,
  Wallet,
  Utensils,
  Briefcase,
  CreditCard,
  Tag,
  Pencil,
} from "lucide-react";
import { Link } from "react-router-dom";

type TransactionCardProps = {
  id: string;
  title: string;
  subtitle: string;
  amount: number;
  date: string;
  category: string;
};

const iconMap: Record<string, JSX.Element> = {
  food: <Utensils className="text-pink-500" />,
  salary: <Briefcase className="text-green-500" />,
  subscription: <CreditCard className="text-purple-500" />,
  shopping: <ShoppingBag className="text-orange-500" />,
  transport: <TrainFront className="text-blue-500" />,
  payment: <Wallet className="text-indigo-500" />,
  clothing: <Shirt className="text-yellow-500" />,
  uncategorized: <Tag className="text-gray-400" />,
};

const TransactionCard = ({
  id,
  title,
  subtitle,
  amount,
  date,
  category,
}: TransactionCardProps) => {
  const isIncome = amount >= 0;
  const color = isIncome ? "text-green-500" : "text-red-500";

  return (
    <div className="flex justify-between items-center bg-white rounded-xl p-4 shadow mb-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
          {iconMap[category] || iconMap["uncategorized"]}
        </div>
        <div>
          <p className="font-medium text-gray-800">{title}</p>
          <p className="text-sm text-gray-400">{subtitle}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-semibold ${color}`}>
          {isIncome ? "+" : "-"}Rp{Math.abs(amount).toLocaleString("id-ID")}
        </p>
        <div className="flex items-center justify-end gap-2 text-sm text-gray-400">
          <span>{date}</span>
          <Link to={`/edit/${id}`}>
            <Pencil size={16} className="hover:text-blue-500" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
