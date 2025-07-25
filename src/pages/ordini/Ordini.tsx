import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import OrdiniForm from "./OrdiniForm";
import OrdiniTable from "./OrdiniTable";
import axiosInstance from "../../api/axiosConfig";
import Spinner from "../../components/Spinner";

interface Cliente {
  id: number;
  nome: string;
  cognome: string;
  numeroTelefono: string;
}

interface Operatore {
  id: number;
  nome: string;
  cognome: string;
  reparto: string;
}

interface Etichetta {
  id: number;
  nomeEtichetta: string;
}

interface Ordine {
  id?: number;
  quantita: string;
  dataOrdine: string;
  dataConsegna: string;
  cliente: Cliente;
  operatore: Operatore;
  etichetta: Etichetta;
  stato?: string;
}

const Ordini = () => {
  const [ordini, setOrdini] = useState<Ordine[]>([]);
  const [ordineSelezionato, setOrdineSelezionato] = useState<
    Ordine | undefined
  >(undefined);
  const [loading, setLoading] = useState(false);
  const [searchCliente, setSearchCliente] = useState("");
  const [messaggioAlert, setMessaggioAlert] = useState<{
    tipo: "success" | "warning" | "danger";
    messaggio: string;
  } | null>(null);

  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const formRef = useRef<HTMLDivElement>(null);

  const caricaOrdini = async (pagina: number) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
         `http://localhost:8080/ordini?page=${pagina - 1}&cliente=${searchCliente}`
      );
      setOrdini(response.data.content);
      setPageCount(response.data.totalPages);
      setPage(pagina);
    } catch (error) {
      console.error("Errore nel caricamento degli ordini:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    caricaOrdini(1);
  }, []);

  const handlePageChange = (nuovaPagina: number) => {
    if (nuovaPagina < 1 || nuovaPagina > pageCount) return;
    caricaOrdini(nuovaPagina);
  };

  const handleSuccess = () => {
    caricaOrdini(page);
    setOrdineSelezionato(undefined);

    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDeleteOrdine = async (ordine: Ordine) => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }

    const result = await Swal.fire({
      title: "Sei sicuro?",
      text: `Vuoi eliminare l'ordine #${ordine.id} del cliente ${ordine.cliente.nome} ${ordine.cliente.cognome}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sì, elimina",
      cancelButtonText: "Annulla",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosInstance.delete(`http://localhost:8080/ordini/${ordine.id}`);
      setMessaggioAlert({
        tipo: "success",
        messaggio: "Ordine eliminato con successo",
      });
      setTimeout(() => setMessaggioAlert(null), 4000);
      caricaOrdini(page);
    } catch (error) {
      setMessaggioAlert({
        tipo: "danger",
        messaggio: "Errore durante l'eliminazione dell'ordine",
      });
      console.error("Errore durante l'eliminazione dell'ordine:", error);
      setTimeout(() => setMessaggioAlert(null), 4000);
    }
  };

  const handleEditOrdine = (ordine: Ordine) => {
    setOrdineSelezionato(ordine);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="container mt-4">
      <h2>Gestione Ordini</h2>

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

      {loading && <Spinner />}

      {loading ? (
        <Spinner />
      ) : (
        <div ref={formRef}>
          <OrdiniForm
            onSuccess={handleSuccess}
            ordine={ordineSelezionato}
            setMessaggioAlert={setMessaggioAlert}
          />

          <hr />
          <input
            type="text"
            placeholder="Cerca per nome o cognome cliente"
            value={searchCliente}
            onChange={(e) => setSearchCliente(e.target.value)}
          />
          <button
            className="custom-button btn-cerca"
            onClick={() => caricaOrdini(1)}
          >
            Cerca
          </button>

          <hr />

          <OrdiniTable
            ordini={ordini}
            onEdit={handleEditOrdine}
            onDelete={handleDeleteOrdine}
            page={page}
            pageCount={pageCount}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default Ordini;
