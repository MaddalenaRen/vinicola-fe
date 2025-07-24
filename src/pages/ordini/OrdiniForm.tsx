import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosConfig";
import Select from "react-select";

interface Cliente {
  id: number;
  nome: string;
  cognome: string;
  numeroTelefono: string;
}

interface Operatore {
  id: number;
  nome: string;
  cognome: string;
  reparto: string;
}

interface Etichetta {
  id: number;
  nomeEtichetta: string;
}

interface Ordine {
  id?: number;
  quantita: string;
  dataOrdine: string;
  dataConsegna: string;
  cliente: Cliente;
  operatore: Operatore;
  etichetta: Etichetta;
  stato?: string;
}

interface OrdiniFormProps {
  onSuccess: () => void;
  ordine?: Ordine;
  setMessaggioAlert: React.Dispatch<
    React.SetStateAction<{
      tipo: "success" | "warning" | "danger";
      messaggio: string;
    } | null>
  >;
}

const OrdiniForm: React.FC<OrdiniFormProps> = ({
  onSuccess,
  ordine,
  setMessaggioAlert,
}) => {
  const [quantita, setQuantita] = useState("");
  const [dataOrdine, setDataOrdine] = useState("");
  const [dataConsegna, setDataConsegna] = useState("");
  const [stato, setStato] = useState<string>("IN_ATTESA");

  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [operatore, setOperatore] = useState<Operatore | null>(null);
  const [etichetta, setEtichetta] = useState<Etichetta | null>(null);

  const [clientiOptions, setClientiOptions] = useState<Cliente[]>([]);
  const [operatoriOptions, setOperatoriOptions] = useState<Operatore[]>([]);
  const [etichetteOptions, setEtichetteOptions] = useState<Etichetta[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [clientiRes, operatoriRes, etichetteRes] = await Promise.all([
          axiosInstance.get("http://localhost:8080/clienti", {
            params: { size: 5000 },
          }),
          axiosInstance.get("http://localhost:8080/operatori", {
            params: { size: 5000 },
          }),
          axiosInstance.get("http://localhost:8080/etichette", {
            params: { size: 5000 },
          }),
        ]);

        setClientiOptions(clientiRes.data.content);
        setOperatoriOptions(operatoriRes.data.content);
        setEtichetteOptions(etichetteRes.data.content);
        setLoadingOptions(false);
      } catch (error) {
        console.error("Errore caricamento opzioni:", error);
        setLoadingOptions(false);
      }
    };

    fetchOptions();
  }, []);

  const operatoriSpedizione = operatoriOptions.filter(
    (op) => op.reparto?.trim().toLowerCase() === "spedizione"
  );

  useEffect(() => {
    if (!ordine || loadingOptions) return;

    setQuantita(ordine.quantita || "");
    setDataOrdine(ordine.dataOrdine?.split("T")[0] || "");
    setDataConsegna(ordine.dataConsegna?.split("T")[0] || "");
    setStato(ordine.stato || "IN_ATTESA");

    let clienteSelezionato = clientiOptions.find((c) => {
      return c.id === ordine.cliente.id;
    });
    const operatoreSelezionato = operatoriOptions.find((o) => {
      return o.id === ordine.operatore.id;
    });
    const etichettaSelezionata = etichetteOptions.find((e) => {
      return e.id === ordine.etichetta.id;
    });

    setCliente(clienteSelezionato || null);
    setOperatore(operatoreSelezionato || null);
    setEtichetta(etichettaSelezionata || null);
  }, [
    ordine,
    loadingOptions,
    clientiOptions,
    operatoriOptions,
    etichetteOptions,
  ]);

  const resetForm = () => {
    setQuantita("");
    setDataOrdine("");
    setDataConsegna("");
    setCliente(null);
    setOperatore(null);
    setEtichetta(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!quantita || isNaN(Number(quantita)) || Number(quantita) <= 0) {
      setMessaggioAlert({
        tipo: "danger",
        messaggio: "la quantità deve essere un numero positivo",
      });
      setTimeout(() => {
        setMessaggioAlert(null);
      }, 4000);
      return;
    }

    if (!cliente || !operatore) {
      setMessaggioAlert({
        tipo: "danger",
        messaggio: "il cliente e l'operatore sono campi obbligatori",
      });
      setTimeout(() => {
        setMessaggioAlert(null);
      }, 4000);
      return;
    }

    try {
      const data = {
        quantita,
        dataOrdine,
        dataConsegna,
        cliente: cliente,
        operatore: operatore,
        etichetta: etichetta,
        stato: ordine?.id ? stato : "IN_ATTESA",
        id: ordine?.id,
      };

      if (ordine?.id) {
        await axiosInstance.put(
          `http://localhost:8080/ordini/${ordine.id}`,
          data
        );
        setMessaggioAlert({
          tipo: "warning",
          messaggio: "Ordine modificato con successo",
        });
        setTimeout(() => {
          setMessaggioAlert(null);
        }, 4000);
      } else {
        await axiosInstance.post("http://localhost:8080/ordini", data);
        setMessaggioAlert({
          tipo: "success",
          messaggio: "Ordine creato con successo",
        });
        setTimeout(() => {
          setMessaggioAlert(null);
        }, 4000);
      }

      onSuccess();
      resetForm();
    } catch (err: any) {
      console.error("Errore nella POST:", err);
      setMessaggioAlert({
        tipo: "danger",
        messaggio: "Errore durante il salvataggio, riprova più tardi",
      });
      setTimeout(() => {
        setMessaggioAlert(null);
      }, 4000);
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit} className="row g-3 justify-content-center">
        <div className="col-md-4">
          <label className="form-label">Quantità</label>
          <input
            type="text"
            className="form-control"
            value={quantita}
            onChange={(e) => setQuantita(e.target.value)}
            required
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Data Ordine</label>
          <input
            type="date"
            className="form-control"
            value={dataOrdine}
            onChange={(e) => setDataOrdine(e.target.value)}
            required
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Data Consegna</label>
          <input
            type="date"
            className="form-control"
            value={dataConsegna}
            onChange={(e) => setDataConsegna(e.target.value)}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Cliente</label>
          <Select
            options={clientiOptions}
            getOptionLabel={(c) =>
              `${c.nome} ${c.cognome} (${c.numeroTelefono})`
            }
            getOptionValue={(c) => c.id.toString()}
            value={cliente}
            onChange={(selected) => setCliente(selected)}
            placeholder="Seleziona cliente..."
            isClearable
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Operatore</label>
          <Select
            options={operatoriSpedizione}
            getOptionLabel={(o) => `${o.nome} ${o.cognome} (${o.reparto})`}
            getOptionValue={(o) => o.id.toString()}
            value={operatore}
            onChange={(selected) => setOperatore(selected)}
            placeholder="Seleziona operatore reparto Spedizione..."
            isClearable
          />
        </div>

        <div className="col-md-12">
          <label className="form-label">Etichetta</label>
          <Select
            options={etichetteOptions}
            getOptionLabel={(e) => e.nomeEtichetta}
            getOptionValue={(e) => e.id.toString()}
            value={etichetta}
            onChange={(selected) => setEtichetta(selected)}
            placeholder="Seleziona etichetta..."
            isClearable
          />
        </div>

        {ordine && (
          <div className="col-md-6">
            <label className="form-label">Stato ordine</label>
            <select
              className="form-select"
              value={stato}
              onChange={(e) => setStato(e.target.value)}
            >
              <option value="IN_ATTESA">In Attesa</option>
              <option value="IN_LAVORAZIONE">In Lavorazione</option>
              <option value="SPEDITO">Spedito</option>
              <option value="CONSEGNATO">Consegnato</option>
              <option value="ANNULLATO">Annullato</option>
            </select>
          </div>
        )}

        <div className="col-12 text-center">
          <button type="submit" className="custom-button btn-salva">
            {ordine ? "Modifica Ordine" : "Crea Ordine"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrdiniForm;
