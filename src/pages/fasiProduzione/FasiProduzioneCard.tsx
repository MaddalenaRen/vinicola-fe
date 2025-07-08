import React, { useEffect, useState } from "react";
import axios from "axios";

interface Operatore {
  id: number;
  nome: string;
  cognome: string;
}

interface LottoVino {
  id: number;
  quantita: number;
  nome: string;
  annata: number;
  varietaUva: String;
}

type TipoFase = "VENDEMMIA" | "FERMENTAZIONE" | "AFFINAMENTO" | "IMBOTTIGLIAMENTO" | "ETICHETTATURA";

interface FaseProduzione {
  id: number;
  tipoFase: TipoFase;
  dataInizio: string;
  dataFine: string | null;
  note: string;
  lottoVino: LottoVino;
  operatore: Operatore;
}

const FasiProduzioniCard: React.FC = () =>{
    const[fasi, setFasi]= useState<FaseProduzione[]>([]);
   

   useEffect(() => {
  axios.get("http://localhost:8080/fasi-produzione")
    .then((response) => {
      setFasi(response.data.content || []); 
    })
    .catch((error) => {
      console.log(error);
      setFasi([]); 
    });
}, []);


     return (
    <div className="container mt-4">
      <h3 className="mb-3">Fasi di Produzione</h3>
      <div className="row">
        {fasi.map((fase) => (
          <div key={fase.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{fase.tipoFase}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Lotto: {fase.lottoVino.id}</h6>
                <p><strong>Operatore:</strong> {fase.operatore.nome} {fase.operatore.cognome}</p>
                <p><strong>Inizio:</strong> {fase.dataInizio}</p>
                <p><strong>Fine:</strong> {fase.dataFine || "In corso"}</p>
                <p><strong>Note:</strong> {fase.note}</p>
                <button className="btn btn-primary btn-sm mt-2">Modifica</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



export default FasiProduzioniCard