import { useState, useEffect } from "react";
import axios from "axios";

interface EtichetteFormProps {
  onSuccess: () => void;
  etichetta?: any;
}

const EtichetteForm: React.FC<EtichetteFormProps> = ({
  onSuccess,
  etichetta,
}) => {
  const [nomeEtichetta, setNomeEtichetta] = useState("");
  const [tipologiaVino, setTipologiaVino] = useState("");
  const [gradazioneAlcolica, setGradazioneAlcolica] = useState<number>(0);
  const [dataImbottigliamento, setDataImbottigliamento] = useState("");
  const [cantinaId, setCantinaId] = useState<number | "">("");

  const [errore, setErrore] = useState("");
  const [successo, setSuccesso] = useState("");

  useEffect(() => {
    if (etichetta) {
      setNomeEtichetta(etichetta.nomeEtichetta || "");
      setTipologiaVino(etichetta.tipologiaVino || "");
      setGradazioneAlcolica(etichetta.gradazioneAlcolica || 0);
      setDataImbottigliamento(
        etichetta.dataImbottigliamento?.split("T")[0] || ""
      );
      setCantinaId(etichetta.cantinaId || "");
    }
  }, [etichetta]);

  const resetForm = () => {
    setNomeEtichetta("");
    setTipologiaVino("");
    setGradazioneAlcolica(0);
    setDataImbottigliamento("");
    setCantinaId("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrore("");
    setSuccesso("");

    if (gradazioneAlcolica < 0 || gradazioneAlcolica > 25) {
      setErrore("La gradazione alcolica deve essere tra 0 e 25.");
      return;
    }

    try {
      if (etichetta?.id) {
        // UPDATE
        await axios.post("http://localhost:8080/etichette", {
          nomeEtichetta,
          tipologiaVino,
          gradazioneAlcolica,
          dataImbottigliamento,
          cantinaId: cantinaId !== "" ? parseInt(cantinaId.toString()) : null,
          lottiId: [],
          ordineEtichetteId: [],
        });
        setSuccesso("Etichetta modificata con successo.");
      } else {
        // CREATE
        await axios.post("http://localhost:8080/etichette", {
          nomeEtichetta,
          tipologiaVino,
          gradazioneAlcolica,
          dataImbottigliamento,
          cantinaId: cantinaId !== "" ? parseInt(cantinaId.toString()) : null,
          lottiId: [],
          ordineEtichetteId: [],
        });
        setSuccesso("Etichetta creata con successo.");
        resetForm(); // solo dopo la creazione
      }
      onSuccess();
    } catch (err) {
      console.error(err);
      setErrore("Errore durante il salvataggio. Riprova più tardi.");
    }
  };

  return (
    <div className="container mt-4">
      {successo && <div className="alert alert-success">{successo}</div>}
      {errore && <div className="alert alert-danger">{errore}</div>}

      <form onSubmit={handleSubmit} className="row g-3 justify-content-center">
        <div className="col-md-6">
          <label className="form-label">Nome Etichetta</label>
          <input
            type="text"
            className="form-control"
            value={nomeEtichetta}
            onChange={(e) => setNomeEtichetta(e.target.value)}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Tipologia Vino</label>
          <select
            className="form-select"
            value={tipologiaVino}
            onChange={(e) => setTipologiaVino(e.target.value)}
            required
          >
            <option value="">Seleziona una tipologia</option>
            <option value="VINO_FERMO_ROSSO">Vino Fermo Rosso</option>
            <option value="VINO_FERMO_BIANCO">Vino Fermo Bianco</option>
            <option value="VINO_FERMO_ROSATO">Vino Fermo Rosato</option>
            <option value="SPUMANTE">Spumante</option>
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Gradazione Alcolica</label>
          <input
            type="number"
            className="form-control"
            step="0.1"
            min="0"
            max="25"
            value={gradazioneAlcolica}
            onChange={(e) =>
              setGradazioneAlcolica(parseFloat(e.target.value) || 0)
            }
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Data imbottigliamento</label>
          <input
            type="date"
            className="form-control"
            value={dataImbottigliamento}
            onChange={(e) => setDataImbottigliamento(e.target.value)}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Cantina ID</label>
          <input
            type="number"
            className="form-control"
            value={cantinaId}
            onChange={(e) =>
              setCantinaId(e.target.value ? parseInt(e.target.value) : "")
            }
            required
          />
        </div>

        <div className="col-12 text-center">
          <button type="submit" className="btn btn-primary">
            {etichetta ? "Modifica Etichetta" : "Crea Etichetta"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EtichetteForm;
