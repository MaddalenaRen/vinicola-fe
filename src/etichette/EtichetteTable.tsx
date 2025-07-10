interface EtichetteTableProps {
  etichette: any[];
  onEdit: (operatore: any) => void;
}

const EtichetteTable: React.FC<EtichetteTableProps> = ({
  etichette,
  onEdit,
}) => {
  return (
    <table className="table mt-4">
      <thead>
        <tr>
          <th>Nome Etichetta</th>
          <th>Tipologia di Vino</th>
          <th>Gradazione Alcolica</th>
          <th>Data Imbottigliamento</th>
          <th>Cantina id</th>
          <th>Azioni</th>
        </tr>
      </thead>
      <tbody>
        {etichette.map((et) => (
          <tr key={et.id}>
            <td>{et.nomeEtichetta}</td>
            <td>{et.tipologiaVino}</td>
            <td>{et.gradazioneAlcolica}</td>
            <td>{et.dataImbottigliamento?.slice(0, 10)}</td>
            <td>{et.cantina?.id}</td>

            <td>
              <button
                className="btn btn-warning btn-sm"
                onClick={() => onEdit(et)}
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

export default EtichetteTable;
