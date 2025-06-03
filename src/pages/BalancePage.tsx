import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { RootState } from "@/store/store";
import { useTranslation } from "react-i18next";
import '../style/homepage.css';

const BalancePage = () => {
  const transactions = useSelector((state: RootState) => state.transactions.list);
  const { t } = useTranslation();

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalIncome - totalExpense;

  return (
    <div className="">
      <Card className="w-full max-w-xl shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            {t("balance.title")}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-lg space-y-2">
          <p>
            {t("balance.income")}:{" "}
            <span className="text-green-600 font-semibold">
              {totalIncome} €
            </span>
          </p>
          <p>
            {t("balance.expense")}:{" "}
            <span className="text-red-600 font-semibold">
              {totalExpense} €
            </span>
          </p>
          <p>
            {t("balance.total")}:{" "}
            <span className="font-bold text-green-700">{netBalance} €</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BalancePage;
