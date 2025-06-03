import { render, screen, fireEvent } from "@testing-library/react";
import TransactionList from "../TransactionList";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "@/features/transactions/transactionSlice";
import type { Transaction } from "@/Models";
import { describe, expect, it, vi } from "vitest";

// MOCK i18n
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// ➤ Declaramos los datos falsos primero
const fakeData: Transaction[] = [
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
    description: "",
    date: new Date().toISOString(),
  },
];

// ➤ Y luego el mock de Firebase
vi.mock("firebase/firestore", async () => {
  const actual = await vi.importActual<typeof import("firebase/firestore")>(
    "firebase/firestore"
  );
  return {
    ...actual,
    getDocs: vi.fn().mockResolvedValue({
      docs: [
        { id: "1", data: () => fakeData[0] },
        { id: "2", data: () => fakeData[1] },
      ],
    }),
    deleteDoc: vi.fn(),
    doc: vi.fn(),
    collection: vi.fn(),
  };
});

describe("TransactionList", () => {
  const mockEdit = vi.fn();

  const store = configureStore({
    reducer: { transactions: transactionReducer },
    preloadedState: {
      transactions: {
        list: fakeData,
      },
    },
  });

  it("muestra las transacciones correctamente", () => {
    render(
      <Provider store={store}>
        <TransactionList onEdit={mockEdit} />
      </Provider>
    );

    expect(screen.getByText(/Salario/i)).toBeInTheDocument();
    expect(screen.getByText(/Comida/i)).toBeInTheDocument();
  });

  it("llama a onEdit al hacer clic en el botón de editar", () => {
    render(
      <Provider store={store}>
        <TransactionList onEdit={mockEdit} />
      </Provider>
    );

    const botones = screen.getAllByText("transactionList.edit");
    fireEvent.click(botones[0]);
    expect(mockEdit).toHaveBeenCalledWith(expect.objectContaining({ id: "1" }));
  });

  it("llama a deleteDoc al hacer clic en el botón de eliminar", async () => {
    render(
      <Provider store={store}>
        <TransactionList onEdit={mockEdit} />
      </Provider>
    );

    const botones = screen.getAllByText("transactionList.delete");
    fireEvent.click(botones[0]);
    
    const mod = await import("firebase/firestore");
    expect(mod.deleteDoc).toHaveBeenCalled();
  });
});
