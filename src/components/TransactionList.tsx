import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import { setTransactions } from "../features/transactions/transactionSlice";
import type { RootState } from "../store/store";
import type { Transaction } from "../Models";
import { useTranslation } from "react-i18next";
import logger from "@/services/logging";

interface Props {
  onEdit: (tx: Transaction) => void;
  filters: {
    type: string;
    category: string;
    date: string;
  };
}

const TransactionList = ({ onEdit, filters }: Props) => {
  const dispatch = useDispatch();
  const transactions = useSelector(
    (state: RootState) => state.transactions.list
  );
  const { t } = useTranslation();

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "transactions", id));
    const snapshot = await getDocs(collection(db, "transactions"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as any),
    }));
    dispatch(setTransactions(data));
    logger.info(`Usuario eliminó una transacción con ID: ${id}`);
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      const snapshot = await getDocs(collection(db, "transactions"));
      const data = snapshot.docs.map((doc) => {
        const d = doc.data();
        return {
          id: doc.id,
          type: d.type,
          amount: d.amount,
          category: d.category,
          date: d.date,
          description: d.description,
        };
      });

      dispatch(setTransactions(data));
      logger.info(`Cargar lista de transacciones: ${JSON.stringify(data)}`);
    };

    fetchTransactions();
  }, [dispatch]);

  // ✅ Aplicar filtros
  const filteredTransactions = transactions.filter((tx) => {
    const matchesType = !filters.type || tx.type === filters.type;
    const matchesCategory =
      !filters.category ||
      tx.category?.toLowerCase().includes(filters.category.toLowerCase());
    const matchesDate =
      !filters.date ||
      (typeof tx.date === "string"
        ? tx.date.slice(0, 10)
        : tx.date instanceof Date
        ? tx.date.toISOString().slice(0, 10)
        : typeof (tx.date as any)?.toDate === "function"
        ? (tx.date as any).toDate().toISOString().slice(0, 10)
        : "") === filters.date;
    return matchesType && matchesCategory && matchesDate;
  });

  if (filteredTransactions.length === 0) {
    return (
      <p className="p-4 text-gray-500">
        {t("transactionList.no_transactions")}
      </p>
    );
  }

  return (
    <div className="py-4 overflow-x-auto">
      <table className="min-w-full bg-white shadow rounded">
        <thead className="bg-teal-600 text-white">
          <tr>
            <th className="text-left px-4 py-3">{t("transactionList.date")}</th>
            <th className="text-left px-4 py-3">{t("transactionList.type")}</th>
            <th className="text-left px-4 py-3">
              {t("transactionList.amount")}
            </th>
            <th className="text-left px-4 py-3">
              {t("transactionList.category")}
            </th>
            <th className="text-left px-4 py-3">
              {t("transactionList.description")}
            </th>
            <th className="text-left px-4 py-3">
              {t("transactionList.actions")}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((tx) => (
            <tr key={tx.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3 text-sm text-gray-600">
                {tx.date
                  ? new Date(
                      typeof tx.date === "string"
                        ? tx.date
                        : (tx.date as any).toDate?.()
                    ).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                  : "-"}
              </td>
              <td className="px-4 py-3 font-medium">
                {tx.type === "income"
                  ? t("transaction.income")
                  : t("transaction.expense")}
              </td>
              <td className="px-4 py-3 text-green-700 font-semibold">
                {tx.amount}€
              </td>
              <td className="px-4 py-3">{tx.category}</td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {tx.description || "-"}
              </td>
              <td className="px-4 py-3 space-x-2">
                <button
                  onClick={() => onEdit(tx)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                >
                  {t("transactionList.edit")}
                </button>
                <button
                  onClick={() => handleDelete(tx.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                >
                  {t("transactionList.delete")}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
