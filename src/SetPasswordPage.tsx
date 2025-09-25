import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axiosInstance from "../src/api/axiosConfig";
import { Form, Button, Alert } from "react-bootstrap";
import Spinner from "./components/Spinner";

const SetPasswordPage: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [messaggio, setMessaggio] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessaggio(null);

    if (!token) {
      setMessaggio("Token mancante.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessaggio("Le password non corrispondono.");
      return;
    }

    try {
      setLoading(true);
      await axiosInstance.post("/auth/set-password", {
        token,
        newPassword,
      });

      setMessaggio("Password aggiornata con successo! Reindirizzamento al login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      console.error(err);
      setMessaggio(
        err.response?.data?.message || "Errore durante il cambio password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "60vh" }}
        >
          <Spinner />
        </div>
      ) : (
        <Form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "auto" }}>
          <h2 className="mb-4 text-center">Imposta la tua password</h2>

          {messaggio && <Alert variant="info">{messaggio}</Alert>}

          <Form.Group className="mb-3" controlId="formNewPassword">
            <Form.Label>Nuova Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Inserisci la nuova password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label>Conferma Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Conferma la nuova password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button type="submit" className="w-100 cusrom-button btn-salva">
            Imposta Password
          </Button>
        </Form>
      )}
    </>
  );
};

export default SetPasswordPage;

