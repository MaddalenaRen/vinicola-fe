import { useState, useEffect } from "react";
import OperatoriForm from "./OperatoriForm";
{/*import OperatoriTable from "../Operatori/OperatoriTable";*/}

const Operatori = () => {
  const [reload, setReload] = useState(false);

  
  const handleSuccess = () => {
    setReload(!reload);
  };

  return (
    <div className="container mt-4">
      <h2>Gestione Operatori</h2>
      
      <OperatoriForm onSuccess={handleSuccess} />

      <hr />

      {/*<OperatoriTable reload={reload} />*/}
    </div>
  );
};

export default Operatori;
