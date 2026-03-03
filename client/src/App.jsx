import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [page, setPage] = useState("login");

  if (page === "login")
    return <LoginPage onLogin={() => setPage("dashboard")} />;
  if (page === "dashboard")
    return <Dashboard navigate={setPage} onLogout={() => setPage("login")} />;
}
