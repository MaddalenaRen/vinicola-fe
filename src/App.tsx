import { BrowserRouter as Router, Routes, Route, HashRouter } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";

import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Operatori from "./pages/operatori/Operatori";
import Clienti from "./pages/clienti/Clienti";
import Ordini from "./pages/ordini/Ordini";
import Etichette from "./pages/etichette/Etichette";
import LottiVino from "./pages/lottiVino/LottiVino";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/operatori" element={<Operatori />} />
          <Route path="/clienti" element={<Clienti />} />
          <Route path="/ordini" element={<Ordini />} />
          <Route path="/lotti-vino" element={<LottiVino />} />
          <Route path="/etichette" element={<Etichette />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;

