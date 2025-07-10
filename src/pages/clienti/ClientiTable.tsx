interface ClientiTableProps {
  clienti: any[];
  onEdit: (cliente: any) => void;
}

const ClientiTable: React.FC<ClientiTableProps> = ({ clienti, onEdit }) => {
  return (
    <table className="table mt-4">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Cognome</th>
          <th>Email</th>
          <th>Telefono</th>
          <th>Tipo</th>
          <th>Azioni</th>
        </tr>
      </thead>
      <tbody>
        {clienti.map((c) => (
          <tr key={c.id}>
            <td>{c.nome}</td>
            <td>{c.cognome}</td>
            <td>{c.email}</td>
            <td>{c.numeroTelefono}</td>
            <td>{c.tipoCliente}</td>
            <td>
              <button
                className="btn btn-warning btn-sm"
                onClick={() => onEdit(c)}
              >
                Modifica
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ClientiTable;
