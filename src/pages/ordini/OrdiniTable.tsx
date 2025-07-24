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
  id: number;
  nome: string;
  cognome: string;
  numeroTelefono: string;
}

interface Operatore {
  id: number;
  nome: string;
  cognome: string;
  reparto: string;
}

interface Etichetta {
  id: number;
  nomeEtichetta: string;
}

interface Ordine {
  id?: number;
  quantita: string;
  dataOrdine: string;
  dataConsegna: string;
  cliente: Cliente;
  operatore: Operatore;
  etichetta: Etichetta;
  stato?: string;
}

interface OrdiniTableProps {
  ordini: Ordine[];
  onEdit: (ordine: Ordine) => void;
  onDelete: (ordine: Ordine) => void;
  page: number;
  pageCount: number;
  onPageChange: (nuovaPagina: number) => void;
}

const OrdiniTable: React.FC<OrdiniTableProps> = ({
  ordini,
  onEdit,
  onDelete,
   page,
  pageCount,
  onPageChange,
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
                <strong>Etichetta:</strong> {o.etichetta.nomeEtichetta}
              </Typography>
              <Typography>
                <strong>Stato:</strong> {o.stato ?? "N/A"}
              </Typography>
              <Box mt={1} display="flex" gap={1}>
                <Button
                  className="custom-button btn-modifica w-100"
                  size="small"
                  onClick={() => onEdit(o)}
                >
                  Modifica
                </Button>
                <Button
                  className="custom-button btn-elimina w-100"
                  size="small"
                  onClick={() => onDelete(o)}
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
                <TableCell>Stato</TableCell>
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
                  <TableCell>{o.etichetta.nomeEtichetta}</TableCell>
                  <TableCell>{o.stato ?? "N/A"}</TableCell>

                  <TableCell align="center">
                    <Box display="flex" gap={1} justifyContent="center">
                      <Button
                        className="custom-button btn-modifica w-100"
                        size="small"
                        onClick={() => onEdit(o)}
                      >
                        Modifica
                      </Button>
                      <Button
                        className="custom-button btn-elimina w-100"
                        size="small"
                        onClick={() => onDelete(o)}
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

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={2}
        mt={2}
      >
        <Button
          className="custom-button btn-nav"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
        >
          Prev
        </Button>

        <Typography>
          Pagina {page} di {pageCount}
        </Typography>

        <Button
          className="custom-button btn-nav"
          onClick={() => onPageChange(page + 1)}
          disabled={page === pageCount}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default OrdiniTable;
