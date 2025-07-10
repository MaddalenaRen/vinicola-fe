import { useState, useEffect } from "react";
import EtichetteForm from "./EtichetteForm";
import EtichetteTable from "./EtichetteTable";
import axios from "axios";

const Etichette = () => {
  const [etichette, setEtichette] = useState<[]>([]);
  const [etichettaSelezionata, setEtichettaSelezionata] = useState(null);

  const caricaEtichette = async () => {
    console.log("carica Etichette chiamate");
    try {
      const response = await axios.get("http://localhost:8080/etichette");
      console.log("Dati ricevuti:", response.data.content);
      setEtichette(response.data.content);
    } catch (error) {
      console.error("Errore nel caricamento etichette:", error);
      if (axios.isAxiosError(error)) {
        console.error("Axios error details:", error.response);
      }
    }
  };

  useEffect(() => {
    console.log("useEffect chiamato");
    caricaEtichette();
  }, []);

  const handleSuccess = () => {
    caricaEtichette();
    setEtichettaSelezionata(null);
  };

  return (
    <div className="container">
      <h2>Gestione Etichette</h2>
      <EtichetteForm
        onSuccess={handleSuccess}
        etichetta={etichettaSelezionata}
      />
      <hr />
      <EtichetteTable etichette={etichette} onEdit={setEtichettaSelezionata} />
    </div>
  );
};

export default Etichette;
