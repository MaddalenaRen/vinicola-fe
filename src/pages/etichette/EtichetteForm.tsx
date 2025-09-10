import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosConfig";

interface Etichetta {
  id?: number;
  nomeEtichetta: string;
  tipologiaVino: string;
  gradazioneAlcolica: number;
  dataImbottigliamento: string;
}

interface EtichetteFormProps {
  onSuccess: () => void;
  etichetta?: Etichetta | null;
  setMessaggioAlert: React.Dispatch<
    React.SetStateAction<{
      tipo: "success" | "warning" | "danger";
      messaggio: string;
    } | null>
  >;
}

const EtichetteForm: React.FC<EtichetteFormProps> = ({
  onSuccess,
  etichetta,
  setMessaggioAlert,
}) => {
  const [nomeEtichetta, setNomeEtichetta] = useState("");
  const [tipologiaVino, setTipologiaVino] = useState("");
  const [gradazioneAlcolica, setGradazioneAlcolica] = useState<string>("0");
  const [dataImbottigliamento, setDataImbottigliamento] = useState("");

  useEffect(() => {
    if (etichetta) {
      setNomeEtichetta(etichetta.nomeEtichetta || "");
      setTipologiaVino(etichetta.tipologiaVino || "");
      setGradazioneAlcolica(String(etichetta.gradazioneAlcolica ?? "0"));
      setDataImbottigliamento(
        etichetta.dataImbottigliamento?.split("T")[0] || ""
      );
    } else {
      resetForm();
    }
  }, [etichetta]);

  const resetForm = () => {
    setNomeEtichetta("");
    setTipologiaVino("");
    setGradazioneAlcolica("0");
    setDataImbottigliamento("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const gradazioneAlcolicaNum = parseFloat(gradazioneAlcolica);

    if (
      isNaN(gradazioneAlcolicaNum) ||
      gradazioneAlcolicaNum < 0 ||
      gradazioneAlcolicaNum > 25
    ) {
      setMessaggioAlert({
        tipo: "danger",
        messaggio: "La gradazione alcolica deve essere tra 0 e 25 gradi",
      });
      setTimeout(() => {
        setMessaggioAlert(null);
      }, 4000);
      return;
    }

    try {
      const payload = {
        nomeEtichetta,
        tipologiaVino,
        gradazioneAlcolica: gradazioneAlcolicaNum,
        dataImbottigliamento,
        lottiId: [],
        ordineEtichetteId: [],
      };

      if (etichetta?.id) {
        await axiosInstance.put(
          `http://localhost:8080/etichette/${etichetta.id}`,

          { ...payload, id: etichetta.id }
        );

        setMessaggioAlert({
          tipo: "warning",
          messaggio: "Etichetta modificata con successo",
        });
        setTimeout(() => {
          setMessaggioAlert(null);
        }, 4000);

        onSuccess();
        resetForm();
      } else {
        await axiosInstance.post("http://localhost:8080/etichette", payload);
        setMessaggioAlert({
          tipo: "success",
          messaggio: "Etichetta creata con successo",
        });
        setTimeout(() => {
          setMessaggioAlert(null);
        }, 4000);
        onSuccess();
        resetForm();
      }
    } catch (err) {
      console.error(err);
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
            onChange={(e) => setGradazioneAlcolica(e.target.value)}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Data Imbottigliamento</label>
          <input
            type="date"
            className="form-control"
            value={dataImbottigliamento}
            onChange={(e) => setDataImbottigliamento(e.target.value)}
            required
          />
        </div>

        <div className="col-12 text-center">
          <button type="submit" className="custom-button btn-salva">
            {etichetta ? "Modifica Etichetta" : "Crea Etichetta"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EtichetteForm;
