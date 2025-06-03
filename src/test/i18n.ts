import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "es",
  fallbackLng: "es",
  resources: {
    es: {
      translation: {
        transaction: {
          income: "Ingreso",
          expense: "Gasto",
          amount: "Cantidad",
          category: "Categoría",
          description_optional: "Descripción (opcional)",
          add: "Añadir transacción",
        },
        login: {
          title: "Iniciar Sesión",
          email_label: "Correo Electrónico",
          email_placeholder: "Correo",
          password_label: "Contraseña",
          password_placeholder: "Contraseña",
          button: "Entrar",
          no_account: "¿No tienes cuenta?",
          register_link: "Regístrate aquí",
          errors: {
            user_not_found: "Usuario no encontrado.",
            wrong_password: "Contraseña incorrecta.",
            invalid_email: "Correo electrónico inválido.",
            generic: "Correo o contraseña incorrectos",
          },
        },
        register: {
          title: "Registro",
          first_name_label: "Nombre",
          first_name_placeholder: "Nombre",
          last_name_label: "Apellido",
          last_name_placeholder: "Apellido",
          email_label: "Correo Electrónico",
          email_placeholder: "Correo",
          password_label: "Contraseña",
          password_placeholder: "Contraseña",
          button: "Registrarse",
          error: "No se pudo registrar el usuario",
          have_account: "¿Ya tienes cuenta?",
          login_link: "Inicia sesión aquí",
        },
        dashboard: {
          title: "Resumen Financiero 📊",
          income: "Ingresos",
          expense: "Gastos",
          income_vs_expense: "Ingresos vs Gastos",
          by_category: "Distribución por Categoría",
          balance_evolution: "Evolución del Saldo",
        },
      },
    },
  },
  interpolation: { escapeValue: false },
});

export default i18n;
