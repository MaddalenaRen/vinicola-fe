import { useState, useEffect } from "react";
import OperatoriForm from "./OperatoriForm";
import OperatoriTable from "./OperatoriTable";
import axios from "axios";
import Swal from "sweetalert2";

const Operatori = () => {
  const [operatori, setOperatori] = useState<any[]>([]);
  const [operatoreSelezionato, setOperatoreSelezionato] = useState(null);
  const [alert, setAlert] = useState<{
    tipo: "success" | "warning" | "danger";
    messaggio: string;
  } | null>(null);

  const caricaOperatori = async () => {
    try {
      const response = await axios.get("http://localhost:8080/operatori");
      setOperatori(response.data.content);
    } catch (error) {
      console.error("Errore nel caricamento operatori:", error);
    }
  };

  useEffect(() => {
    caricaOperatori();
  }, []);

  const handleSuccess = () => {
    caricaOperatori();
    setOperatoreSelezionato(null);
  };

  const handleDeleteOperatore = async (operatore: any) => {
    const result = await Swal.fire({
      title: "Sei sicuro?",
      text: `Vuoi eliminare ${operatore.nome} ${operatore.cognome}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sì, elimina",
      cancelButtonText: "Annulla",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`http://localhost:8080/operatori/${operatore.id}`);
      setAlert({ tipo: "danger", messaggio: "Cliente eliminato con successo" });
      setTimeout(() => setAlert(null), 3000);

      caricaOperatori();

      if (operatoreSelezionato?.id === operatore.id) {
        setOperatoreSelezionato(null);
      }
    } catch (error) {
      alert("Errore durante l'eliminazione");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Gestione Operatori</h2>
      {alert && (
        <div className={`alert alert-${alert.tipo}`} role="alert">
          {alert.messaggio}
        </div>
      )}
      <OperatoriForm
        onSuccess={handleSuccess}
        operatore={operatoreSelezionato}
      />

      <hr />

      <OperatoriTable
        operatori={operatori}
        onEdit={setOperatoreSelezionato}
        onDelete={handleDeleteOperatore}
      />
    </div>
  );
};

export default Operatori;
