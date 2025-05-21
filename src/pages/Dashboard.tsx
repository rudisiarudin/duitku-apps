import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import BalanceCard from "../components/BalanceCard";
import TransactionCard from "../components/TransactionCard";
import BottomNavBar from "../components/BottomNavBar";

type Transaction = {
  id: number;
  title: string;
  subtitle: string;
  amount: number;
  date: string;
  category: string;
  icon: string;
  type: "income" | "expense";
};

const Dashboard = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("transactions") || "[]");
    setTransactions(data);

    const incomeTotal = data
      .filter((t: Transaction) => t.type === "income")
      .reduce((acc: number, curr: Transaction) => acc + curr.amount, 0);

    const expenseTotal = data
      .filter((t: Transaction) => t.type === "expense")
      .reduce((acc: number, curr: Transaction) => acc + curr.amount, 0);

    setIncome(incomeTotal);
    setExpense(expenseTotal);
    setTotalBalance(incomeTotal - expenseTotal);
  }, []);

  return (
    <div className="min-h-screen bg-white px-4 pt-6 pb-28 max-w-md mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <img
            src="https://ui-avatars.com/api/?name=Rudi&background=0D8ABC&color=fff"
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
          <h2 className="text-md font-semibold text-gray-800">Hey, Rudi</h2>
        </div>
        <Bell className="text-gray-600" />
      </header>

      {/* Total Balance */}
      <div className="text-center mb-6">
        <h1 className="text-sm font-bold text-gray-900">
          Rp{totalBalance.toLocaleString("id-ID")}
        </h1>
        <p className="text-sm text-gray-400">Total Balance</p>
      </div>

      {/* Income & Expense Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <BalanceCard label="Income" amount={income} type="income" />
        <BalanceCard label="Expense" amount={expense} type="expense" />
      </div>

      {/* Recent Transactions */}
      <section className="mb-6">
        <h3 className="text-gray-700 font-semibold mb-2">Recent Transactions</h3>

        {transactions.length === 0 && (
          <p className="text-sm text-gray-400">Belum ada transaksi</p>
        )}

        {transactions.map((tx) => (
          <TransactionCard
            key={tx.id}
            title={tx.title}
            subtitle={tx.subtitle}
            amount={tx.amount}
            date={tx.date}
            icon={tx.category as any}
          />
        ))}
      </section>

      {/* Bottom Navbar */}
      <BottomNavBar />
    </div>
  );
};

export default Dashboard;
