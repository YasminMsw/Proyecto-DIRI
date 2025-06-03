import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../services/firebase";
import { useDispatch } from "react-redux";
import {
  addTransaction,
  setTransactions,
} from "../features/transactions/transactionSlice";
import type { Transaction, TransactionType } from "../Models";
import { useTranslation } from "react-i18next";
import "../style/auth.css";
import logger from "@/services/logging";
import { DatePicker } from "./ui/DatePicker";

interface Props {
  onFinish?: () => void;
  initialData?: Transaction | null;
}

const TransactionForm = ({ onFinish, initialData }: Props) => {
  const [type, setType] = useState<TransactionType>("income");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));

  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (initialData) {
      setType(initialData.type);
      setAmount(initialData.amount.toString());
      setCategory(initialData.category);
      setDescription(initialData.description || "");
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category) return;

    const txData = {
      type,
      amount: parseFloat(amount),
      category,
      description,
      date,
    };

    if (initialData) {
      const ref = doc(db, "transactions", initialData.id);
      await updateDoc(ref, txData);
    } else {
      const docRef = await addDoc(collection(db, "transactions"), txData);
      dispatch(addTransaction({ id: docRef.id, ...txData }));
    }

    const snapshot = await getDocs(collection(db, "transactions"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as any),
    }));
    dispatch(setTransactions(data));
    logger.info(
      `Usuario ${
        initialData ? "actualizó" : "agregó"
      } una transacción: ${JSON.stringify(txData)}`
    );
    if (onFinish) onFinish();
    if (!initialData) {
      setAmount("");
      setCategory("");
      setDescription("");
      setType("income");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col p-8 gap-2 max-w-md">
      <select
        value={type}
        onChange={(e) => setType(e.target.value as TransactionType)}
        className="border p-2 my-2 rounded"
      >
        <option value="income">{t("transaction.income")}</option>
        <option value="expense">{t("transaction.expense")}</option>
      </select>

      <input
        type="number"
        placeholder={t("transaction.amount")}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 my-2 rounded"
        required
      />
      <input
        type="text"
        placeholder={t("transaction.category")}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 my-2 rounded"
        required
      />
      {/* <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 my-2"
        required
      /> */}
      <DatePicker value={date} onChange={(val) => setDate(val)}/>

      <input
        type="text"
        placeholder={t("transaction.description_optional")}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 my-2 rounded"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {initialData ? t("transaction.save_changes") : t("transaction.add")}
      </button>
    </form>
  );
};

export default TransactionForm;
