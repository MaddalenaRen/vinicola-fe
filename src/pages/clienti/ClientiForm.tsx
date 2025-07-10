import { useState, useEffect } from "react";
import axios from "axios";

interface ClientiFormProps {
  onSuccess: () => void;
  cliente?: any;
}

const ClientiForm: React.FC<ClientiFormProps> = ({ onSuccess, cliente }) => {
  const [nome, setNome] = useState(cliente?.nome || "");
  const [cognome, setCognome] = useState(cliente?.cognome || "");
  const [email, setEmail] = useState(cliente?.email || "");
  const [numeroTelefono, setNumeroTelefono] = useState(
    cliente?.numeroTelefono || ""
  );
  const [partitaIva, setPartitaIva] = useState(cliente?.partitaIva || "");
  const [tipoCliente, setTipoCliente] = useState<"PRIVATO" | "AZIENDA">(
    cliente?.tipoCliente || "PRIVATO"
  );

  const [errore, setErrore] = useState("");
  const [successo, setSuccesso] = useState("");

  useEffect(() => {
    if (cliente) {
      setNome(cliente.nome);
      setCognome(cliente.cognome);
      setEmail(cliente.email);
      setNumeroTelefono(cliente.numeroTelefono);
      setPartitaIva(cliente.partitaIva || "");
      setTipoCliente(cliente.tipoCliente);
    }
  }, [cliente]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrore("");
    try {
      if (cliente?.id) {
        // UPDATE
        await axios.put(`http://localhost:8080/clienti/${cliente.id}`, {
          nome,
          cognome,
          email,
          numeroTelefono,
          partitaIva: tipoCliente === "AZIENDA" ? partitaIva : "",
          tipoCliente,
        });
        setSuccesso("Cliente modificato con successo");
      } else {
        // CREATE
        await axios.post("http://localhost:8080/clienti", {
          nome,
          cognome,
          email,
          numeroTelefono,
          partitaIva: tipoCliente === "AZIENDA" ? partitaIva : "",
          tipoCliente,
        });
        setSuccesso("Cliente creato con successo");
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
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Telefono</label>
          <input
            type="text"
            className="form-control"
            value={numeroTelefono}
            onChange={(e) => setNumeroTelefono(e.target.value)}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Tipo Cliente</label>
          <select
            className="form-select"
            value={tipoCliente}
            onChange={(e) =>
              setTipoCliente(e.target.value as "PRIVATO" | "AZIENDA")
            }
            required
          >
            <option value="PRIVATO">Privato</option>
            <option value="AZIENDA">Azienda</option>
          </select>
        </div>

        {tipoCliente === "AZIENDA" && (
          <div className="col-md-6">
            <label className="form-label">Partita IVA</label>
            <input
              type="text"
              className="form-control"
              value={partitaIva}
              onChange={(e) => setPartitaIva(e.target.value)}
            />
          </div>
        )}

        {errore && (
          <div className="col-12">
            <p className="text-danger">{errore}</p>
          </div>
        )}
        <div className="col-12 text-center">
          <button type="submit" className="btn btn-primary">
            {cliente ? "Modifica Cliente" : "Crea Cliente"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientiForm;
