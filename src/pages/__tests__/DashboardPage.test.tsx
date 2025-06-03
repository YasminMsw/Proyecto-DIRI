// src/pages/__tests__/DashboardPage.test.tsx
import { render, screen } from "@testing-library/react";
import DashboardPage from "../DashboardPage";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "@/features/transactions/transactionSlice";
import type { Transaction, TransactionState } from "@/Models";
import { describe, it, expect } from "vitest";



const fakeTransactions: Transaction[] = [
  {
    id: "1",
    type: "income",
    amount: 100,
    category: "Salario",
    description: "Pago mensual",
    date: new Date().toISOString(),
  },
  {
    id: "2",
    type: "expense",
    amount: 50,
    category: "Comida",
    description: "Cena",
    date: new Date().toISOString(),
  },
];

describe("DashboardPage", () => {
  it("muestra correctamente los gráficos", () => {
    const store = configureStore({
      reducer: { transactions: transactionReducer },
      preloadedState: {
        transactions: {
          list: fakeTransactions,
        } as TransactionState,
      },
    });

    render(
      <Provider store={store}>
        <DashboardPage />
      </Provider>
    );

    // Afirmaciones básicas
    expect(
      screen.getByText(/Resumen Financiero/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Distribución por Categoría/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Evolución del Saldo/i)
    ).toBeInTheDocument();
  });
});
