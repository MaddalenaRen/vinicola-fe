import * as React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Typography, Box, useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface Etichetta {
  id: number;
  nomeEtichetta: string;
  tipologiaVino: string;
  gradazioneAlcolica: number;
  dataImbottigliamento: string;
  cantinaId: number;
}

interface EtichetteTableProps {
  etichette: Etichetta[];
  onEdit: (etichetta: Etichetta) => void;
  onDelete: (etichetta: Etichetta) => void;
}

const EtichetteTable: React.FC<EtichetteTableProps> = ({ etichette, onEdit, onDelete }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box mt={4}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Elenco Etichette
      </Typography>

      {isMobile ? (
        <Box display="flex" flexDirection="column" gap={2}>
          {etichette.map((et) => (
            <Paper key={et.id} elevation={3} sx={{ p: 2 }}>
              <Typography><strong>Nome Etichetta:</strong> {et.nomeEtichetta}</Typography>
              <Typography><strong>Tipologia di Vino:</strong> {et.tipologiaVino}</Typography>
              <Typography><strong>Gradazione Alcolica:</strong> {et.gradazioneAlcolica}°</Typography>
              <Typography><strong>Data Imbottigliamento:</strong> {et.dataImbottigliamento.slice(0, 10)}</Typography>
              <Typography><strong>Cantina ID:</strong> {et.cantinaId}</Typography>
              <Box mt={1} display="flex" gap={1}>
                <Button
                  fullWidth
                  variant="contained"
                  color="warning"
                  onClick={() => onEdit(et)}
                >
                  Modifica
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  color="error"
                  onClick={() => onDelete(et)}
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
                <TableCell>Nome Etichetta</TableCell>
                <TableCell>Tipologia di Vino</TableCell>
                <TableCell>Gradazione Alcolica</TableCell>
                <TableCell>Data Imbottigliamento</TableCell>
                <TableCell>Cantina ID</TableCell>
                <TableCell align="center">Azioni</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {etichette.map((et) => (
                <TableRow key={et.id} hover>
                  <TableCell>{et.nomeEtichetta}</TableCell>
                  <TableCell>{et.tipologiaVino}</TableCell>
                  <TableCell>{et.gradazioneAlcolica}°</TableCell>
                  <TableCell>{et.dataImbottigliamento.slice(0, 10)}</TableCell>
                  <TableCell>{et.cantinaId}</TableCell>
                  <TableCell align="center">
                    <Box display="flex" gap={1} justifyContent="center">
                      <Button
                        variant="contained"
                        color="warning"
                        size="small"
                        onClick={() => onEdit(et)}
                      >
                        Modifica
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
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
    </Box>
  );
};

export default EtichetteTable;

