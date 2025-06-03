import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import "../style/auth.css";
import { useTranslation } from "react-i18next";
import logger from "@/services/logging";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch(
        login({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
        })
      );
      localStorage.setItem("user", JSON.stringify(userCredential.user));
      logger.info(`Usuario logueado: ${userCredential.user.email}`);
      navigate("/home");
    } catch (err: any) {
      logger.error(`Error de inicio de sesión: ${err.message}`);
      if (err.code === "auth/user-not-found") {
        setError(t("login.errors.user_not_found"));
      } else if (err.code === "auth/wrong-password") {
        setError(t("login.errors.wrong_password"));
      } else if (err.code === "auth/invalid-email") {
        setError(t("login.errors.invalid_email"));
      } else {
        console.error("Login error:", err); 
        setError(t("login.errors.generic"));
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Card className="ancho max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-800">
            {t("login.title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t("login.email_label")}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t("login.email_placeholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t("login.password_label")}</Label>
              <Input
                id="password"
                type="password"
                placeholder={t("login.password_placeholder")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="w-full hover:bg-teal-500 bg-black text-white"
            >
              {t("login.button")}
            </Button>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <p className="text-center text-sm text-gray-500 mt-4">
              {t("login.no_account")}{" "}
              <a href="/register" className="text-teal-600 hover:underline">
                {t("login.register_link")}
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
