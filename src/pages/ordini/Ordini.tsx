import { useState, useEffect } from "react";
import OrdiniForm from "./OrdiniForm";
{/*import OrdiniTable from "../ordini/OrdiniTable";*/}

const Ordini = () => {
  const [reload, setReload] = useState(false);

  
  const handleSuccess = () => {
    setReload(!reload);
  };

  return (
    <div className="container mt-4">
      <h2>Gestione Ordini</h2>
      
      <OrdiniForm onSuccess={handleSuccess} />

      <hr />

      {/*<OrdiniTable reload={reload} />*/}
    </div>
  );
};

export default Ordini;