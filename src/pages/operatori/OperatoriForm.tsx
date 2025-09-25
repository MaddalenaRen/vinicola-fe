import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosConfig";

interface Operatore {
  id?: number;
  nome: string;
  cognome: string;
  reparto: string;
  numeroTelefono?: string;
  email: string;
}

interface OperatoriFormProps {
  onSuccess: () => void;
  operatore?: Operatore | null;
  setMessaggioAlert: React.Dispatch<
    React.SetStateAction<{
      tipo: "success" | "warning" | "danger";
      messaggio: string;
    } | null>
  >;
}

const OperatoriForm: React.FC<OperatoriFormProps> = ({
  onSuccess,
  operatore,
  setMessaggioAlert,
}) => {
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [reparto, setReparto] = useState("");
  const [numeroTelefono, setNumeroTelefono] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (operatore) {
      setNome(operatore.nome || "");
      setCognome(operatore.cognome || "");
      setReparto(operatore.reparto || "");
      setNumeroTelefono(operatore.numeroTelefono || "");
      setEmail(operatore.email || "");
    } else {
      resetForm();
    }
  }, [operatore]);

  const resetForm = () => {
    setNome("");
    setCognome("");
    setReparto("");
    setNumeroTelefono("");
    setEmail("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessaggioAlert(null);
    try {
      if (operatore?.id) {
        await axiosInstance.put(
          `http://localhost:8080/operatori/${operatore.id}`,
          { nome, cognome, reparto, numeroTelefono, email }
        );
        setMessaggioAlert({
          tipo: "warning",
          messaggio: "Operatore modificato con successo",
        });
      } else {
        await axiosInstance.post("http://localhost:8080/operatori", {
          nome,
          cognome,
          reparto,
          numeroTelefono,
          email,
        });
        setMessaggioAlert({
          tipo: "success",
          messaggio:
            "Operatore creato con successo (riceverà la mail di attivazione)",
        });
      }
      setTimeout(() => setMessaggioAlert(null), 4000);
      onSuccess();
      resetForm();
    } catch (err) {
      setMessaggioAlert({
        tipo: "danger",
        messaggio: "Errore durante il salvataggio",
      });
      setTimeout(() => setMessaggioAlert(null), 4000);
    }
  };

  return (
    <div className="container mt-4">
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
          <select
            className="form-select"
            value={reparto}
            onChange={(e) => setReparto(e.target.value)}
            required
          >
            <option value="">Seleziona un reparto</option>
            <option value="SPEDIZIONE">SPEDIZIONE</option>
            <option value="ETICHETTATURA">ETICHETTATURA</option>
            <option value="IMBOTTIGLIAMENTO">IMBOTTIGLIAMENTO</option>
            <option value="VENDEMMIA">VENDEMMIA</option>
            <option value="FERMENTAZIONE">FERMENTAZIONE</option>
            <option value="AFFINAMENTO">AFFINAMENTO</option>
          </select>
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
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="col-12 text-center">
          <button type="submit" className="custom-button btn-salva">
            {operatore ? "Modifica Operatore" : "Crea Operatore"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OperatoriForm;
