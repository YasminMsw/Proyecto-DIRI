import { Separator } from "../components/ui/separator"
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Clock,
} from "lucide-react"
import { useTranslation } from "react-i18next"

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-black text-white px-6 py-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 items-start">
        {/* Logo + Description */}
        <div className="space-y-6">
          <img
            src="/assets/gestor-finanzas-logo.png"
            alt="gestor-finanzas logo"
            className="h-16"
          />
          <p className="text-sm text-gray-300">
            {t("footer.description")}
          </p>
          <div className="flex gap-4">
            <a href="#" className="bg-white text-black p-2 rounded-full">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="bg-white text-black p-2 rounded-full">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="bg-white text-black p-2 rounded-full">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-4 text-left">
          <h4 className="font-semibold text-lg border-b border-teal-500 inline-block">
            {t("footer.contact")}
          </h4>
          <ul className="space-y-3 text-sm text-gray-300 mt-2">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-teal-400" />
              (555) 555 - 1234
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-teal-400" />
              info@gestorfinanzas.com
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-teal-400" />
              456 Water St. Boulder, CO
            </li>
            <li className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-teal-400" />
              {t("footer.schedule")}
            </li>
          </ul>
        </div>

        {/* Navigation */}
        <div className="space-y-4 text-left">
          <h4 className="font-semibold text-lg border-b border-teal-500 inline-block">
            {t("footer.navigation")}
          </h4>
          <ul className="space-y-2 text-sm mt-2">
            {[
              "footer.nav.home",
              "footer.nav.login",
              "footer.nav.register",
              "footer.nav.balance",
              "footer.nav.history",
              "footer.nav.dashboard"
            ].map((key) => (
              <li key={key}>
                <a
                  href="#"
                  className="text-white hover:text-teal-400 transition-colors"
                >
                  {t(key)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <Separator className="my-8 bg-gray-600" />
      <div className="text-center text-xs text-gray-500">
        © 2025 gestor-finanzas, {t("footer.rights")}
      </div>
    </footer>
  )
}
