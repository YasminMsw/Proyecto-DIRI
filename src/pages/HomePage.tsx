import { lazy, useState, Suspense, useMemo } from "react";
import type { Transaction } from "../Models";
import "../style/homepage.css";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const TransactionList = lazy(() => import("../components/TransactionList"));
  const TransactionForm = lazy(() => import("../components/TransactionForm"));

  const [showForm, setShowForm] = useState(false);
  const [editingTx, setEditingTx] = useState<Transaction | null>(null);

  const [filters, setFilters] = useState({
    type: "",
    category: "",
    date: "",
  });

  const { t } = useTranslation();

  const handleEdit = (tx: Transaction) => {
    setEditingTx(tx);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditingTx(null);
  };

return (
  <div className="p-4 flex flex-col">
    {/* Header Section */}
      <h1 className="text-3xl font-bold">{t("home.movements")}</h1>
    <div className="flex flex-col md:flex-row justify-end items-end md:items-center gap-4 my-4">
    

      {/* ➕ Add Transaction */}
      <button
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        onClick={() => setShowForm(true)}
      >
        + {t("home.add_transaction")}
      </button>
    </div>

    {/* 🔍 Filters Section */}
    <form className="bg-white p-4 rounded shadow flex flex-wrap gap-3 items-center justify-between">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center w-full sm:w-auto">
          <select
        value={filters.type}
        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        className="border px-3 py-2 rounded w-full sm:w-auto"
      >
        <option value="">{t("filters.all_types")}</option>
        <option value="income">{t("transaction.income")}</option>
        <option value="expense">{t("transaction.expense")}</option>
      </select>

      <input
        type="text"
        placeholder={t("transaction.category")}
        value={filters.category}
        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        className="border px-3 py-2 rounded w-full sm:w-auto"
      />

      <input
        type="date"
        value={filters.date}
        onChange={(e) => setFilters({ ...filters, date: e.target.value })}
        className="border px-3 py-2 rounded w-full sm:w-auto"
      />

      </div>
    

      <button
        type="button"
        onClick={() => setFilters({ type: "", category: "", date: "" })}
        className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition"
      >
        {t("filters.reset")}
      </button>
    </form>

    {/* 🧾 Formulario modal */}
    {showForm && (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md relative">
          <button
            className="absolute top-2 right-3 text-xl hover:text-red-600 transition"
            onClick={handleClose}
          >
            ×
          </button>
          <Suspense fallback={<p>{t("home.loading_form")}</p>}>
            <TransactionForm onFinish={handleClose} initialData={editingTx} />
          </Suspense>
        </div>
      </div>
    )}

    {/* 📃 Lista de transacciones */}
    <Suspense fallback={<p>{t("home.loading_transactions")}...</p>}>
      <TransactionList onEdit={handleEdit} filters={filters} />
    </Suspense>
  </div>
);


};

export default HomePage;
