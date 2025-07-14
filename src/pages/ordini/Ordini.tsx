import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import OrdiniForm from "./OrdiniForm";
import OrdiniTable from "./OrdiniTable";
import axios from "axios";

interface Ordine {
  id: number;
  quantita: string;
  dataOrdine: string;
  dataConsegna: string;
  cliente: string;
  operatore: string;
  etichette: string;
}

const Ordini = () => {
  const [ordini, setOrdini] = useState<Ordine[]>([]);
  const [ordineSelezionato, setOrdineSelezionato] = useState<Ordine | null>(null);
  const [alert, setAlert] = useState<{
    tipo: "success" | "warning" | "danger";
    messaggio: string;
  } | null>(null);

  const caricaOrdini = async () => {
    try {
      const response = await axios.get("http://localhost:8080/ordini");
      setOrdini(response.data.content);
    } catch (error) {
      console.error("Errore nel caricamento degli ordini:", error);
      setAlert({ tipo: "danger", messaggio: "Errore nel caricamento ordini" });
      setTimeout(() => setAlert(null), 3000);
    }
  };

  useEffect(() => {
    caricaOrdini();
  }, []);

  const handleSuccess = (
    tipo: "success" | "warning" | "danger",
    messaggio: string
  ) => {
    caricaOrdini();
    setOrdineSelezionato(null);
    setAlert({ tipo, messaggio });
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleDeleteOrdine = async (ordine: Ordine) => {
    const result = await Swal.fire({
      title: "Sei sicuro?",
      text: `Vuoi eliminare l'ordine #${ordine.id} del cliente ${ordine.cliente}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sì, elimina",
      cancelButtonText: "Annulla",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`http://localhost:8080/ordini/${ordine.id}`);
      handleSuccess("danger", "Ordine eliminato con successo");
    } catch (err) {
      setAlert({ tipo: "danger", messaggio: "Errore durante l'eliminazione" });
      console.error("Errore durante l'eliminazione dell'ordine:", err);
      setTimeout(() => setAlert(null), 3000);
    }
  };

  return (
    <div className="container">
      <h2>Gestione Ordini</h2>
      {alert && (
        <div className={`alert alert-${alert.tipo}`} role="alert">
          {alert.messaggio}
        </div>
      )}

      <OrdiniForm onSuccess={handleSuccess} ordine={ordineSelezionato} />
      <hr />
      <OrdiniTable
        ordini={ordini}
        onEdit={setOrdineSelezionato}
        onDelete={handleDeleteOrdine}
      />
    </div>
  );
};

export default Ordini;
