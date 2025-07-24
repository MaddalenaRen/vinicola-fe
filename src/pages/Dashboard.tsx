import { Accordion, ListGroup, Badge } from "react-bootstrap";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosConfig";

interface FaseLottiDto {
  nomeLotto: string;
  lotti: string[];
  percentualeLotti: number;
  percentualeBottiglie: number;
}

interface PieData {
  id: string;
  value: number;
  label: string;
}

const Dashboard = () => {
  const [fasiLotti, setFasiLotti] = useState<FaseLottiDto[]>([]);
  const [chartValue, setChartValue] = useState<PieData[]>([]);
  const [chartBottiglie, setChartBottiglie] = useState<PieData[]>([]);

  const caricaFasiLotti = async () => {
    try {
      const response = await axiosInstance.get(
        "https://extended-celeste-rennella-d07bc04c.koyeb.app/dashboard"
      );
      const data = response.data.faseLottiDto;

      setFasiLotti(data);

      const chartLottiTmp: PieData[] = [];
      const chartBottiglieTmp: PieData[] = [];

      data.forEach((f: FaseLottiDto) => {
        chartLottiTmp.push({
          id: f.nomeLotto,
          value: f.percentualeLotti,
          label: f.nomeLotto,
        });
        chartBottiglieTmp.push({
          id: f.nomeLotto,
          value: f.percentualeBottiglie,
          label: f.nomeLotto,
        });
      });

      setChartValue(chartLottiTmp);
      setChartBottiglie(chartBottiglieTmp);
    } catch (error) {
      console.error("Errore nel caricamento delle fasi di produzione:", error);
    }
  };

  useEffect(() => {
    caricaFasiLotti();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Fasi di Produzione</h2>

      <div className="row">
        <div className="col-12 col-md-6 mb-4 fixed-height-chart">
          <h3 className="text-center ">Distribuzione Lotti</h3>
          <PieChart series={[{ data: chartValue }]} width={400} height={300} />
        </div>

        <div className="col-12 col-md-6 mb-4 fixed-height-chart">
          <h3 className="text-center ">Distribuzione Bottiglie</h3>
          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: chartBottiglie.map((d) => d.label),
              },
            ]}
            series={[
              {
                data: chartBottiglie.map((d) => d.value),
                label: "Percentuale Bottiglie",
              },
            ]}
            width={400}
            height={300}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <Accordion defaultActiveKey="0" alwaysOpen>
            {fasiLotti.map((fase, index) => (
              <Accordion.Item eventKey={index.toString()} key={index}>
                <Accordion.Header>
                  <strong>{fase.nomeLotto}</strong>
                </Accordion.Header>
                <Accordion.Body>
                  {fase.lotti.length > 0 ? (
                    <ListGroup variant="flush">
                      {fase.lotti.map((lotto, idx) => (
                        <ListGroup.Item
                          key={idx}
                          className="d-flex justify-content-between align-items-center"
                        >
                          <span>{lotto}</span>
                          <Badge bg="primary">In lavorazione</Badge>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  ) : (
                    <p className="text-muted">Nessun lotto presente</p>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
