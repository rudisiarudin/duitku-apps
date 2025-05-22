// src/data/categoryOptions.ts
import {
  Utensils,
  Briefcase,
  ShoppingBag,
  Wallet,
  CreditCard,
  Tv,
  PiggyBank,
  Car,
  HelpCircle,
} from "lucide-react";

export const categoryOptions = [
  { label: "Food", value: "food", icon: Utensils },
  { label: "Salary", value: "salary", icon: Briefcase },
  { label: "Shopping", value: "shopping", icon: ShoppingBag },
  { label: "Wallet", value: "wallet", icon: Wallet },
  { label: "Payment", value: "payment", icon: CreditCard },
  { label: "Subscription", value: "subscription", icon: Tv },
  { label: "Savings", value: "savings", icon: PiggyBank },
  { label: "Transport", value: "transport", icon: Car },
  { label: "Uncategorized", value: "uncategorized", icon: HelpCircle },
];
