import { useState, useEffect, useRef } from "react";
import ClientiForm from "./ClientiForm";
import ClientiTable from "./ClientiTable";
import axiosInstance from "../../api/axiosConfig";
import Swal from "sweetalert2";

interface Cliente {
  id?: number;
  nome: string;
  cognome: string;
  email: string;
  numeroTelefono: string;
  partitaIva?: string;
  tipoCliente: "PRIVATO" | "AZIENDA";
}

const Clienti = () => {
  const [clienti, setClienti] = useState<Cliente[]>([]);
  const [clienteSelezionato, setClienteSelezionato] = useState<
    Cliente | undefined
  >(undefined);
  const [searchNome, setSearchNome] = useState("");
  const [messaggioAlert, setMessaggioAlert] = useState<{
    tipo: "success" | "warning" | "danger";
    messaggio: string;
  } | null>(null);

  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const formRef = useRef<HTMLDivElement>(null);

  const caricaClienti = async (pagina: number) => {
    try {
      const response = await axiosInstance.get("/clienti?page=" + (pagina - 1)+"&nome="+searchNome);
      setClienti(response.data.content);
      setPageCount(response.data.totalPages);
      setPage(pagina);
    } catch (error) {
      console.error("Errore nel caricamento clienti:", error);
    }
  };

  useEffect(() => {
    caricaClienti(1);
  }, []);

  const handlePageChange = (nuovaPagina: number) => {
    if (nuovaPagina < 1 || nuovaPagina > pageCount) return;
    caricaClienti(nuovaPagina);
  };

  const handleSuccess = () => {
    caricaClienti(page);
    setClienteSelezionato(undefined);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDeleteCliente = async (cliente: Cliente) => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }

    const result = await Swal.fire({
      title: "Sei sicuro?",
      text: `Vuoi eliminare ${cliente.nome} ${cliente.cognome}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sì, elimina",
      cancelButtonText: "Annulla",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosInstance.delete(`/clienti/${cliente.id}`);
      setMessaggioAlert({
        tipo: "success",
        messaggio: "Cliente eliminato con successo",
      });
      setTimeout(() => setMessaggioAlert(null), 4000);
      caricaClienti(page);

      if (clienteSelezionato?.id === cliente.id) {
        setClienteSelezionato(undefined);
      }
    } catch (error) {
      setMessaggioAlert({
        tipo: "danger",
        messaggio: "Errore durante l'eliminazione del cliente, potrebbe essere associato a uno o più ordini",
      });
      setTimeout(() => setMessaggioAlert(null), 4000);
    }
  };

  const handleEditCliente = (cliente: Cliente) => {
    setClienteSelezionato(cliente);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="container mt-4">
      <h2>Gestione Clienti</h2>

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
        <ClientiForm
          onSuccess={handleSuccess}
          cliente={clienteSelezionato}
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
      <button className="custom-button btn-cerca" onClick={() => caricaClienti(1)}>Cerca</button>

      <hr />

      <ClientiTable
        clienti={clienti}
        onEdit={handleEditCliente}
        onDelete={handleDeleteCliente}
        page={page}
        pageCount={pageCount}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Clienti;
