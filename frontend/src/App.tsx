import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";

export default function App() {
  const { login, logout, isAuth } = useAuth();

  useEffect(() => {
    document.documentElement.classList.add("theme-transition");
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <BrowserRouter>
        <Navbar isAuth={isAuth} onLogout={logout} />
        <main>
          <Routes>
            <Route
              path="/"
              element={<Navigate to={isAuth ? "/dashboard" : "/login"} />}
            />
            <Route path="/login" element={<Login onLogin={login} />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={isAuth ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/analytics"
              element={isAuth ? <Analytics /> : <Navigate to="/login" />}
            />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}
