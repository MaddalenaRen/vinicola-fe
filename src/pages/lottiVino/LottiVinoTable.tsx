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

interface LottoVino {
  quantita: number;
  nome: string;
  annata: number;
  varietaUva: string;
  faseProduzione: string;
  etichetta: Etichetta;
  id?: number;
}

interface Etichetta {
  id: number;
  nomeEtichetta: string;
}

interface FaseProduzioneOption {
  id: string;
  descrizione: string;
}

interface LottiVinoTableProps {
  lottiVino: LottoVino[];
  etichette: Etichetta[];
  fasiProduzione: FaseProduzioneOption[];
  onEdit: (lotto: LottoVino) => void | Promise<void>;
  onDelete: (lottoVino: LottoVino) => void | Promise<void>;
  page: number;
  pageCount: number;
  onPageChange: (nuovaPagina: number) => void;
}

const LottiVinoTable: React.FC<LottiVinoTableProps> = ({
  lottiVino,
  fasiProduzione,
  onEdit,
  onDelete,
  page,
  pageCount,
  onPageChange,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box mt={2}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Elenco Lotti
      </Typography>

      {isMobile ? (
        <Box display="flex" flexDirection="column" gap={2}>
          {lottiVino.map((l) => (
            <Paper key={l.id} elevation={3} sx={{ p: 2 }}>
              <Typography>
                <strong>Quantità:</strong> {l.quantita}
              </Typography>
              <Typography>
                <strong>Nome:</strong> {l.nome}
              </Typography>
              <Typography>
                <strong>Annata:</strong> {l.annata}
              </Typography>
              <Typography>
                <strong>Varietà Uva:</strong> {l.varietaUva}
              </Typography>
              <Typography>
                <strong>Etichetta:</strong> {l.etichetta.nomeEtichetta}
              </Typography>
              <Typography>
                <strong>Fase Produzione:</strong> {l.faseProduzione}
              </Typography>

              <Box mt={1} display="flex" gap={1}>
                <Button
                  className="custom-button btn-modifica w-100"
                  size="small"
                  onClick={() => onEdit(l)}
                >
                  Modifica
                </Button>
                <Button
                  className="custom-button btn-elimina w-100"
                  size="small"
                  onClick={() => onDelete(l)}
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
                <TableCell>Nome</TableCell>
                <TableCell>Annata</TableCell>
                <TableCell>Varietà uva</TableCell>
                <TableCell>Etichetta</TableCell>
                <TableCell>Fase Produzione</TableCell>
                <TableCell align="center">Azioni</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lottiVino.map((l) => (
                <TableRow key={l.id} hover>
                  <TableCell>{l.quantita}</TableCell>
                  <TableCell>{l.nome}</TableCell>
                  <TableCell>{l.annata}</TableCell>
                  <TableCell>{l.varietaUva}</TableCell>
                  <TableCell>{l.etichetta.nomeEtichetta}</TableCell>
                  <TableCell>{fasiProduzione.find(f => {return f.id === l.faseProduzione})?.descrizione }</TableCell>
                  <TableCell align="center">
                    <Box display="flex" gap={1} justifyContent="center">
                      <Button
                        className="custom-button btn-modifica w-100"
                        size="small"
                        onClick={() => onEdit(l)}
                      >
                        Modifica
                      </Button>
                      <Button
                        className="custom-button btn-elimina w-100"
                        size="small"
                        onClick={() => onDelete(l)}
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

export default LottiVinoTable;
