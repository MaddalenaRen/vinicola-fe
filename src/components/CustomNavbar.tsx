import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const CustomNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <Navbar.Brand as={Link} to="/">Azienda Vinicola</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/clienti">Clienti</Nav.Link>
            <Nav.Link as={Link} to="/ordini">Ordini</Nav.Link>
            <Nav.Link as={Link} to="/bottiglie">Bottiglie</Nav.Link>
            <Nav.Link as={Link} to="/etichette">Etichette</Nav.Link>
            <Nav.Link as={Link} to="/fasi-produzione">Fasi di Produzione</Nav.Link>
            <Nav.Link as={Link} to="/operatori">Operatori</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;


