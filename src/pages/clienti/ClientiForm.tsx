import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosConfig";

export interface Cliente {
  id?: number;
  nome: string;
  cognome: string;
  email: string;
  numeroTelefono: string;
  partitaIva?: string;
  tipoCliente: "PRIVATO" | "AZIENDA";
}

interface ClientiFormProps {
  onSuccess: () => void;
  cliente: Cliente | undefined;
  setMessaggioAlert: React.Dispatch<
    React.SetStateAction<{
      tipo: "success" | "warning" | "danger";
      messaggio: string;
    } | null>
  >;
}

const ClientiForm: React.FC<ClientiFormProps> = ({
  onSuccess,
  cliente,
  setMessaggioAlert,
}) => {
  const [formData, setFormData] = useState<Cliente>({
    nome: "",
    cognome: "",
    email: "",
    numeroTelefono: "",
    partitaIva: "",
    tipoCliente: "PRIVATO",
  });

  useEffect(() => {
    if (cliente) {
      setFormData(cliente);
    } else {
      setFormData({
        nome: "",
        cognome: "",
        email: "",
        numeroTelefono: "",
        partitaIva: "",
        tipoCliente: "PRIVATO",
      });
    }
  }, [cliente]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (cliente?.id) {
        await axiosInstance.put(`/clienti/${cliente.id}`, formData);
        setMessaggioAlert({
          tipo: "warning",
          messaggio: "Cliente modificato con successo",
        });
      } else {
        await axiosInstance.post("/clienti", formData);
        setMessaggioAlert({
          tipo: "success",
          messaggio: "Cliente creato con successo",
        });
      }

      setTimeout(() => setMessaggioAlert(null), 4000);
      onSuccess();
      setFormData({
        nome: "",
        cognome: "",
        email: "",
        numeroTelefono: "",
        partitaIva: "",
        tipoCliente: "PRIVATO",
      });
    } catch (err) {
      console.error("Errore nel salvataggio:", err);
      setMessaggioAlert({
        tipo: "danger",
        messaggio: "Errore durante il salvataggio del cliente",
      });
      setTimeout(() => setMessaggioAlert(null), 4000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Nome</label>
          <input
            type="text"
            name="nome"
            className="form-control"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Cognome</label>
          <input
            type="text"
            name="cognome"
            className="form-control"
            value={formData.cognome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Numero di Telefono</label>
          <input
            type="text"
            name="numeroTelefono"
            className="form-control"
            value={formData.numeroTelefono}
            onChange={handleChange}
            required
          />
          <small className="text-muted">
              Inserire numero di telefono.
            </small>
        </div>

        {formData.tipoCliente === "AZIENDA" && (
          <div className="col-md-6 mb-3">
            <label className="form-label">Partita IVA</label>
            <input
              type="text"
              name="partitaIva"
              className="form-control"
              value={formData.partitaIva || ""}
              onChange={handleChange}
              pattern="\d{11}"
              maxLength={11}
              title="La Partita IVA deve contenere esattamente 11 cifre numeriche"
            />
            <small className="text-muted">
              La Partita IVA deve contenere esattamente 11 cifre.
            </small>
          </div>
        )}

        <div className="col-md-6 mb-3">
          <label className="form-label">Tipo Cliente</label>
          <select
            name="tipoCliente"
            className="form-select"
            value={formData.tipoCliente}
            onChange={handleChange}
            required
          >
            <option value="PRIVATO">Privato</option>
            <option value="AZIENDA">Azienda</option>
          </select>
        </div>
      </div>

      <div className="col-12 text-center">
        <button type="submit" className="custom-button btn-salva">
          {cliente ? "Modifica Cliente" : "Crea Cliente"}
        </button>
      </div>
    </form>
  );
};

export default ClientiForm;
