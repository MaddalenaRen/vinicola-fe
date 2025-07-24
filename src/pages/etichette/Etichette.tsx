import { useState, useEffect, useRef } from "react";
import EtichetteForm from "./EtichetteForm";
import EtichetteTable from "./EtichetteTable";
import axiosInstance from "../../api/axiosConfig";
import Swal from "sweetalert2";

interface Etichetta {
  id: number;
  nomeEtichetta: string;
  tipologiaVino: string;
  gradazioneAlcolica: number;
  dataImbottigliamento: string;
  
}

const Etichette = () => {
  const [etichette, setEtichette] = useState<Etichetta[]>([]);
  const [etichettaSelezionata, setEtichettaSelezionata] = useState<Etichetta | null>(null);
  const [searchNomeEtichetta, setSearchNomeEtichetta] = useState("");
  const [messaggioAlert, setMessaggioAlert] = useState<{
    tipo: "success" | "warning" | "danger";
    messaggio: string;
  } | null>(null);

  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);


  const formRef = useRef<HTMLDivElement>(null);

  const caricaEtichette = async (pagina: number) => {
    try {
      const response = await axiosInstance.get("https://extended-celeste-rennella-d07bc04c.koyeb.app/etichette?page=" + (pagina - 1) + "&nomeEtichetta="+searchNomeEtichetta);
      setEtichette(response.data.content);
      setPageCount(response.data.totalPages);
      setPage(pagina);
      
    } catch (error) {
      console.error("Errore nel caricamento delle etichette:", error);
    }
  };

  useEffect(() => {
    caricaEtichette(1);
  }, []);

  const handlePageChange = (nuovaPagina: number) => {
    if (nuovaPagina < 1 || nuovaPagina > pageCount) return;
     caricaEtichette(nuovaPagina);
  };

  const handleSuccess = () => {
    caricaEtichette(page);
    setEtichettaSelezionata(null);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleEditEtichetta = (etichetta: Etichetta) => {
    setEtichettaSelezionata(etichetta);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDeleteEtichetta = async (etichetta: Etichetta) => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }

    const result = await Swal.fire({
      title: "Sei sicuro?",
      text: `Vuoi eliminare ${etichetta.nomeEtichetta}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sì, elimina",
      cancelButtonText: "Annulla",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosInstance.delete(`https://extended-celeste-rennella-d07bc04c.koyeb.app/etichette/${etichetta.id}`);
      setMessaggioAlert({
        tipo: "success",
        messaggio: "Etichetta eliminata con successo",
      });
      setTimeout(() => setMessaggioAlert(null), 4000);
      caricaEtichette(page);
    } catch (err) {
      setMessaggioAlert({
        tipo: "danger",
        messaggio: "Errore durante l'eliminazione",
      });
      console.error("Errore durante l'eliminazione dell'etichetta:", err);
    }
  };

  return (
    <div className="container">
      <h2>Gestione Etichette</h2>

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
        <EtichetteForm
          onSuccess={handleSuccess}
          etichetta={etichettaSelezionata}
          setMessaggioAlert={setMessaggioAlert}
        />
      </div>

     <hr />
      <input
        type="text"
        placeholder="Cerca per nome etichetta"
        value={searchNomeEtichetta}
        onChange={(e) => setSearchNomeEtichetta(e.target.value)}
      />
      <button className="custom-button btn-cerca"  onClick={() => caricaEtichette(1)}>Cerca</button>

      <hr />

      <EtichetteTable
        etichette={etichette}
        onEdit={handleEditEtichetta}
        onDelete={handleDeleteEtichetta}
         page={page}
        pageCount={pageCount}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Etichette;
