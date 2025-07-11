import { useState, useEffect } from "react";
import EtichetteForm from "./EtichetteForm";
import EtichetteTable from "./EtichetteTable";
import axios from "axios";
import Swal from "sweetalert2";

interface Etichetta {
  id: number;
  nomeEtichetta: string;
  tipologiaVino: string;
  gradazioneAlcolica: number;
  dataImbottigliamento: string;
  cantinaId: number;
}

const Etichette = () => {
  const [etichette, setEtichette] = useState<Etichetta[]>([]);
  const [etichettaSelezionata, setEtichettaSelezionata] =
    useState<Etichetta | null>(null);
  const [alert, setAlert] = useState<{
    tipo: "success" | "warning" | "danger";
    messaggio: string;
  } | null>(null);

  const caricaEtichette = async () => {
    try {
      const response = await axios.get("http://localhost:8080/etichette");
      setEtichette(response.data.content);
    } catch (error) {
      console.error("Errore nel caricamento delle etichette:", error);
    }
  };

  useEffect(() => {
    caricaEtichette();
  }, []);

  const handleSuccess = (
    tipo: "success" | "warning" | "danger",
    messaggio: string
  ) => {
    caricaEtichette();
    setEtichettaSelezionata(null);
    setAlert({ tipo, messaggio });
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleDeleteEtichetta = async (etichetta: any) => {
    const result = await Swal.fire({
      title: "Sei sicuro?",
      text: `Vuoi eliminare ${etichetta.nomeEtichetta}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sì, elimina",
      cancelButtonText: "Annulla",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`http://localhost:8080/etichette/${etichetta.id}`);
      setAlert({
        tipo: "danger",
        messaggio: "Etichetta eliminata con successo",
      });
      setTimeout(() => setAlert(null), 3000);
      caricaEtichette();
    } catch (err) {
      setAlert({ tipo: "danger", messaggio: "Errore durante l'eliminazione" });
      console.error("Errore durante l'eliminazione dell'etichetta:", err);
    }
  };

  return (
    <div className="container">
      <h2>Gestione Etichette</h2>
      {alert && (
        <div className={`alert alert-${alert.tipo}`} role="alert">
          {alert.messaggio}
        </div>
      )}

      <EtichetteForm
        onSuccess={handleSuccess}
        etichetta={etichettaSelezionata}
      />
      <hr />
      <EtichetteTable
        etichette={etichette}
        onEdit={setEtichettaSelezionata}
        onDelete={handleDeleteEtichetta}
      />
    </div>
  );
};

export default Etichette;
