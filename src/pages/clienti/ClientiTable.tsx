import * as React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, Typography, Box, useMediaQuery} from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface Cliente {
  id: number;
  nome: string;
  cognome: string;
  email: string;
  numeroTelefono: string;
  tipoCliente: string;
}

interface ClientiTableProps {
  clienti: Cliente[];
  onEdit: (cliente: Cliente) => void;
  onDelete: (cliente: Cliente) => void;
}

const ClientiTable: React.FC<ClientiTableProps> = ({ clienti, onEdit, onDelete }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box mt={2}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Elenco Clienti
      </Typography>

      {isMobile ? (
        
        <Box display="flex" flexDirection="column" gap={2}>
          {clienti.map((c) => (
            <Paper key={c.id} elevation={3} sx={{ p: 2 }}>
              <Typography><strong>Nome:</strong> {c.nome}</Typography>
              <Typography><strong>Cognome:</strong> {c.cognome}</Typography>
              <Typography><strong>Email:</strong> {c.email}</Typography>
              <Typography><strong>Telefono:</strong> {c.numeroTelefono}</Typography>
              <Typography><strong>Tipo:</strong> {c.tipoCliente}</Typography>
              <Box mt={1} display="flex" gap={1}>
                <Button
                  fullWidth
                  variant="contained"
                  color="warning"
                  onClick={() => onEdit(c)}
                >
                  Modifica
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  color="error"
                  onClick={() => onDelete(c)}
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
                <TableCell>Email</TableCell>
                <TableCell>Telefono</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell align="center">Azioni</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clienti.map((c) => (
                <TableRow key={c.id} hover>
                  <TableCell>{c.nome}</TableCell>
                  <TableCell>{c.cognome}</TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell>{c.numeroTelefono}</TableCell>
                  <TableCell>{c.tipoCliente}</TableCell>
                  <TableCell align="center">
                    <Box display="flex" gap={1} justifyContent="center">
                      <Button
                        variant="contained"
                        color="warning"
                        size="small"
                        onClick={() => onEdit(c)}
                      >
                        Modifica
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => onDelete(c)}
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

export default ClientiTable;

