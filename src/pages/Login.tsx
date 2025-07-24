import axiosInstance from "../api/axiosConfig";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Inserisci l'email e la password.");
      return;
    }

    try {
      const response = await axiosInstance.post(
        "https://extended-celeste-rennella-d07bc04c.koyeb.app/auth/login",
        {
          email,
          password,
        }
      );

      const token = response.data;

      console.log(response);

      const ruolo = null;

      if (remember) {
        localStorage.setItem("token", token);
        localStorage.setItem("isLoggedIn", "true");
        if (ruolo) localStorage.setItem("ruolo", ruolo);
      } else {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("isLoggedIn", "true");
        if (ruolo) sessionStorage.setItem("ruolo", ruolo);
      }

    

      setSuccess("Login effettuato con successo!");
      navigate("/dashboard");
    } catch (err) {
      setError("Credenziali non valide.");
    }
  };
  return (
    <Form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "auto" }}>
      <h2 className="mb-4 text-center">Accedi al tuo account</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Inserisci la tua email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Inserisci la password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          type="checkbox"
          label="Ricordami"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
        />
      </Form.Group>

      <Button  type="submit" className="w-100 cusrom-button btn-salva ">
        Accedi
      </Button>

      <div className="mt-3 text-center">
        <a href="#forgot-password">Hai dimenticato la password?</a>
      </div>
    </Form>
  );
}

export default Login;
