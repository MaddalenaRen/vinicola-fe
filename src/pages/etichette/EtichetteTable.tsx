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

interface Etichetta {
  id: number;
  nomeEtichetta: string;
  tipologiaVino: string;
  gradazioneAlcolica: number;
  dataImbottigliamento: string;
}

interface EtichetteTableProps {
  etichette: Etichetta[];
  onEdit: (etichetta: Etichetta) => void;
  onDelete: (etichetta: Etichetta) => void;
  page: number;
  pageCount: number;
  onPageChange: (nuovaPagina: number) => void;
}

const EtichetteTable: React.FC<EtichetteTableProps> = ({
  etichette,
  onEdit,
  onDelete,
  page,
  pageCount,
  onPageChange,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box mt={4}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Elenco Etichette
      </Typography>

      {isMobile ? (
        <Box display="flex" flexDirection="column" gap={2}>
          {etichette.map((et) => (
            <Paper key={et.id} elevation={3} sx={{ p: 2 }}>
              <Typography>
                <strong>Nome Etichetta:</strong> {et.nomeEtichetta}
              </Typography>
              <Typography>
                <strong>Tipologia di Vino:</strong> {et.tipologiaVino}
              </Typography>
              <Typography>
                <strong>Gradazione Alcolica:</strong> {et.gradazioneAlcolica}°
              </Typography>
              <Typography>
                <strong>Data Imbottigliamento:</strong>{" "}
                {et.dataImbottigliamento.slice(0, 10)}
              </Typography>

              <Box mt={1} display="flex" gap={1}>
                <Button
                  className="custom-button btn-modifica w-100"
                  size="small"
                  onClick={() => onEdit(et)}
                >
                  Modifica
                </Button>
                <Button
                  className="custom-button btn-elimina w-100"
                  size="small"
                  onClick={() => onDelete(et)}
                >
                  Elimina
                </Button>
              </Box>
            </Paper>
          ))}
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Nome Etichetta</TableCell>
                <TableCell>Tipologia di Vino</TableCell>
                <TableCell>Gradazione Alcolica</TableCell>
                <TableCell>Data Imbottigliamento</TableCell>
                <TableCell align="center">Azioni</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {etichette.map((et) => (
                <TableRow key={et.id} hover>
                  <TableCell
                    sx={{
                      maxWidth: 200,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {et.nomeEtichetta}
                  </TableCell>
                  <TableCell
                    sx={{
                      maxWidth: 200,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {et.tipologiaVino}
                  </TableCell>
                  <TableCell>{et.gradazioneAlcolica}°</TableCell>
                  <TableCell>{et.dataImbottigliamento.slice(0, 10)}</TableCell>
                  <TableCell align="center">
                    <Box display="flex" gap={1} justifyContent="center">
                      <Button
                        className="custom-button btn-modifica w-100"
                        size="small"
                        onClick={() => onEdit(et)}
                      >
                        Modifica
                      </Button>
                      <Button
                        className="custom-button btn-elimina w-100"
                        size="small"
                        onClick={() => onDelete(et)}
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

export default EtichetteTable;
