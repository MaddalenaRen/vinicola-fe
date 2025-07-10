import { useState, useEffect } from "react";
import ClientiForm from "./ClientiForm";
import ClientiTable from "../clienti/ClientiTable";
import axios from "axios";

const Clienti = () => {
  const [clienti, setClienti] = useState<any[]>([]);
  const [clienteSelezionato, setClienteSelezionato] = useState(null);

  const caricaClienti = async () => {
    console.log("caricaClienti chiamato");
    try {
      const response = await axios.get("http://localhost:8080/clienti");
      console.log("Dati ricevuti:", response.data);
      setClienti(response.data.content);
    } catch (error) {
      console.error("Errore nel caricamento clienti:", error);
      if (axios.isAxiosError(error)) {
        console.error("Axios error details:", error.response);
      }
    }
  };

  useEffect(() => {
    console.log("useEffect chiamato");
    caricaClienti();
  }, []);

  const handleSuccess = () => {
    caricaClienti();
    setClienteSelezionato(null);
  };

  return (
    <div className="container">
      <h2>Gestione Clienti</h2>
      <ClientiForm onSuccess={handleSuccess} cliente={clienteSelezionato} />
      <hr />
      <ClientiTable clienti={clienti} onEdit={setClienteSelezionato} />
    </div>
  );
};

export default Clienti;
