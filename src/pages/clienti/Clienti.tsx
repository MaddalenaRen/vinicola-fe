import { useState, useEffect } from "react";
import ClientiForm from "./ClientiForm";
{/*import ClientiTable from "../clienti/ClientiTable";*/}

const Clienti = () => {
  const [reload, setReload] = useState(false);

  
  const handleSuccess = () => {
    setReload(!reload);
  };

  return (
    <div className="container mt-4">
      <h2>Gestione Clienti</h2>
      
      <ClientiForm onSuccess={handleSuccess} />

      <hr />

      {/*<ClientiTable reload={reload} />*/}
    </div>
  );
};

export default Clienti;