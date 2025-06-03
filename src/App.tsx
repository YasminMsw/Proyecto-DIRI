import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import HomeLayout from "./components/HomeLayout";
import { lazy, Suspense } from "react";
import logger from "./services/logging";
import { useEffect } from "react";
function App() {
  const LoginPage = lazy(() => import("./pages/LoginPage"));
  const RegisterPage = lazy(() => import("./pages/RegisterPage"));
  const LandingPage = lazy(() => import("./pages/LandingPage"));
  const HomePage = lazy(() => import("./pages/HomePage"));
  const DashboardPage = lazy(() => import("./pages/DashboardPage"));

  useEffect(() => {
    logger.info("Aplicación cargada");
  }, []);
  return (
    <BrowserRouter basename="/Proyecto-DIRI">
      <Suspense fallback={<div>Cargando...</div>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <HomeLayout>
                  <HomePage />
                </HomeLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <HomeLayout>
                  <DashboardPage />
                </HomeLayout>
              </PrivateRoute>
            }
          />
         
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
