import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface Cliente {
  nome: string;
  cognome: string;
}

interface Operatore {
  nome: string;
  cognome: string;
}

interface Etichetta {
  id: number;
  nomeEtichetta: string;
}

interface Ordine {
  id: number;
  quantita: string;
  dataOrdine: string;
  dataConsegna: string;
  cliente: Cliente;
  operatore: Operatore;
  etichette: Etichetta[];
}

interface OrdiniTableProps {
  ordini: Ordine[];
  onEdit: (ordine: Ordine) => void;
  onDelete: (ordine: Ordine) => void;
}

const OrdiniTable: React.FC<OrdiniTableProps> = ({
  ordini,
  onEdit,
  onDelete,
}) => {
  console.log(ordini);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box mt={4}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Elenco Ordini
      </Typography>

      {isMobile ? (
        <Box display="flex" flexDirection="column" gap={2}>
          {ordini.map((o) => (
            <Paper key={o.id} elevation={3} sx={{ p: 2 }}>
              <Typography>
                <strong>Quantità:</strong> {o.quantita}
              </Typography>
              <Typography>
                <strong>Data Ordine:</strong> {o.dataOrdine}
              </Typography>
              <Typography>
                <strong>Data Consegna:</strong> {o.dataConsegna}°
              </Typography>
              <Typography>
                <strong>Cliente:</strong> {o.cliente?.nome} {o.cliente?.cognome}
              </Typography>
              <Typography>
                <strong>Operatore:</strong> {o.operatore?.nome}{" "}
                {o.operatore?.cognome}
              </Typography>
              <Typography>
                <strong>Etichette:</strong>{" "}
                {o.etichette.map((etichetta, index) => (
                  <span key={etichetta.id}>
                    {etichetta.nomeEtichetta}
                    {index < o.etichette.length - 1 ? ", " : ""}
                  </span>
                ))}
              </Typography>
              <Box mt={1} display="flex" gap={1}>
                <Button
                  fullWidth
                  variant="contained"
                  color="warning"
                  onClick={() => {
                    console.log("Modifica cliccato su ordine", o);
                    onEdit(o);
                  }}
                >
                  Modifica
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  color="error"
                  onClick={() => {
                    console.log("Elimina cliccato su ordine", o);
                    onDelete(o);
                  }}
                >
                  Elimina
                </Button>
              </Box>
            </Paper>
          ))}
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Quantità</TableCell>
                <TableCell>Data Ordine</TableCell>
                <TableCell>Data Consegna</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell>Operatore</TableCell>
                <TableCell>Etichette</TableCell>
                <TableCell align="center">Azioni</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ordini.map((o) => (
                <TableRow key={o.id} hover>
                  <TableCell>{o.quantita}</TableCell>
                  <TableCell>{o.dataOrdine}</TableCell>
                  <TableCell>{o.dataConsegna}</TableCell>
                  <TableCell>
                    {o.cliente?.nome} {o.cliente?.cognome}
                  </TableCell>
                  <TableCell>
                    {o.operatore?.nome} {o.operatore?.cognome}
                  </TableCell>
                  <TableCell>
                   {JSON.stringify(o.etichette)}
                  </TableCell>
                  <TableCell align="center">
                    <Box display="flex" gap={1} justifyContent="center">
                      <Button
                        variant="contained"
                        color="warning"
                        size="small"
                        onClick={() => {
                          console.log("Modifica cliccato su ordine", o);
                          onEdit(o);
                        }}
                      >
                        Modifica
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => {
                          console.log("Elimina cliccato su ordine", o);
                          onDelete(o);
                        }}
                      >
                        Elimina
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default OrdiniTable;
