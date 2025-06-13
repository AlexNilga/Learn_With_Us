import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../api/AuthContext";

function Header() {
    const {isLoggedIn} = useContext(AuthContext);

    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand as={Link}href="/">Learn With Us</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="categories">Курси</Nav.Link>
                        <NavDropdown title="Розробка" id="collapsible-nav-dropdown">
                            <NavDropdown.Item href="/users">Користувачі</NavDropdown.Item>
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
                        {isLoggedIn ? (
                            <>
                                <Nav.Link as={Link} to="/profile">Профіль</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login">Увійти</Nav.Link>
                                <Nav.Link as={Link} to="/register">Зареєструватися</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;