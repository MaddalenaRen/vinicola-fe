import { useEffect, useState } from "react";
import Select from "react-select";
import axiosInstance from "../../api/axiosConfig";

interface LottoVino {
  quantita: number;
  nome: string;
  annata: number;
  varietaUva: string;
  faseProduzione: string;
  etichetta: Etichetta;
  id?: number;
}

interface LottoVinoDto {
  quantita: number;
  nome: string;
  annata: number;
  varietaUva: string;
  fasiProduzioneIds: string;
  etichetta: Etichetta;
  id?: number;
}

interface Etichetta {
  id: number;
  nomeEtichetta: string;
}

interface EtichettaOption {
  id: number;
  nomeEtichetta: string;
}

interface FaseProduzioneOption {
  id: string;
  descrizione: string;
}

interface LottoVinoFormProps {
  onSuccess: () => void;
  lottoVino?: LottoVino | null;
  setMessaggioAlert: React.Dispatch<
    React.SetStateAction<{
      tipo: "success" | "warning" | "danger";
      messaggio: string;
    } | null>
  >;
}

const LottoVinoForm: React.FC<LottoVinoFormProps> = ({
  onSuccess,
  lottoVino,
  setMessaggioAlert,
}) => {
  const [quantita, setQuantita] = useState<string>("100");
  const [nome, setNome] = useState<string>("");
  const [annata, setAnnata] = useState<string>(
    String(new Date().getFullYear())
  );
  const [varietaUva, setVarietaUva] = useState<string>("");

  const [etichette, setEtichette] = useState<EtichettaOption[]>([]);
  const [fasiProduzione, setFasiProduzione] = useState<FaseProduzioneOption[]>(
    []
  );

  const [selectedEtichetta, setSelectedEtichetta] =
    useState<EtichettaOption | null>(null);
  const [selectedFase, setSelectedFase] = useState<FaseProduzioneOption | null>(
    null
  );

  useEffect(() => {
    const fetchDati = async () => {
      try {
        const resEtichette = await axiosInstance.get(
          "http://localhost:8080/etichette",
          {
            params: {
              size: 1000,
              page: 0,
            },
          }
        );
        const resFasi = await axiosInstance.get(
          "http://localhost:8080/fasi-produzione/tipo-fasi"
        );
        setEtichette(resEtichette.data.content || []);
        setFasiProduzione(resFasi.data || []);

        if (lottoVino) {
          setNome(lottoVino.nome);
          setAnnata(String(lottoVino.annata));
          setQuantita(String(lottoVino.quantita));
          setVarietaUva(lottoVino.varietaUva);

          const etichettaSelezionata = resEtichette.data.content.find(
            (e: EtichettaOption) =>
              e.nomeEtichetta === lottoVino.etichetta.nomeEtichetta
          );
          setSelectedEtichetta(etichettaSelezionata || null);

          const faseSelezionata = resFasi.data.find(
            (f: FaseProduzioneOption) => f.id === lottoVino.faseProduzione
          );
          setSelectedFase(faseSelezionata || null);
        } else {
          resetForm();
        }
      } catch (error) {
        console.error("Errore nel caricamento dei dati:", error);
        setMessaggioAlert({
          tipo: "danger",
          messaggio: "Errore nel caricamento dati etichette o fasi produzione",
        });
      }
    };

    fetchDati();
  }, [lottoVino, setMessaggioAlert]);

  const resetForm = () => {
    setQuantita("100");
    setNome("");
    setAnnata(String(new Date().getFullYear()));
    setVarietaUva("");
    setSelectedEtichetta(null);
    setSelectedFase(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessaggioAlert(null);

    const quantitaNum = Number(quantita);
    const annataNum = Number(annata);

    if (quantitaNum < 100) {
      setMessaggioAlert({
        tipo: "danger",
        messaggio: "La quantità minima è 100",
      });
      return;
    }

    if (!selectedEtichetta) {
      setMessaggioAlert({
        tipo: "danger",
        messaggio: "Seleziona un'etichetta valida",
      });
      return;
    }
    if (!selectedFase) {
      setMessaggioAlert({
        tipo: "danger",
        messaggio: "Seleziona una fase di produzione",
      });
      return;
    }

    const data: LottoVinoDto = {
      quantita: quantitaNum,
      nome,
      annata: annataNum,
      varietaUva,
      etichetta: selectedEtichetta,
      fasiProduzioneIds: selectedFase.descrizione,
      id: lottoVino?.id,
    };

    try {
      if (lottoVino?.id) {
        await axiosInstance.put(
          `http://localhost:8080/lotti-vino/${lottoVino.id}`,
          data
        );
        setMessaggioAlert({
          tipo: "warning",
          messaggio: "Lotto modficato con successo",
        });
      } else {
        await axiosInstance.post("http://localhost:8080/lotti-vino", data);
        setMessaggioAlert({
          tipo: "success",
          messaggio: "Lotto creato con successo",
        });
        resetForm();
      }
      onSuccess();
      setTimeout(() => setMessaggioAlert(null), 4000);
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
          <label className="form-label">Quantità (min 100)</label>
          <input
            type="number"
            className="form-control"
            min={100}
            value={quantita}
            onChange={(e) => setQuantita(e.target.value)}
            required
          />
        </div>

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
          <label className="form-label">Annata</label>
          <input
            type="number"
            className="form-control"
            min={1900}
            max={new Date().getFullYear()}
            value={annata}
            onChange={(e) => setAnnata(e.target.value)}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Varietà Uva</label>
          <input
            type="text"
            className="form-control"
            value={varietaUva}
            onChange={(e) => setVarietaUva(e.target.value)}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Etichetta</label>
          <Select<EtichettaOption>
            options={etichette}
            value={selectedEtichetta}
            getOptionLabel={(c) => c.nomeEtichetta}
            getOptionValue={(c) => c.id.toString()}
            onChange={(selected) => setSelectedEtichetta(selected)}
            placeholder="Seleziona etichetta..."
            isClearable
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Fasi Produzione</label>
          <Select<FaseProduzioneOption>
            options={fasiProduzione}
            value={selectedFase}
            getOptionLabel={(c) => c.descrizione}
            getOptionValue={(c) => c.id}
            onChange={(selected) => setSelectedFase(selected)}
            placeholder="Seleziona fase produzione..."
            isClearable
          />
        </div>

        <div className="col-12 text-center">
          <button type="submit" className="custom-button btn-salva">
            {lottoVino?.id ? "Modifica Lotto" : "Crea Lotto"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LottoVinoForm;
