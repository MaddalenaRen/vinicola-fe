import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png';
import "../App.css";

const CustomNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <Navbar expand="lg" collapseOnSelect className="custom-navbar">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/dashboard"
          className="d-flex align-items-center"
        >
          <div className="logo-container">
            <img
              src={logo}
              alt="VinGest Logo"
              height="50"
              className="d-inline-block align-top me-2"
            />
          </div>
          VinGest
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/clienti">
              Clienti
            </Nav.Link>
            <Nav.Link as={Link} to="/ordini">
              Ordini
            </Nav.Link>
            <Nav.Link as={Link} to="/lotti-vino">
              Lotti
            </Nav.Link>
            <Nav.Link as={Link} to="/etichette">
              Etichette
            </Nav.Link>
            <Nav.Link as={Link} to="/operatori">
              Operatori
            </Nav.Link>
            <Nav.Link as={Link} to="/link">
              Link
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <NavDropdown title="Account" id="account-dropdown" align="end">
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
