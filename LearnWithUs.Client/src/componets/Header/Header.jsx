import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link} from "react-router-dom";

function Header() {
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="/">Learn With Us</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="subjects">Предмети</Nav.Link>
                        <NavDropdown title="Розробка" id="collapsible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">далі буде</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                далі буде
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">далі буде</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/">
                                Test
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link as={Link} to="/login">Sign in</Nav.Link>
                        <Nav.Link as={Link} to="/register">Sign up</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;