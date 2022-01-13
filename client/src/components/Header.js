import React from "react";

import { Link } from 'react-router-dom';
import { Navbar, Container, Nav } from "react-bootstrap";
import css from "../css/Header.module.css";

const Header = (props) => {
  
  return (
    <header>
      <Navbar bg="light" expand="lg">
        <Container className={css.header}>
          <Navbar.Brand as={Link} to="/">Cipher Results</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={css.navLinks}>
              {props.isloggedIn ? (
                <>
                  <Nav.Link onClick={() => props.logout(false)} as={Link} to="/">
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link  as={Link} to="/signup">
                    Signup
                  </Nav.Link>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

// <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
//     <Container>
//     <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
//     <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//     <Navbar.Collapse id="responsive-navbar-nav">
//         <Nav className="me-auto">

//         </Nav>
//         <Nav>
//         <Nav.Link href="#deets">More deets</Nav.Link>
//         <Nav.Link eventKey={2} href="#memes">
//             Dank memes
//         </Nav.Link>
//         </Nav>
//     </Navbar.Collapse>
//     </Container>
// </Navbar>
