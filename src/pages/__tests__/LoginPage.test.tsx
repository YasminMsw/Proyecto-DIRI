import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "../LoginPage";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer, { login } from "@/features/auth/authSlice";
import { vi, describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";

// Mocks
vi.mock("firebase/auth", async () => {
  return {
    getAuth: vi.fn(() => ({})), // mock vacío o simulado
    signInWithEmailAndPassword: vi.fn(),
    auth: {},
  };
});

// vi.mock("react-i18next", () => ({
//   useTranslation: () => ({ t: (key: string) => key }),
// }));

const mockDispatch = vi.fn();
vi.mock("react-redux", async () => {
  const actual = await vi.importActual("react-redux");
  return {
    ...actual,
    useDispatch: () => mockDispatch,
  };
});

const mockedNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe("LoginPage", () => {
  const setup = () => {
    const store = configureStore({ reducer: { auth: authReducer } });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );
  };

  it("renderiza los campos de login", () => {
    setup();
    expect(screen.getByLabelText(/Correo Electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Entrar/i })).toBeInTheDocument();
  });

  it("hace login correctamente", async () => {
    const firebaseAuth = await import("firebase/auth");

    vi.spyOn(firebaseAuth, "signInWithEmailAndPassword").mockResolvedValue({
      user: {
        uid: "123",
        email: "test@email.com",
      },
    } as any);
    setup();
    fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), {
      target: { value: "test@email.com" },
    });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Entrar/i }));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        login({ uid: "123", email: "test@email.com" })
      );
      expect(mockedNavigate).toHaveBeenCalledWith("/home");
    });
  });

  it("muestra error si las credenciales son inválidas", async () => {
    const firebaseAuth = await import("firebase/auth");
    vi.spyOn(firebaseAuth, "signInWithEmailAndPassword").mockRejectedValue(
      new Error("Login failed")
    );

    setup();
    fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), {
      target: { value: "fail@email.com" },
    });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), {
      target: { value: "wrongpass" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Entrar/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Correo o contraseña incorrectos/i)
      ).toBeInTheDocument();
    });
  });
});
