import { useState } from "react";
import axios from "axios";

interface OperatoreFormProps{
    onSuccess: () =>void;
}

const OperatoreForm: React.FC<OperatoreFormProps> = ({ onSuccess }) =>{
    
    const [nome, setNome] = useState("");
    const [cognome, setCognome] = useState ("");
    const [reparto, setReparto] = useState("");
    const [utenteId, setUtenteId] = useState < number | undefined > ();
    const [errore, setErrore] = useState("")
    

    const handleSubmit = async (e:React.FormEvent)=>{
        e.preventDefault();
        setErrore("");
    

    try {
        await axios.post("http://localhost:8080/operatori/create",{
            nome,
            cognome,
            reparto,
            utenteId
        });
        onSuccess();
    }

        catch (err: any) {
            setErrore( "Errore durante la creazione dell'operatore")
        
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
        <input
          type="text"
          className="form-control"
          value={reparto}
          onChange={(e) => setReparto(e.target.value)}
          required
        />
      </div>

      <div className="col-md-6">
        <label className="form-label">ID Utente</label>
        <input
          type="number"
          className="form-control"
          value={utenteId || ""}
          onChange={(e) => setUtenteId(Number(e.target.value))}
          required
        />
      </div>

      {errore && (
        <div className="col-12">
          <p className="text-danger">{errore}</p>
        </div>
      )}

      <div className="col-12 text-center">
        <button type="submit" className="btn btn-primary">
          Crea Operatore
        </button>
      </div>
    </form>
  </div>
);



};

export default OperatoreForm;