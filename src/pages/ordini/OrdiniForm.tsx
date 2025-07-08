import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";

interface OrdiniFormProps{
    onSuccess: () =>void;
}

interface Cliente {
  id: number;
  nome: string;
  cognome: string;
}

interface Operatore{
    id: number;
    nome: string;
    cognome: string;
    reparto: string;
}

interface Etichette {
  id: number;
  nome: string;
  nomeCantina: string;
  tipologiaVino: string;
  gradazioneAlcolica: number;
  dataImbottigliamento: Date;
}

const OrdiniForm: React.FC<OrdiniFormProps> = ({ onSuccess }) =>{
    
  const [quantita, setQuantita] = useState<number>(1);
  const [dataOrdine, setDataOrdine] = useState<string>("");
  const [dataConsegna, setDataConsegna] = useState<string>("");
  const [clienteId, setClienteId] = useState<string>("");
  const [operatoreId, setOperatoreId] = useState<string>("");
  const [etichetteId, setEtichetteId] = useState<string>("");
  const [errore, setErrore] = useState<string>("");

  const [clienti, setClienti] = useState<Cliente[]>([]);
  const [operatori, setOperatori] = useState<Operatore[]>([]);
  const [etichette, setEtichette] = useState<Etichette[]>([]);

  const clienteOptions = clienti.map((cliente) => ({
  value: cliente.id.toString(),
  label: `${cliente.nome} ${cliente.cognome}`,
}));

const operatoreOptions = operatori.map((op) => ({
  value: op.id.toString(),
  label: `${op.nome} ${op.cognome}`,
}));

const etichetteOptions = etichette.map((et) => ({
  value: et.id.toString(),
  label: et.nome || et.tipologiaVino || `Prodotto #${et.id}`,
}));

  
  useEffect (() =>{
    axios.get("http://localhost:8080/clienti").then((response) => setClienti(response.data.content));
    axios.get("http://localhost:8080/operatori").then((response) => setOperatori(response.data.content));
    axios.get("http://localhost:8080/etichette").then((response) => setEtichette(response.data.content));
  }, [])
    

     const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrore("");

    try {
      await axios.post("http://localhost:8080/ordini/create", {
        quantita,
        dataOrdine,
        dataConsegna,
        clienteId,
        operatoreId,
        etichetteId,
      });
      alert("Ordine creato con successo!");
      onSuccess();
    } catch (err: any) {
      setErrore("Errore durante la creazione dell'ordine");
    }
  };

    return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Quantità</label>
          <input
            type="number"
            className="form-control"
            value={quantita}
            onChange={(e) => setQuantita(Number(e.target.value))}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Data Ordine</label>
          <input
            type="date"
            className="form-control"
            value={dataOrdine}
            onChange={(e) => setDataOrdine(e.target.value)}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Data Consegna</label>
          <input
            type="date"
            className="form-control"
            value={dataConsegna}
            onChange={(e) => setDataConsegna(e.target.value)}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Cliente</label>
            <Select
                options={clienteOptions}
                onChange={(option) => setClienteId(option?.value || "")}
                value={clienteOptions.find(opt => opt.value === clienteId) || null}
                placeholder="Seleziona un cliente..."
                isClearable
            />

        </div>

        <div className="col-md-6">
          <label className="form-label">Operatore</label>
          <Select
                options={operatoreOptions}
                onChange={(option) => setOperatoreId(option?.value || "")}
                value={operatoreOptions.find(opt => opt.value === operatoreId) || null}
                placeholder="Seleziona un operatore..."
                isClearable
            />
        </div>

        <div className="col-md-6">
          <label className="form-label">Etichette</label>
            <Select
                options={etichetteOptions}
                onChange={(option) => setEtichetteId(option?.value || "")}
                value={etichetteOptions.find(opt => opt.value === etichetteId) || null}
                placeholder="Seleziona un prodotto..."
                isClearable
            />
        </div>

        {errore && (
          <div className="col-12">
            <p className="text-danger">{errore}</p>
          </div>
        )}

        <div className="col-12 text-center">
          <button type="submit" className="btn btn-success">
            Invia Ordine
          </button>
        </div>
      </form>
    </div>
  );
};








export default OrdiniForm;