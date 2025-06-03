import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Footer } from "@/components/Footer";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

export default function LandingPage() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const toggleLanguage = () => {
    const newLang = currentLang === "es" ? "en" : "es";
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="p-0 bg-white">
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 border-b bg-white">
        <div className="flex items-center gap-2">
          <img
            src="assets/gestor-finanzas-logo.png"
            alt="gestor-finanzas logo"
            className="h-24 w-auto"
          />
        </div>

        <button
          onClick={toggleLanguage}
          className="bg-white-700 hover:bg-teal-500 text-black flex items-center gap-2 px-4 py-2 rounded ml-4"
        >
          <Globe className="h-4 w-4" />
          {currentLang === "es" ? "English" : "Español"}
        </button>
      </header>

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="assets/fotoSection1.jpg"
            alt="Finance background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 grid md:grid-cols-2 gap-10 px-6 py-24 items-center text-white min-h-[600px]">
          <div>
            <p className="text-teal-400 uppercase mb-2">
              {t("landing.hero_tagline")}
            </p>
            <h1 className="text-4xl font-bold leading-tight mb-4">
              {t("landing.hero_title")}
            </h1>
            <p className="mb-6 text-lg">{t("landing.hero_description")}</p>
            <Link to="/login">
              <Button className="bg-black px-4 py-6 hover:bg-teal-500 text-white ml-4">
                {t("landing.login")}
              </Button>
            </Link>
          </div>

          {/* Right Side - Form */}
          <div className="bg-teal-700 bg-opacity-90 p-6 rounded-lg shadow-lg space-y-4">
            <input
              type="text"
              placeholder={t("landing.form.name")}
              className="w-full px-4 py-2 rounded bg-white text-black"
            />
            <input
              type="email"
              placeholder={t("landing.form.email")}
              className="w-full px-4 py-2 rounded bg-white text-black"
            />
            <input
              type="tel"
              placeholder={t("landing.form.phone")}
              className="w-full px-4 py-2 rounded bg-white text-black"
            />
            <textarea
              placeholder={t("landing.form.message")}
              rows={4}
              className="w-full px-4 py-2 rounded bg-white text-black"
            />
            <button className="w-full hover:bg-teal-500 bg-black text-white font-semibold py-3 rounded">
              {t("landing.form.submit")}
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-[1]">
          <svg
            className="relative block w-full h-[80px]"
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
          >
            <path
              d="M0,40 C480,80 960,0 1440,40 L1440,80 L0,80 Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="bg-white px-6 py-16">
        <div className="max-w-6xl mx-auto mb-12 text-center md:text-left grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t("landing.solutions_title")}
            </h2>
          </div>
          <div>
            <p className="text-gray-700 text-lg">
              {t("landing.solutions_description")}
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <img
              src="assets/section2img1.webp"
              alt=""
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="font-bold text-lg text-gray-900 mb-2">
              {t("landing.features.secure_access.title")}
            </h3>
            <p className="text-gray-700 text-sm">
              {t("landing.features.secure_access.desc")}
            </p>
          </div>

          <div>
            <img
              src="assets/section2img2.jpg"
              alt=""
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="font-bold text-lg text-gray-900 mb-2">
              {t("landing.features.transaction_management.title")}
            </h3>
            <p className="text-gray-700 text-sm">
              {t("landing.features.transaction_management.desc")}
            </p>
          </div>

          <div>
            <img
              src="assets/section2img3.webp"
              alt=""
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="font-bold text-lg text-gray-900 mb-2">
              {t("landing.features.data_visualization.title")}
            </h3>
            <p className="text-gray-700 text-sm">
              {t("landing.features.data_visualization.desc")}
            </p>
          </div>

          <div>
            <img
              src="assets/section2img4.jpg"
              alt=""
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="font-bold text-lg text-gray-900 mb-2">
              {t("landing.features.detailed_history.title")}
            </h3>
            <p className="text-gray-700 text-sm">
              {t("landing.features.detailed_history.desc")}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
