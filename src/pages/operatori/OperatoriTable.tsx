import * as React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Typography, Box, useMediaQuery} from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface Operatore {
  id: number;
  nome: string;
  cognome: string;
  reparto: string;
  numeroTelefono: string;
  utenteId: number;
}

interface OperatoriTableProps {
  operatori: Operatore[];
  onEdit: (operatore: Operatore) => void;
  onDelete: (operatore: Operatore) => void; 
}

const OperatoriTable: React.FC<OperatoriTableProps> = ({ operatori, onEdit, onDelete }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box mt={4}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Elenco Operatori
      </Typography>

      {isMobile ? (
        <Box display="flex" flexDirection="column" gap={2}>
          {operatori.map((o) => (
            <Paper key={o.id} elevation={3} sx={{ p: 2 }}>
              <Typography><strong>Nome:</strong> {o.nome}</Typography>
              <Typography><strong>Cognome:</strong> {o.cognome}</Typography>
              <Typography><strong>Reparto:</strong> {o.reparto}</Typography>
              <Typography><strong>Telefono:</strong> {o.numeroTelefono}</Typography>
              <Typography><strong>Utente ID:</strong> {o.utenteId}</Typography>
              <Box mt={1} display="flex" gap={1}>
                <Button
                  fullWidth
                  variant="contained"
                  color="warning"
                  onClick={() => onEdit(o)}
                >
                  Modifica
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  color="error"
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
                <TableCell>Nome</TableCell>
                <TableCell>Cognome</TableCell>
                <TableCell>Reparto</TableCell>
                <TableCell>Numero Telefono</TableCell>
                <TableCell>Utente ID</TableCell>
                <TableCell align="center">Azioni</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {operatori.map((o) => (
                <TableRow key={o.id} hover>
                  <TableCell>{o.nome}</TableCell>
                  <TableCell>{o.cognome}</TableCell>
                  <TableCell>{o.reparto}</TableCell>
                  <TableCell>{o.numeroTelefono}</TableCell>
                  <TableCell>{o.utenteId}</TableCell>
                  <TableCell align="center">
                    <Box display="flex" gap={1} justifyContent="center">
                      <Button
                        variant="contained"
                        color="warning"
                        size="small"
                        onClick={() => onEdit(o)}
                      >
                        Modifica
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
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
    </Box>
  );
};

export default OperatoriTable;

