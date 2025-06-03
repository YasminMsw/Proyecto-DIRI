import { LogOut, List, LayoutDashboard } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Separator } from "@/components/ui/separator"
import { signOut } from "firebase/auth"
import { useDispatch } from "react-redux"
import { auth } from "../services/firebase"
import { logout } from "../features/auth/authSlice"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

export default function Sidebar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(logout());
    localStorage.removeItem('user');
    navigate("/")
  }

  return (
    <aside className="w-64 bg-teal-700 text-white flex flex-col justify-between py-6 px-4">
      <nav className="space-y-4">
        <Link to="/">
                <h2 className="text-2xl font-bold mb-8">Gestor finanzas</h2>
        </Link>

        <button
          onClick={() => navigate("/home")}
          className="flex items-center gap-2 hover:bg-teal-600 bg-teal-700 px-4 py-2 rounded text-white font-medium transition w-full"
        >
          <List className="h-5 w-5" />
          {t("sidebar.movements")}
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 hover:bg-teal-600 bg-teal-700 px-4 py-2 rounded text-white font-medium transition w-full"
        >
          <LayoutDashboard className="h-5 w-5" />
          {t("sidebar.dashboard")}
        </button>
        
      </nav>

      <div>
        <Separator className="bg-white/30 my-4" />
        <button
          onClick={handleLogout}
          className="bg-black flex items-center gap-2 hover:bg-teal-800 px-4 py-2 rounded transition w-full"
        >
          <LogOut className="h-5 w-5" />
          {t("sidebar.logout")}
        </button>
      </div>
    </aside>
  )
}
