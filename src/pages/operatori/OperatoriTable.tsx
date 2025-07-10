interface OperatoriTableProps {
  operatori: any[];
  onEdit: (operatore: any) => void;
}

const OperatoriTable: React.FC<OperatoriTableProps> = ({
  operatori,
  onEdit,
}) => {
  return (
    <table className="table mt-4">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Cognome</th>
          <th>Reparto</th>
          <th>Numero Telefono</th>
          <th>Utente id</th>
          <th>Azioni</th>
        </tr>
      </thead>
      <tbody>
        {operatori.map((o) => (
          <tr key={o.id}>
            <td>{o.nome}</td>
            <td>{o.cognome}</td>
            <td>{o.reparto}</td>
            <td>{o.numeroTelefono}</td>
            <td>{o.utenteId}</td>

            <td>
              <button
                className="btn btn-warning btn-sm"
                onClick={() => onEdit(o)}
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

export default OperatoriTable;
