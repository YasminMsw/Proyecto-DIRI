import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../services/firebase"
import { useDispatch } from "react-redux"
import { login } from "../features/auth/authSlice"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"
import logger from "@/services/logging";
import { Link } from "react-router-dom"

const RegisterPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [error, setError] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation();
  

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      dispatch(login(userCredential.user));
      logger.info(`Usuario logueado: ${userCredential.user.email}`);
      navigate("/login")
    } catch (err) {
      logger.error(`Error de registro: ${err}`);
      setError(t("register.error"));
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Card className="ancho w-full max-w-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-800">
            {t("register.title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">{t("register.first_name_label")}</Label>
              <Input
                id="firstName"
                type="text"
                placeholder={t("register.first_name_placeholder")}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">{t("register.last_name_label")}</Label>
              <Input
                id="lastName"
                type="text"
                placeholder={t("register.last_name_placeholder")}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t("register.email_label")}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t("register.email_placeholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t("register.password_label")}</Label>
              <Input
                id="password"
                type="password"
                placeholder={t("register.password_placeholder")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full hover:bg-teal-500 bg-black text-white"
            >
              {t("register.button")}
            </Button>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <p className="text-center text-sm text-gray-500 mt-4">
              {t("register.have_account")}{" "}
              <Link to="/login" className="text-teal-600 hover:underline">
                {t("register.login_link")}
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default RegisterPage
