import { useState } from "react";
import axios from "axios";

interface ClientiFormProps{
    onSuccess: () =>void;
}

const ClientiForm: React.FC<ClientiFormProps> = ({ onSuccess }) =>{
    
    const [nome, setNome] = useState("");
    const [cognome, setCognome] = useState ("");
    const [email, setEmail] = useState("");
    const [numeroTelefono, setNumeroTelefono] = useState ("");
    const [codiceFiscale, setCodiceFiscale] = useState ("");
    const [partitaIva, setPartitaIva] = useState ("");
    const [errore, setErrore] = useState("")
    

    const handleSubmit = async (e:React.FormEvent)=>{
        e.preventDefault();
        setErrore("");
    

    try {
        await axios.post("http://localhost:8080/clienti/create",{
            nome,
            cognome,
            email,
            numeroTelefono,
            codiceFiscale,
            partitaIva
        });
        onSuccess();
    }

        catch (err: any) {
            setErrore( "Errore durante la creazione del cliente")
        
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
        <label className="form-label">Email</label>
        <input
          type="text"
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
          onChange={(e) => setNumeroTelefono((e.target.value))}
          required
        />
      </div>

      <div className="col-md-6">
        <label className="form-label">Codice Fiscale</label>
        <input
          type="text"
          className="form-control"
          value={codiceFiscale}
          onChange={(e) => setCodiceFiscale((e.target.value))}
          required
        />
      </div>

         <div className="col-md-6">
        <label className="form-label">Partita IVA</label>
        <input
          type="text"
          className="form-control"
          value={partitaIva}
          onChange={(e) => setPartitaIva((e.target.value))}
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
          Crea Cliente
        </button>
      </div>
    </form>
  </div>
);



};

export default ClientiForm;