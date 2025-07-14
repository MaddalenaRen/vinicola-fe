import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomNavbar from "./components/CustomNavbar";
import CustomFooter from "./components/CustomFooter";

import Login from "./pages/Login";
import Operatori from "./pages/operatori/Operatori";
import Clienti from "./pages/clienti/Clienti";
import Ordini from "./pages/ordini/Ordini";
import Etichette from "./pages/etichette/Etichette";
import FasiProduzione from "./pages/fasiProduzione/FasiProduzione";
import Home from "./pages/Home";
import LottiVino from "./pages/lottiVino/LottiVino";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <CustomNavbar />
        <main className="flex-grow-1 bg-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/operatori" element={<Operatori />} />
            <Route path="/clienti" element={<Clienti />} />
            <Route path="/ordini" element={<Ordini />} />
            <Route path="/lotti-vino" element={<LottiVino />} />
            <Route path="/etichette" element={<Etichette />} />
            <Route path="/fasi-produzione" element={<FasiProduzione />} />
          </Routes>
        </main>
        <CustomFooter />
      </div>
    </Router>
  );
}

export default App;
