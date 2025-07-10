import { useState, useEffect } from "react";
import OperatoriForm from "./OperatoriForm";
import OperatoriTable from "./OperatoriTable";
import axios from "axios";

const Operatori = () => {
  const [operatori, setOperatori] = useState<any[]>([]);
  const [operatoreSelezionato, setOperatoreSelezionato] = useState(null);

  const caricaOperatori = async () => {
    console.log("carica Operatore chiamato");
    try {
      const response = await axios.get("http://localhost:8080/operatori");
      console.log("Dati ricevuti:", response.data);
      setOperatori(response.data.content);
    } catch (error) {
      console.error("Errore nel caricamento operatori:", error);
      if (axios.isAxiosError(error)) {
        console.error("Axios error details:", error.response);
      }
    }
  };
  useEffect(() => {
    console.log("useEffect chiamato");
    caricaOperatori();
  }, []);

  const handleSuccess = () => {
    caricaOperatori();
    setOperatoreSelezionato(null);
  };

  return (
    <div className="container mt-4">
      <h2>Gestione Operatori</h2>
      <OperatoriForm
        onSuccess={handleSuccess}
        operatore={operatoreSelezionato}
      />

      <hr />
      <OperatoriTable operatori={operatori} onEdit={setOperatoreSelezionato} />
    </div>
  );
};

export default Operatori;
