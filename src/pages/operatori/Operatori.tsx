import { useState, useEffect, useRef } from "react";
import OperatoriForm from "./OperatoriForm";
import OperatoriTable from "./OperatoriTable";
import axiosInstance from "../../api/axiosConfig";
import Swal from "sweetalert2";

interface Operatore {
  id?: number;
  nome: string;
  cognome: string;
  reparto: string;
  numeroTelefono?: string;
  utenteId?: string | number;
}

const Operatori = () => {
  const [operatori, setOperatori] = useState<Operatore[]>([]);
  const [operatoreSelezionato, setOperatoreSelezionato] = useState<
    Operatore | undefined
  >(undefined);
  const [searchNome, setSearchNome] = useState("");
  const [messaggioAlert, setMessaggioAlert] = useState<{
    tipo: "success" | "warning" | "danger";
    messaggio: string;
  } | null>(null);

  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const formRef = useRef<HTMLDivElement>(null);

  const caricaOperatori = async (pagina: number) => {
    try {
      const response = await axiosInstance.get(
        "http://localhost:8080/operatori?page=" +
          (pagina - 1) +
          "&nome=" +
          searchNome
      );
      setOperatori(response.data.content);
      setPageCount(response.data.totalPages);
      setPage(pagina);
    } catch (error) {
      console.error("Errore nel caricamento operatori:", error);
    }
  };

  useEffect(() => {
    caricaOperatori(1);
  }, []);

  const handlePageChange = (nuovaPagina: number) => {
    if (nuovaPagina < 1 || nuovaPagina > pageCount) return;
    caricaOperatori(nuovaPagina);
  };

  const handleSuccess = () => {
    caricaOperatori(page);
    setOperatoreSelezionato(undefined);

    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDeleteOperatore = async (operatore: Operatore) => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
    const result = await Swal.fire({
      title: "Sei sicuro?",
      text: `Vuoi eliminare ${operatore.nome} ${operatore.cognome}?`,
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
        `http://localhost:8080/operatori/${operatore.id}`
      );

      setMessaggioAlert({
        tipo: "success",
        messaggio: "Operatore eliminato con successo",
      });
      setTimeout(() => setMessaggioAlert(null), 4000);

      caricaOperatori(page);

      if (operatoreSelezionato?.id === operatore.id) {
        setOperatoreSelezionato(undefined);
      }
    } catch (error) {
      setMessaggioAlert({
        tipo: "danger",
        messaggio:
          "Errore durante l'eliminazione. L'operatore potrebbe essere associato a ordini o fasi.",
      });
      setTimeout(() => setMessaggioAlert(null), 4000);
    }
  };

  const handleEditOperatore = (operatore: Operatore) => {
    setOperatoreSelezionato(operatore);

    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="container mt-4">
      <h2>Gestione Operatori</h2>
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
        <OperatoriForm
          onSuccess={handleSuccess}
          operatore={operatoreSelezionato}
          setMessaggioAlert={setMessaggioAlert}
        />
      </div>

      <hr />
      <input
        type="text"
        placeholder="Cerca per nome"
        value={searchNome}
        onChange={(e) => setSearchNome(e.target.value)}
      />
      <button
        className="custom-button btn-cerca"
        onClick={() => caricaOperatori(1)}
      >
        Cerca
      </button>

      <hr />

      <OperatoriTable
        operatori={operatori}
        onEdit={handleEditOperatore}
        onDelete={handleDeleteOperatore}
        page={page}
        pageCount={pageCount}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Operatori;
