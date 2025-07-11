import { useState, useEffect } from "react";
import ClientiForm from "./ClientiForm";
import ClientiTable from "../clienti/ClientiTable";
import axios from "axios";
import Swal from "sweetalert2";

const Clienti = () => {
  const [clienti, setClienti] = useState<any[]>([]);
  const [clienteSelezionato, setClienteSelezionato] = useState(null);
  const [alert, setAlert] = useState<{
    tipo: "success" | "warning" | "danger";
    messaggio: string;
  } | null>(null);

  const caricaClienti = async () => {
    try {
      const response = await axios.get("http://localhost:8080/clienti");
      setClienti(response.data.content);
    } catch (error) {
      console.error("Errore nel caricamento clienti:", error);
    }
  };

  useEffect(() => {
    caricaClienti();
  }, []);

  const handleSuccess = (
    tipo: "success" | "warning" | "danger",
    messaggio: string
  ) => {
    caricaClienti();
    setClienteSelezionato(null);
    setAlert({ tipo, messaggio });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleDeleteCliente = async (cliente: any) => {
    const result = await Swal.fire({
      title: "Sei sicuro?",
      text: `Vuoi eliminare ${cliente.nome} ${cliente.cognome}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sì, elimina",
      cancelButtonText: "Annulla",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`http://localhost:8080/clienti/${cliente.id}`);
      setAlert({ tipo: "danger", messaggio: "Cliente eliminato con successo" });
      setTimeout(() => setAlert(null), 3000);
      caricaClienti();
    } catch (err) {
      setAlert({ tipo: "danger", messaggio: "Errore durante l'eliminazione" });
      console.error("Errore durante l'eliminazione del cliente:", err);
    }
  };

  return (
    <div className="container">
      <h2>Gestione Clienti</h2>
      {alert && (
        <div className={`alert alert-${alert.tipo}`} role="alert">
          {alert.messaggio}
        </div>
      )}
      <ClientiForm onSuccess={handleSuccess} cliente={clienteSelezionato} />
      <hr />
      <ClientiTable
        clienti={clienti}
        onEdit={setClienteSelezionato}
        onDelete={handleDeleteCliente}
      />
    </div>
  );
};

export default Clienti;
