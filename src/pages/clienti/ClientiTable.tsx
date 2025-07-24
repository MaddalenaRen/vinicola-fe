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
  id?: number;
  nome: string;
  cognome: string;
  email: string;
  numeroTelefono: string;
  partitaIva?: string;
  tipoCliente: "PRIVATO" | "AZIENDA";
}

interface ClientiTableProps {
  clienti: Cliente[];
  onEdit: (cliente: Cliente) => void;
  onDelete: (cliente: Cliente) => void;
  page: number;
  pageCount: number;
  onPageChange: (nuovaPagina: number) => void;
}

const ClientiTable: React.FC<ClientiTableProps> = ({
  clienti,
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
        Elenco Clienti
      </Typography>

      {isMobile ? (
        <Box display="flex" flexDirection="column" gap={2}>
          {clienti.map((c) => (
            <Paper key={c.id} elevation={3} sx={{ p: 2 }}>
              <Typography>
                <strong>Nome:</strong> {c.nome}
              </Typography>
              <Typography>
                <strong>Cognome:</strong> {c.cognome}
              </Typography>
              <Typography>
                <strong>Email:</strong> {c.email}
              </Typography>
              <Typography>
                <strong>Telefono:</strong> {c.numeroTelefono}
              </Typography>
              <Typography>
                <strong>Tipo:</strong> {c.tipoCliente}
              </Typography>
              <Typography>
                <strong>Partita IVA:</strong>{" "}
                {c.tipoCliente === "AZIENDA" ? c.partitaIva || "—" : "—"}
              </Typography>
              <Box mt={1} display="flex" gap={1}>
                <Button
                  className="custom-button btn-modifica w-100"
                  size="small"
                  onClick={() => onEdit(c)}
                >
                  Modifica
                </Button>
                <Button
                  className="custom-button btn-elimina w-100"
                  size="small"
                  onClick={() => onDelete(c)}
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
                <TableCell>Nome</TableCell>
                <TableCell>Cognome</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Telefono</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Partita IVA</TableCell>
                <TableCell align="center">Azioni</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clienti.map((c) => (
                <TableRow key={c.id} hover>
                  <TableCell>{c.nome}</TableCell>
                  <TableCell>{c.cognome}</TableCell>
                  <TableCell
                    sx={{
                      maxWidth: 200,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {c.email}
                  </TableCell>
                  <TableCell>{c.numeroTelefono}</TableCell>
                  <TableCell>{c.tipoCliente}</TableCell>
                  <TableCell
                    sx={{
                      maxWidth: 200,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {c.tipoCliente === "AZIENDA" ? c.partitaIva || "—" : "—"}
                  </TableCell>
                  <TableCell align="center">
                    <Box display="flex" gap={1} justifyContent="center">
                      <Button
                        className="custom-button btn-modifica w-100"
                        size="small"
                        onClick={() => onEdit(c)}
                      >
                        Modifica
                      </Button>
                      <Button
                        className="custom-button btn-elimina w-100"
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

export default ClientiTable;
