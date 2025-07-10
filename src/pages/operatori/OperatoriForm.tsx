import { useState, useEffect } from "react";
import axios from "axios";

interface OperatoriFormProps {
  onSuccess: () => void;
  cliente?: any;
}

const OperatoriForm: React.FC<OperatoriFormProps> = ({
  onSuccess,
  operatore,
}) => {
  const [nome, setNome] = useState(operatore?.nome || "");
  const [cognome, setCognome] = useState(operatore?.cognome || "");
  const [reparto, setReparto] = useState(operatore?.reparto || "");
  const [numeroTelefono, setNumeroTelefono] = useState(
    operatore?.numeroTelefono || ""
  );
  const [utenteId, setUtenteId] = useState(operatore?.utenteId || "");

  const [errore, setErrore] = useState("");
  const [successo, setSuccesso] = useState("");

  useEffect(() => {
    if (operatore) {
      setNome(operatore.nome);
      setCognome(operatore.cognome);
      setReparto(operatore.reparto);
      setNumeroTelefono(operatore.numeroTelefono);
      setUtenteId(operatore.utenteId);
    }
  }, [operatore]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrore("");
    try {
      if (operatore?.id) {
        // UPDATE
        await axios.put(`http://localhost:8080/operatori/${operatore.id}`, {
          nome,
          cognome,
          reparto,
          numeroTelefono,
        });
        setSuccesso("Operatore modificato con successo");
      } else {
        // CREATE
        await axios.post("http://localhost:8080/operatori", {
          nome,
          cognome,
          reparto,
          numeroTelefono,
        });
        setSuccesso("Operatore creato con successo");
      }
      onSuccess();
      // reset
    } catch (err) {
      setErrore("Errore durante il salvataggio");
    }
  };

  return (
    <div className="container mt-4">
      {successo && <div className="alert alert-success">{successo}</div>}
      {errore && <div className="alert alert-danger">{errore}</div>}
      <form onSubmit={handleSubmit} className="row g-3 justify-content-center">
        <div className="col-md-6">
          <label className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Cognome</label>
          <input
            type="text"
            className="form-control"
            value={cognome}
            onChange={(e) => setCognome(e.target.value)}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Reparto</label>
          <input
            type="text"
            className="form-control"
            value={reparto}
            onChange={(e) => setReparto(e.target.value)}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Numero Telefono</label>
          <input
            type="text"
            className="form-control"
            value={numeroTelefono}
            onChange={(e) => setNumeroTelefono(e.target.value)}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Utente id</label>
          <input
            type="text"
            className="form-control"
            value={utenteId}
            onChange={(e) => setUtenteId(e.target.value)}
          />
        </div>

        {errore && (
          <div className="col-12">
            <p className="text-danger">{errore}</p>
          </div>
        )}
        <div className="col-12 text-center">
          <button type="submit" className="btn btn-primary">
            {operatore ? "Modifica Operatore" : "Crea Operatore"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OperatoriForm;
