import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

interface Ordine {
  id?: number;
  quantita: string;
  dataOrdine: string;
  dataConsegna: string;
  cliente: string;
  operatore: string;
  etichette: string;
}

interface OptionType {
  value: string;
  label: string;
}

interface OrdiniFormProps {
  onSuccess: (
    tipo: "success" | "warning" | "danger",
    messaggio: string
  ) => void;
  ordine?: Ordine | null;
}

const OrdiniForm: React.FC<OrdiniFormProps> = ({ onSuccess, ordine }) => {
  const [quantita, setQuantita] = useState("");
  const [dataOrdine, setDataOrdine] = useState("");
  const [dataConsegna, setDataConsegna] = useState("");

 
  const [cliente, setCliente] = useState<OptionType | null>(null);
  const [operatore, setOperatore] = useState<OptionType | null>(null);
  const [etichette, setEtichette] = useState<OptionType | null>(null);

  
  const [clientiOptions, setClientiOptions] = useState<OptionType[]>([]);
  const [operatoriOptions, setOperatoriOptions] = useState<OptionType[]>([]);
  const [etichetteOptions, setEtichetteOptions] = useState<OptionType[]>([]);

  
  useEffect(() => {
    const fetchOptions = async () => {
      try {
       
        const [clientiRes, operatoriRes, etichetteRes] = await Promise.all([
          axios.get("http://localhost:8080/clienti"),
          axios.get("http://localhost:8080/operatori"),
          axios.get("http://localhost:8080/etichette"),
        ]);

        
        setClientiOptions(clientiRes.data.content);
        setOperatoriOptions(operatoriRes.data.content);
        setEtichetteOptions(etichetteRes.data.content);
      } catch (error) {
        console.error("Errore caricamento opzioni:", error);
      }
    };

    fetchOptions();
  }, []);

  
  useEffect(() => {
    if (ordine) {
      setQuantita(ordine.quantita || "");
      setDataOrdine(ordine.dataOrdine?.split("T")[0] || "");
      setDataConsegna(ordine.dataConsegna?.split("T")[0] || "");

     
      setCliente(clientiOptions.find(c => c.label === ordine.cliente) || null);
      setOperatore(operatoriOptions.find(o => o.label === ordine.operatore) || null);
      setEtichette(etichetteOptions.find(e => e.label === ordine.etichette) || null);
    } else {
      resetForm();
    }
  }, [ordine, clientiOptions, operatoriOptions, etichetteOptions]);

  const resetForm = () => {
    setQuantita("");
    setDataOrdine("");
    setDataConsegna("");
    setCliente(null);
    setOperatore(null);
    setEtichette(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!quantita || isNaN(Number(quantita)) || Number(quantita) <= 0) {
      onSuccess("danger", "La quantità deve essere un numero positivo.");
      return;
    }

    if (!cliente || !operatore) {
      onSuccess("danger", "Cliente e operatore sono campi obbligatori.");
      return;
    }

    try {
      const payload = {
        quantita,
        dataOrdine,
        dataConsegna,
       
        cliente: cliente.label,
        operatore: operatore.label,
        etichette: etichette?.label || "",
      };

      if (ordine?.id) {
        await axios.put(`http://localhost:8080/ordini/${ordine.id}`, {
          ...payload,
          id: ordine.id,
        });
        onSuccess("warning", "Ordine modificato con successo.");
      } else {
        await axios.post("http://localhost:8080/ordini", payload);
        onSuccess("success", "Ordine creato con successo.");
        resetForm();
      }
    } catch (err) {
      console.error(err);
      onSuccess("danger", "Errore durante il salvataggio. Riprova più tardi.");
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
            getOptionLabel={(c:any) => c.nome + " " + c.cognome + " " + c.numeroTelefono}      
            getOptionValue={(c:any) => c.id.toString()}
            value={cliente}
            onChange={(selected) => setCliente(selected as OptionType)}
            placeholder="Seleziona cliente..."
            isClearable
            required
          />
        </div>

      
        <div className="col-md-6">
          <label className="form-label">Operatore</label>
          
          <Select
            options={operatoriOptions}
            getOptionLabel={(o:any) => o.nome + " " + o.cognome + " " + o.numeroTelefono}      
            getOptionValue={(o:any) => o.id.toString()}
            value={operatore}
            onChange={(selected) => setOperatore(selected as OptionType)}
            placeholder="Seleziona operatore..."
            isClearable
            required
          />
        </div>

        
        <div className="col-md-12">
          <label className="form-label">Etichette</label>
          <Select
            options={etichetteOptions}
            getOptionLabel={(e:any) => e.nomeEtichetta + " " }      
            getOptionValue={(e:any) => e.id.toString()}
            value={etichette}
            onChange={(selected) => setEtichette(selected as OptionType)}
            placeholder="Seleziona etichetta..."
            isClearable
          />
        </div>

        <div className="col-12 text-center">
          <button type="submit" className="btn btn-primary">
            {ordine ? "Modifica Ordine" : "Crea Ordine"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrdiniForm;




