import { useState, useEffect, useRef } from "react";
import LottiVinoForm from "./LottiVinoForm";
import LottiVinoTable from "./LottiVinoTable";
import axiosInstance from "../../api/axiosConfig";
import Swal from "sweetalert2";

interface LottoVino {
  quantita: number;
  nome: string;
  annata: number;
  varietaUva: string;
  faseProduzione: string;
  etichetta: Etichetta;
  id?: number;
}

interface Etichetta {
  id: number;
  nomeEtichetta: string;
}

interface FaseProduzione {
  id: number;
  tipoFase: string;
  key: string;
}

interface FaseProduzioneOption {
  id: string;
  descrizione: string;
}

const LottiVino = () => {
  const [lottiVino, setLottiVino] = useState<LottoVino[]>([]);
  const [lottoVinoSelezionato, setLottoVinoSelezionato] = useState<
    LottoVino | undefined
  >(undefined);
  const [messaggioAlert, setMessaggioAlert] = useState<{
    tipo: "success" | "warning" | "danger";
    messaggio: string;
  } | null>(null);
  const [searchNome, setSearchNome] = useState("");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const [etichette, setEtichette] = useState<Etichetta[]>([]);
  const [fasiProduzione, setFasiProduzione] = useState<FaseProduzioneOption[]>([]);

  const formRef = useRef<HTMLDivElement>(null);

  const caricaEtichette = async () => {
    try {
      const response = await axiosInstance.get(
        "http://localhost:8080/etichette"
      );
      setEtichette(response.data.content);
    } catch (error) {
      console.error("Errore nel caricamento delle etichette:", error);
    }
  };

  const caricaFasiProduzione = async () => {
    try {
      const response = await axiosInstance.get(
        "http://localhost:8080/fasi-produzione/tipo-fasi"
      );
      setFasiProduzione(response.data || []);
    } catch (error) {
      console.error("Errore nel caricamento delle fasi di produzione:", error);
    }
  };

  const caricaLottiVino = async (pagina: number) => {
    try {
      const response = await axiosInstance.get(
        "http://localhost:8080/lotti-vino?page=" +
          (pagina - 1) +
          "&nome=" +
          searchNome
      );
      setLottiVino(response.data.content);
      setPageCount(response.data.totalPages);
      setPage(pagina);
    } catch (error) {
      console.error("Errore nel caricamento dei lotti:", error);
    }
  };

  useEffect(() => {
    caricaLottiVino(1);
    caricaEtichette();
    caricaFasiProduzione();
  }, []);

  const handlePageChange = (nuovaPagina: number) => {
    if (nuovaPagina < 1 || nuovaPagina > pageCount) return;
    caricaLottiVino(nuovaPagina);
  };

  const handleSuccess = () => {
    caricaLottiVino(page);
    setLottoVinoSelezionato(undefined);

    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }

    setTimeout(() => setMessaggioAlert(null), 4000);
  };

  const handleDeleteLotto = async (lottoVino: LottoVino) => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }

    const result = await Swal.fire({
      title: "Sei sicuro?",
      text: `Vuoi eliminare ${lottoVino.nome}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sì, elimina",
      cancelButtonText: "Annulla",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosInstance.delete(
        `http://localhost:8080/lotti-vino/${lottoVino.id}`
      );
      setMessaggioAlert({
        tipo: "success",
        messaggio: "Lotto eliminato con successo",
      });
      setTimeout(() => setMessaggioAlert(null), 4000);
      caricaLottiVino(page);

      if (lottoVinoSelezionato?.id === lottoVino.id) {
        setLottoVinoSelezionato(undefined);
      }
    } catch (err) {
      setMessaggioAlert({
        tipo: "danger",
        messaggio: "Errore durante l'eliminazione",
      });
      setTimeout(() => setMessaggioAlert(null), 4000);
      console.error("Errore durante l'eliminazione del lotto:", err);
    }
  };

  const handleEditLotto = (lotto: LottoVino) => {
    setLottoVinoSelezionato(lotto);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="container mt-4">
      <h2>Gestione Lotti</h2>
      {messaggioAlert && (
        <div
          className={`alert alert-${messaggioAlert.tipo} alert-dismissible fade show`}
          role="alert"
        >
          {messaggioAlert.messaggio}
          <button
            type="button"
            className="btn-close"
            onClick={() => setMessaggioAlert(null)}
          ></button>
        </div>
      )}

      <div ref={formRef}>
        <LottiVinoForm
          onSuccess={handleSuccess}
          lottoVino={lottoVinoSelezionato}
          setMessaggioAlert={setMessaggioAlert}
        />
      </div>
      <hr />
      <input
        type="text"
        placeholder="Cerca per nome lotto"
        value={searchNome}
        onChange={(e) => setSearchNome(e.target.value)}
      />
      <button
        className="custom-button btn-cerca"
        onClick={() => caricaLottiVino(1)}
      >
        Cerca
      </button>

      <hr />

      <LottiVinoTable
        lottiVino={lottiVino}
        etichette={etichette}
        fasiProduzione={fasiProduzione}
        onEdit={handleEditLotto}
        onDelete={handleDeleteLotto}
        page={page}
        pageCount={pageCount}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default LottiVino;
